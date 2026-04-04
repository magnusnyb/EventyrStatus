import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Status {
  message: string | null
  created_at: string | null
  expires_at: string | null
  likes: number
  total_likes: number
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('no-NO', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const StatusMessage = () => {
  const [status, setStatus] = useState<Status | null>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    supabase
      .from('status')
      .select('message, created_at, expires_at, likes, total_likes')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setStatus(data)
          if (data.created_at) {
            setLiked(localStorage.getItem(`liked_${data.created_at}`) === '1')
          }
        }
      })
  }, [])

  if (!status?.message) return null
  if (status.expires_at && new Date(status.expires_at) < new Date()) return null

  const handleLike = async () => {
    if (liked || !status.created_at) return
    await supabase.rpc('increment_status_likes')
    localStorage.setItem(`liked_${status.created_at}`, '1')
    setLiked(true)
    setStatus((s) => s ? { ...s, likes: s.likes + 1, total_likes: s.total_likes + 1 } : s)
  }

  return (
    <div className="w-full rounded-xl border border-yellow-300 bg-yellow-100 px-4 py-3">
      <p className="text-xs font-semibold text-yellow-800 mb-1">Magnus</p>
      <p className="text-sm text-yellow-950">{status.message}</p>
      <div className="mt-2 flex items-center justify-between">
        {status.created_at && (
          <p className="text-xs text-yellow-700">{formatTimestamp(status.created_at)}</p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            disabled={liked}
            className="flex items-center gap-1 text-xs text-yellow-700 transition-colors hover:text-red-500 disabled:cursor-default disabled:text-red-400"
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={liked ? 'currentColor' : 'none'}
            />
            {status.likes > 0 && <span>{status.likes}</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StatusMessage
