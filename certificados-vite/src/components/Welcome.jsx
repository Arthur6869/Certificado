import React, { useState } from 'react'

export default function Welcome({ onEnter }) {
  const [step, setStep] = useState(0) // 0: welcome, 1: details

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="max-w-3xl w-full px-6 py-10 bg-white shadow-xl rounded-lg text-center">
        {step === 0 ? (
          <>
            <h2 className="text-3xl font-bold mb-4">Bem-vindo, Arthur</h2>
            <p className="text-gray-600 mb-6">Venha deixar todos os seus certificados em nosso sistema. Organize, visualize e mantenha seguro.</p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="btn-animated inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Saiba mais
                <span className="ml-1 animate-arrow">→</span>
              </button>

              <button
                onClick={() => onEnter && onEnter()}
                className="px-4 py-3 bg-white border rounded text-gray-700 hover:shadow-sm"
              >
                Pular e entrar
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6">Os arquivos são enviados com segurança e você pode removê-los a qualquer momento.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">O que você pode fazer aqui</h2>
            <ul className="text-left mx-auto max-w-xl space-y-3 mb-6 list-disc list-inside text-gray-700">
              <li><strong>Upload eficiente:</strong> Envie PDFs e imagens sem travar o navegador (upload em streaming para o servidor).</li>
              <li><strong>Armazenamento seguro:</strong> Os arquivos ficam no servidor/MongoDB (GridFS) e os metadados no banco.</li>
              <li><strong>Visualização rápida:</strong> Abra PDFs e imagens diretamente no site.</li>
              <li><strong>Gerenciamento completo:</strong> Liste, busque e exclua certificados — a exclusão remove também o arquivo físico.</li>
            </ul>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onEnter && onEnter()}
                className="btn-animated inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Começar agora
              </button>

              <button onClick={() => setStep(0)} className="px-4 py-3 bg-white border rounded text-gray-700">Voltar</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
