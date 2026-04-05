import { supabase } from '@/lib/supabase'

export function trackEvent(event: string): void {
  supabase.from('analytics').insert({ event }).then(() => {})
}
