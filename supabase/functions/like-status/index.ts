import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!
const CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('OK', { headers: corsHeaders })
  if (req.method !== 'POST') return new Response('OK')

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  await supabase.rpc('increment_status_likes')

  const { data } = await supabase
    .from('status')
    .select('likes, message')
    .eq('id', 1)
    .single()

  if (data?.likes) {
    const kortMelding = data.message && data.message.length > 40
      ? data.message.slice(0, 40) + '…'
      : data.message ?? ''
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `Noen likte meldingen din! (${data.likes} totalt)\n"${kortMelding}"`,
      }),
    })
  }

  return new Response(JSON.stringify({ likes: data?.likes ?? 0 }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
