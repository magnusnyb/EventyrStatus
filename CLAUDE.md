# EventyrStatus — Claude Config

## Prosjektoversikt
Link-i-bio / statussideapp for [@evig_eventyr](https://instagram.com/evig_eventyr). Viser profilbilde, Instagram-forhåndsvisning, Vipps-knapp, WhatsApp-knapp og telefonnummer.

## Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (komponentbibliotek i `src/components/ui/`)
- **react-router-dom** v6 (routing)
- **@tanstack/react-query** (datahenting)
- **lucide-react** (ikoner)

## Mappestruktur
```
src/
  pages/          # Sideruter (Index.tsx, NotFound.tsx)
  components/     # Appkomponenter
    InstagramPreview.tsx   # Klikkbar Instagram-boks med bilderutenett og badge
    VippsButton.tsx        # Vipps-knapp med offisiell logo
    WhatsAppButton.tsx     # WhatsApp-knapp med ikon
    NavLink.tsx
    InstagramButton.tsx
  components/ui/  # shadcn/ui-komponenter — ikke rediger disse manuelt
  assets/         # Bilder (profil-main.jpeg, profile.jpeg, insta-1/2/3.jpeg)
  hooks/          # Custom hooks
  lib/utils.ts    # cn() hjelper for Tailwind-klasser
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

### Subtitle
- `<p>`-element i Index.tsx under tittelen — tømt men bevart for enkel oppdatering
- Oppdater ved å si "oppdater subtitle til [tekst]"

## Miljøvariabler
```env
VITE_WHATSAPP_NUMBER=4799476190
VITE_INSTAGRAM_URL=https://instagram.com/evig_eventyr
```

## Kommandoer
```bash
npm run dev       # Start dev-server (http://localhost:8080)
npm run build     # Produksjonsbygg
npm run lint      # Kjør ESLint
npm run test      # Kjør tester (vitest)
```

## Konvensjoner
- Bruk `@/` som alias for `src/`
- Bruk `cn()` fra `@/lib/utils` for å kombinere Tailwind-klasser
- Nye UI-komponenter: bruk shadcn/ui fra `src/components/ui/`
- Ikoner: bruk `lucide-react`
- Bilder legges i `src/assets/`

## Viktig
- `src/components/ui/` er generert av shadcn — unngå manuelle endringer her
- Routing: legg nye ruter i `src/App.tsx` over catch-all `*`-ruten
- Deployet via GitHub Pages
- Aktiv branch: `CoffeeFix`
