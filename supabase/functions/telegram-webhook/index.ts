import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!
const ALLOWED_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!


async function reply(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('OK')

  const body = await req.json()
  const msg = body.message
  if (!msg) return new Response('OK')

  const chatId = String(msg.chat.id)
  if (chatId !== ALLOWED_CHAT_ID) return new Response('OK')

  const text: string = msg.text ?? ''
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  // /slett — fjern melding
  if (text.trim() === '/slett') {
    await supabase
      .from('status')
      .update({ message: null, created_at: null, expires_at: null })
      .eq('id', 1)
    await reply(chatId, 'Melding fjernet.')
    return new Response('OK')
  }

  // /Nt eller /Ndag(er) — valgfritt antall timer (1–24) eller dager (2–14)
  const hoursMatch = text.match(/^\/(\d+)t\s+([\s\S]+)$/s)
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1], 10)
    if (hours >= 1 && hours <= 24) {
      const message = hoursMatch[2].trim()
      const now = new Date()
      const expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000)
      await supabase.from('status').update({
        message,
        created_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        likes: 0,
      }).eq('id', 1)
      const tidspunkt = expiresAt.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })
      await reply(chatId, `Melding satt — utløper kl. ${tidspunkt} (${hours}t).`)
      return new Response('OK')
    }
  }

  const daysMatch = text.match(/^\/(\d+)dag(?:er)?\s+([\s\S]+)$/si)
  if (daysMatch) {
    const days = parseInt(daysMatch[1], 10)
    if (days >= 2 && days <= 14) {
      const message = daysMatch[2].trim()
      const now = new Date()
      const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
      await supabase.from('status').update({
        message,
        created_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        likes: 0,
      }).eq('id', 1)
      const dato = expiresAt.toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit' })
      await reply(chatId, `Melding satt — utløper ${dato} (${days} dager).`)
      return new Response('OK')
    }
  }

  // /forleng Nt eller /forleng Ndag(er)
  const forlengMatch = text.match(/^\/ext\s+(\d+)(t|dag(?:er)?)$/i)
  if (forlengMatch) {
    const num = parseInt(forlengMatch[1], 10)
    const unit = forlengMatch[2].toLowerCase()
    const isHours = unit === 't'
    const isDays = unit.startsWith('dag')

    const ok = (isHours && num >= 1 && num <= 24) || (isDays && num >= 1 && num <= 14)
    if (ok) {
      const { data: current } = await supabase
        .from('status')
        .select('message, expires_at')
        .eq('id', 1)
        .single()

      if (!current?.message) {
        await reply(chatId, 'Ingen aktiv melding å forlenge.')
        return new Response('OK')
      }

      const base = current.expires_at ? new Date(current.expires_at) : new Date()
      const ms = isHours ? num * 60 * 60 * 1000 : num * 24 * 60 * 60 * 1000
      const newExpiry = new Date(base.getTime() + ms)

      await supabase.from('status').update({ expires_at: newExpiry.toISOString() }).eq('id', 1)

      if (isHours) {
        const tidspunkt = newExpiry.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })
        await reply(chatId, `Forlenget med ${num}t — utløper nå kl. ${tidspunkt}.`)
      } else {
        const dato = newExpiry.toLocaleDateString('no-NO', { day: '2-digit', month: '2-digit' })
        await reply(chatId, `Forlenget med ${num} dag${num > 1 ? 'er' : ''} — utløper nå ${dato}.`)
      }
      return new Response('OK')
    }
  }

  // /analytics
  if (text.trim() === '/a') {
    const { data } = await supabase.rpc('get_analytics_summary')
    if (!data) {
      await reply(chatId, 'Ingen data ennå.')
      return new Response('OK')
    }
    await reply(chatId, [
      'Sidevisninger i dag: ' + data.visninger_i_dag,
      'Sidevisninger denne uken: ' + data.visninger_uke,
      'Sidevisninger denne måneden: ' + data.visninger_maned,
      'Sidevisninger totalt: ' + data.visninger_totalt,
      '',
      'Klikk Instagram: ' + data.klikk_instagram,
      'Klikk Vipps: ' + data.klikk_vipps,
      'Klikk WhatsApp: ' + data.klikk_whatsapp,
      'Klikk telefon: ' + data.klikk_telefon,
    ].join('\n'))
    return new Response('OK')
  }

  // /sett [tekst]
  const settMatch = text.match(/^\/sett\s+([\s\S]+)$/s)
  if (settMatch) {
    const message = settMatch[1].trim()
    await supabase.from('status').update({
      message,
      created_at: new Date().toISOString(),
      expires_at: null,
      likes: 0,
    }).eq('id', 1)
    await reply(chatId, 'Melding satt (ingen utløp).')
    return new Response('OK')
  }

  await reply(chatId, [
    'Ukjent kommando. Tilgjengelige kommandoer:',
    '/sett [tekst] — statisk melding (ingen utløp)',
    '/1t–/24t [tekst] — utløper etter 1–24 timer',
    '/2dag–/14dag [tekst] — utløper etter 2–14 dager',
    '/ext 2t — forleng gjeldende melding',
    '/a — vis statistikk',
    '/slett — fjern melding',
  ].join('\n'))

  return new Response('OK')
})
