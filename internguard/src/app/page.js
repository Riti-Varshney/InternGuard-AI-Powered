'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function extractDomain(str) {
    const urlMatch = str.match(/https?:\/\/([\w.-]+)/i) || str.match(/\b([\w-]+\.[a-z]{2,})\b/i)
    return urlMatch?.[1]?.replace(/^www\./, '') || null
  }
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: text }),
    })

    const data = await res.json()
    setLoading(false)

    if (data.error) return setResult({ error: data.error })
    const scamScore = data.aiText.match(/scam score[:\s]*([0-9]+)/i)?.[1] || 'N/A'
    const label = data.aiText.match(/label[:\s]*(Fake|Real|Suspicious)/i)?.[1] || 'N/A'
    const redFlags = data.aiText.match(/red flags[:\-]?\s*([\s\S]+?)(\n|$)/i)?.[1]?.split(/[\n\-•*]+/).map(f => f.trim()).filter(f => f.length > 3) || []

    const domain = extractDomain(text)
    let whois = null
    if (domain) {
      const whoisRes = await fetch('/api/whois', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      })

      const whoisData = await whoisRes.json()
      if (whoisData.success) {
        whois = {
          domain: whoisData.domainName,
          created: whoisData.createdDate,
          email: whoisData.email,
          org: whoisData.org,
        }
      }
    }
    setResult({ scamScore, label, redFlags, raw: data.aiText, whois })
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🚨 Internship Scam Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea  className="w-full p-3 border rounded mb-3" rows="6" placeholder="Paste internship description here..." value={text} onChange={e => setText(e.target.value)} required />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >
          {loading ? 'Checking...' : 'Check Scam Score'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-6 border rounded bg-gray-50 shadow">
          {result.error ? (
            <p className="text-red-600 font-semibold">❌ Error: {result.error}</p>) : (
            <>
              <p><strong>Score:</strong> {result.scamScore}/100</p>
              <p>
                <strong>Label:</strong>{' '}
                <span className={result.label === 'Fake' ? 'text-red-600 font-bold' : result.label === 'Suspicious' ? 'text-yellow-600 font-semibold' :'text-green-600 font-semibold' }>
                  {result.label}
                </span>
              </p>

              <p className="mt-4 font-semibold">Red Flags:</p>
              <ul className="list-disc ml-6">
                {result.redFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
              {result.whois && (
                <div className="mt-4 pt-4 text-sm border-t text-gray-700">
                  <p>🔐 <strong>Domain:</strong> {result.whois.domain || 'N/A'}</p>
                  <p>📅 <strong>Created:</strong> {result.whois.created || 'N/A'}</p>
                  <p>📧 <strong>Email:</strong> {result.whois.email || 'N/A'}</p>
                  <p>🏢 <strong>Org:</strong> {result.whois.org || 'N/A'}</p>
                </div>
              )}

              <details className="mt-4 text-sm">
                <summary className="cursor-pointer text-blue-600">🔍 Raw Gemini Response</summary>
                <pre className="whitespace-pre-wrap">{result.raw}</pre>
              </details>
            </>
          )}
        </div>
      )}
    </main>
  )
}
