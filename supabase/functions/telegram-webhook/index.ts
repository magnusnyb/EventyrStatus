import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!
const ALLOWED_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const HOURS: Record<string, number> = { '1t': 1, '3t': 3, '6t': 6, '12t': 12, '24t': 24 }

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

  // /1t /3t /6t /12t [tekst]
  const timedMatch = text.match(/^\/(\d+t)\s+([\s\S]+)$/s)
  if (timedMatch && HOURS[timedMatch[1]]) {
    const hours = HOURS[timedMatch[1]]
    const message = timedMatch[2].trim()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000)

    await supabase.from('status').update({
      message,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    }).eq('id', 1)

    const tidspunkt = expiresAt.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })
    await reply(chatId, `Melding satt — utløper kl. ${tidspunkt}.`)
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
    }).eq('id', 1)
    await reply(chatId, 'Melding satt (ingen utløp).')
    return new Response('OK')
  }

  await reply(chatId, [
    'Ukjent kommando. Tilgjengelige kommandoer:',
    '/sett [tekst] — statisk melding',
    '/1t [tekst] — utløper etter 1 time',
    '/3t [tekst] — utløper etter 3 timer',
    '/6t [tekst] — utløper etter 6 timer',
    '/12t [tekst] — utløper etter 12 timer',
    '/24t [tekst] — utløper etter 24 timer',
    '/slett — fjern melding',
  ].join('\n'))

  return new Response('OK')
})
