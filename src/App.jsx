import React, { useEffect, useState } from 'react'
import * as api from './apiClient'
import CertCard from './components/CertCard'
import CertForm from './components/CertForm'
import Welcome from './components/Welcome'
import EmptyState from './components/EmptyState'

export default function App() {
  const [certificados, setCertificados] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const fetchCertificados = async () => {
    setLoading(true)
    try {
      const data = await api.fetchCertificados()
      setCertificados(data || [])
    } catch (err) {
      console.error('Erro ao buscar certificados', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCertificados()
  }, [])

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        {showWelcome && <Welcome onEnter={() => setShowWelcome(false)} />}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Gerenciador de Certificados</h1>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>Adicionar</button>
          </div>
        </header>

        {showForm && (
          <div className="mb-6">
            <CertForm onSaved={() => { setShowForm(false); fetchCertificados() }} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {certificados.length === 0 ? (
              <EmptyState onAdd={() => setShowForm(true)} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificados.map((c) => (
                  <CertCard key={c._id || c.id} cert={c} onDeleted={() => fetchCertificados()} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
