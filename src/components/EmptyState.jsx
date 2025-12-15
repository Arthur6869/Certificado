import React from 'react'

export default function EmptyState({ onAdd }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 text-center">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">Nenhum certificado encontrado</h2>
        <p className="text-gray-600 mb-6">Parece que você ainda não adicionou nenhum certificado. Comece clicando em "Adicionar" para enviar seu primeiro arquivo. Seus certificados ficarão visíveis aqui em cards elegantes.</p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={onAdd} className="btn-animated bg-blue-600 text-white px-4 py-2 rounded">Adicionar certificado</button>
          <button onClick={() => alert('Dica: use o botão "Adicionar" para enviar PDFs ou imagens de certificados.')} className="px-3 py-2 border rounded">Dica rápida</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white border rounded p-4 shadow-sm">
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-3 skeleton" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4 skeleton" />
              <div className="h-24 bg-gray-50 border rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
