import React, { useState } from 'react'
import * as api from '../apiClient'

export default function CertCard({ cert, onDeleted }) {
  const [deleting, setDeleting] = useState(false)

  const handleOpen = () => {
    const fid = cert.file_id || cert.file_id?._id || cert.file_id
    if (fid) window.open(api.fileUrl(fid), '_blank')
  }

  const handleDelete = async () => {
    if (!confirm('Deseja realmente excluir este certificado?')) return
    setDeleting(true)

    try {
      // delete file from storage (if file_path available)
      if (cert.file_path) {
        const { error: errDel } = await supabase.storage.from('certificados').remove([cert.file_path])
        if (errDel) console.error('Erro ao remover arquivo do storage', errDel)
      }

      // delete row from table
      const { error } = await supabase.from('certificados').delete().eq('id', cert.id)
      if (error) throw error

      if (onDeleted) onDeleted()
    } catch (err) {
      console.error('Erro ao excluir certificado', err)
      alert('Erro ao excluir. Veja o console para detalhes.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col justify-between">
      <div>
        <h3 className="font-medium text-lg">{cert.titulo}</h3>
        <p className="text-sm text-gray-600">{cert.instituicao}</p>
        <p className="text-sm text-gray-500 mt-2">{cert.data_emissao}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={handleOpen} className="flex-1 bg-gray-100 border rounded px-3 py-2">Ver</button>
        <button onClick={handleDelete} disabled={deleting} className="bg-red-600 text-white px-3 py-2 rounded">{deleting ? 'Excluindo...' : 'Excluir'}</button>
      </div>
    </div>
  )
}
