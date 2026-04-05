# EventyrStatus — Claude Config

## Prosjektoversikt
Link-i-bio / statussideapp for [@evig_eventyr](https://instagram.com/evig_eventyr). Viser profilbilde, Instagram-forhåndsvisning, Vipps-knapp, WhatsApp-knapp, telefonnummer og en Telegram-drevet statusmelding.

## Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (komponentbibliotek i `src/components/ui/`)
- **react-router-dom** v6 (routing)
- **@tanstack/react-query** (datahenting)
- **lucide-react** (ikoner)
- **@supabase/supabase-js** (database)

## Mappestruktur
```
src/
  pages/          # Sideruter (Index.tsx, NotFound.tsx)
  components/     # Appkomponenter
    InstagramPreview.tsx   # Klikkbar Instagram-boks med bilderutenett og badge
    VippsButton.tsx        # Vipps-knapp med offisiell logo
    WhatsAppButton.tsx     # WhatsApp-knapp med ikon
    StatusMessage.tsx      # Telegram-drevet statusmelding med likes
    NavLink.tsx
    InstagramButton.tsx
  components/ui/  # shadcn/ui-komponenter — ikke rediger disse manuelt
  assets/         # Bilder (profil-main.jpeg, profile.jpeg, insta-1/2/3.jpeg)
  hooks/          # Custom hooks
  lib/
    utils.ts      # cn() hjelper for Tailwind-klasser
    supabase.ts   # Supabase-klient
    analytics.ts  # trackEvent() — fire-and-forget klikk/sidevisningssporing
supabase/
  functions/
    telegram-webhook/  # Edge Function — mottar Telegram-meldinger og oppdaterer status
    like-status/       # Edge Function — øker likes og sender Telegram-varsling
```

## Komponenter og design

### Knapper
- Alle toppnivå-klikkbare elementer bruker `rounded-xl`
- Indre elementer (badges, thumbnails) bruker `rounded-lg`
- Vipps: `bg-[#FF5B24]`, hvit tekst, offisiell hvit Vipps-logo (uten bakgrunnssirkel)
- WhatsApp: `bg-secondary`, grønn border `border-[#25D366]`, grått telefon-ikon, tekst

### Instagram-boksen
- Hele boksen er klikkbar (`<a>`-tag)
- Header: profilbilde + @evig_eventyr + Instagram-badge (gradient) øverst til høyre
- Rutenett: 3 bilder med `rounded-lg`
- Hover: border endres til instagram-gradient-farge

### Statusmelding (`StatusMessage.tsx`)
- Vises øverst på siden, skjult når ingen aktiv melding
- Subtil gul styling: `bg-yellow-100 border-yellow-300`
- Viser: "Magnus" som avsender, meldingstekst, timestamp
- Hjerte-knapp for likes — kaller `like-status` edge function (øker teller + sender Telegram-varsling)
- Likes-state lagres i `localStorage` for å hindre doble likes

### Subtitle
- `<p>`-element i Index.tsx under tittelen — tømt men bevart for enkel oppdatering
- Oppdater ved å si "oppdater subtitle til [tekst]"

## Supabase

### Tabell: `status`
| Kolonne | Type | Beskrivelse |
|---|---|---|
| id | integer | Alltid 1 — én fast rad |
| message | text | Meldingsteksten, null = ingen aktiv melding |
| created_at | timestamptz | Tidspunkt melding ble postet |
| expires_at | timestamptz | Utløpstidspunkt, null = ingen utløp |
| likes | integer | Likes på inneværende melding, nullstilles ved ny melding |
| total_likes | integer | Akkumulert antall likes, nullstilles aldri |

### Tabell: `analytics`
| Kolonne | Type | Beskrivelse |
|---|---|---|
| id | bigint | Auto-generert primærnøkkel |
| event | text | Hendelsesnavn (se under) |
| created_at | timestamptz | Tidspunkt for hendelsen |

**Hendelsnavn:**
| Event | Trigger |
|---|---|
| `page_view` | Siden lastes |
| `click_instagram` | Klikk på Instagram-boksen |
| `click_vipps` | Klikk på Vipps-knappen |
| `click_whatsapp` | Klikk på WhatsApp-knappen |
| `click_phone` | Klikk på telefonnummeret |

RLS: anon-brukere kan kun inserere, ikke lese.

### RPC-funksjoner
- `increment_status_likes()` — øker `likes` og `total_likes` med 1 (kalles av `like-status` edge function)
- `get_analytics_summary()` — returnerer JSON med sidevisninger (dag/uke/totalt) og klikk per knapp (kalles av `/analytics`-kommandoen)

## Telegram-bot

### Kommandoer
| Kommando | Handling |
|---|---|
| `/sett [tekst]` | Statisk melding uten utløp |
| `/Nt [tekst]` | Melding med N timers utløp (N = 1–24) |
| `/Ndag [tekst]` | Melding med N dagers utløp (N = 2–14) |
| `/forleng Nt` | Forlenger gjeldende melding med N timer |
| `/forleng Ndag` | Forlenger gjeldende melding med N dager |
| `/analytics` | Viser sidevisninger og klikk-statistikk |
| `/slett` | Fjerner aktiv melding |

### Oppsett
- Bot-token og chat-ID lagres som secrets i Supabase Edge Functions
- Webhook registrert mot `https://rssqefoufbaaeubpacrg.supabase.co/functions/v1/telegram-webhook`
- Deploy: `supabase functions deploy telegram-webhook --no-verify-jwt`

## Edge Functions

### `like-status`
Kalles fra frontend ved likes. Øker `likes`/`total_likes` via RPC og sender Telegram-varsling med antall likes og meldingsutdrag.
- Deploy: `supabase functions deploy like-status --no-verify-jwt`
- Krever CORS-headers (kalles fra nettleser)

### `telegram-webhook`
Mottar og håndterer alle Telegram-kommandoer.
- Deploy: `supabase functions deploy telegram-webhook --no-verify-jwt`

## Miljøvariabler
```env
VITE_SUPABASE_URL=https://rssqefoufbaaeubpacrg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_WHATSAPP_NUMBER=4799476190
VITE_INSTAGRAM_URL=https://instagram.com/evig_eventyr
```

Lagres i `.env.local` lokalt og som GitHub Secrets for produksjon.

## Kommandoer
```bash
npm run dev       # Start dev-server (http://localhost:8080)
npm run build     # Produksjonsbygg
npm run lint      # Kjør ESLint
npm run test      # Kjør tester (vitest)
supabase functions deploy telegram-webhook --no-verify-jwt
supabase functions deploy like-status --no-verify-jwt
```

## Konvensjoner
- Bruk `@/` som alias for `src/`
- Bruk `cn()` fra `@/lib/utils` for å kombinere Tailwind-klasser
- Nye UI-komponenter: bruk shadcn/ui fra `src/components/ui/`
- Ikoner: bruk `lucide-react`
- Bilder legges i `src/assets/`
- Analytics: bruk `trackEvent('event_navn')` fra `@/lib/analytics` — aldri direkte Supabase-kall for sporing

## Viktig
- `src/components/ui/` er generert av shadcn — unngå manuelle endringer her
- Routing: legg nye ruter i `src/App.tsx` over catch-all `*`-ruten
- Deployet via GitHub Pages — kjører kun fra `main`-branch
- Aktiv branch: `main`
