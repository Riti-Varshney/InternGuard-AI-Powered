import { NextResponse } from 'next/server'
export async function POST(req) {
  const { domain } = await req.json()
  const apiKey = process.env.WHOIS_API_KEY
  const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const parsed = {
      domainName: data.WhoisRecord?.domainName ?? 'N/A',
      createdDate: data.WhoisRecord?.createdDateNormalized ?? 'N/A',
      email: data.WhoisRecord?.contactEmail ?? 'N/A',
      org: data.WhoisRecord?.registrant?.organization ?? 'N/A',
    }
    return NextResponse.json({ success: true, ...parsed })
  } catch (err) {
    console.error('WHOIS API error:', err)
    return NextResponse.json({ success: false, error: 'WHOIS lookup failed' }, { status: 500 })
  }
}
