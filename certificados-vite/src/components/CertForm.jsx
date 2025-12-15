import React, { useState } from 'react'
import * as api from '../apiClient'

export default function CertForm({ onSaved, onCancel }) {
  const [titulo, setTitulo] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [dataEmissao, setDataEmissao] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Selecione um arquivo')
    setSaving(true)


    try {
      await api.uploadCertificado({ titulo, instituicao, data_emissao: dataEmissao, file })

      setTitulo('')
      setInstituicao('')
      setDataEmissao('')
      setFile(null)
      if (onSaved) onSaved()
    } catch (err) {
      console.error('Erro ao salvar certificado', err)
      alert('Erro ao salvar. Veja o console para detalhes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow grid gap-3">
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required className="border rounded px-3 py-2" />
      <input value={instituicao} onChange={(e) => setInstituicao(e.target.value)} placeholder="Instituição" required className="border rounded px-3 py-2" />
      <input type="date" value={dataEmissao} onChange={(e) => setDataEmissao(e.target.value)} className="border rounded px-3 py-2" />
      <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => setFile(e.target.files[0])} className="" />

      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">{saving ? 'Salvando...' : 'Salvar'}</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
      </div>
    </form>
  )
}
