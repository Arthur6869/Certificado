require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId, GridFSBucket } = require('mongodb')
const multer = require('multer')
const stream = require('stream')

const app = express()
app.use(cors())

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/certificadosdb'
const port = process.env.PORT || 4000

const upload = multer({ storage: multer.memoryStorage() })

let db, gridFsBucket

async function main() {
  const client = new MongoClient(mongoUrl)
  await client.connect()
  db = client.db() // use db from URI
  gridFsBucket = new GridFSBucket(db, { bucketName: 'certificados_files' })

  // List certificados
  app.get('/api/certificados', async (req, res) => {
    try {
      const items = await db.collection('certificados').find().sort({ created_at: -1 }).toArray()
      res.json(items)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Erro ao listar certificados' })
    }
  })

  // Upload file + create certificado
  app.post('/api/certificados', upload.single('file'), async (req, res) => {
    try {
      const { titulo, instituicao, data_emissao } = req.body
      if (!req.file) return res.status(400).json({ error: 'Arquivo obrigatório' })

      // stream buffer into GridFS
      const readStream = new stream.PassThrough()
      readStream.end(req.file.buffer)

      const uploadStream = gridFsBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      })
      readStream.pipe(uploadStream)

      uploadStream.on('error', (err) => {
        console.error('UploadStream error', err)
        res.status(500).json({ error: 'Erro no upload' })
      })

      uploadStream.on('finish', async (file) => {
        const doc = {
          titulo,
          instituicao,
          data_emissao: data_emissao || null,
          file_id: file._id,
          file_name: file.filename,
          created_at: new Date(),
        }
        const result = await db.collection('certificados').insertOne(doc)
        res.json({ ...doc, _id: result.insertedId })
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Erro ao salvar certificado' })
    }
  })

  // Serve file by id
  app.get('/api/files/:id', async (req, res) => {
    try {
      const fileId = new ObjectId(req.params.id)
      const filesColl = db.collection('certificados_files.files')
      const fileDoc = await filesColl.findOne({ _id: fileId })
      if (!fileDoc) return res.status(404).send('Arquivo não encontrado')

      res.set('Content-Type', fileDoc.contentType || 'application/octet-stream')
      const downloadStream = gridFsBucket.openDownloadStream(fileId)
      downloadStream.pipe(res)
    } catch (err) {
      console.error(err)
      res.status(500).send('Erro ao ler arquivo')
    }
  })

  // Delete certificado and file
  app.delete('/api/certificados/:id', async (req, res) => {
    try {
      const id = new ObjectId(req.params.id)
      const doc = await db.collection('certificados').findOne({ _id: id })
      if (!doc) return res.status(404).json({ error: 'Certificado não encontrado' })

      // delete file from GridFS if present
      if (doc.file_id) {
        try {
          await gridFsBucket.delete(new ObjectId(doc.file_id))
        } catch (e) {
          console.warn('Erro ao deletar arquivo do GridFS', e.message)
        }
      }

      await db.collection('certificados').deleteOne({ _id: id })
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Erro ao deletar certificado' })
    }
  })

  app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`)
  })
}

main().catch((err) => {
  console.error('Erro ao conectar no MongoDB', err)
  process.exit(1)
})
