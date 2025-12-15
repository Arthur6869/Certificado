const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function fetchCertificados() {
  const res = await fetch(`${API_BASE}/api/certificados`)
  if (!res.ok) throw new Error('Erro ao buscar certificados')
  return res.json()
}

export async function uploadCertificado({ titulo, instituicao, data_emissao, file }) {
  const form = new FormData()
  form.append('titulo', titulo)
  form.append('instituicao', instituicao)
  if (data_emissao) form.append('data_emissao', data_emissao)
  form.append('file', file)

  const res = await fetch(`${API_BASE}/api/certificados`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Erro ao enviar certificado')
  }

  return res.json()
}

export async function deleteCertificado(id) {
  const res = await fetch(`${API_BASE}/api/certificados/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Erro ao deletar')
  return res.json()
}

export function fileUrl(fileId) {
  return `${API_BASE}/api/files/${fileId}`
}

export default { fetchCertificados, uploadCertificado, deleteCertificado, fileUrl }
