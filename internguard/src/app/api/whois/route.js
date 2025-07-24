import { NextResponse } from 'next/server'

const api = process.env.WHOIS_API_KEY

export async function POST(req) {
  const { domain } = await req.json()
  const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${api}&domainName=${domain}&outputFormat=JSON`
  
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`)
    }

    const data = await res.json()
    const record = data.WhoisRecord

    const simplifiedData = {
      domainName: record?.domainName || "Not available",
      createdDate: record?.createdDate || "Not available",
      expiresDate: record?.expiresDate || "Not available",
      registrarName: record?.registrarName || "Not available",
      nameServers: record?.nameServers?.hostNames || [],
      registrant: record?.registrant?.organization || record?.registrant?.name || "Not available",
    }

    return NextResponse.json({ success: true, ...simplifiedData })
  } catch (err) {
    console.error('WHOIS API error:', err)
    return NextResponse.json(
      { success: false, error: 'WHOIS lookup failed' },
      { status: 500 }
    )
  }
}
