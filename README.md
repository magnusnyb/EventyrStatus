# EventyrStatus

Link-i-bio / statussideapp for [@evig_eventyr](https://instagram.com/evig_eventyr).

## Hva siden inneholder

- Profilbilde og navn
- Klikkbar Instagram-forhåndsvisning med de tre siste bildene
- Vipps-knapp (Dommedagskaffe)
- WhatsApp-knapp
- Telefonnummer

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- react-router-dom v6

## Kom i gang

```sh
# Klon repoet
git clone https://github.com/magnusnyb/EventyrStatus.git
cd EventyrStatus

# Installer avhengigheter
npm install

# Start dev-server
npm run dev
```

Åpne `http://localhost:8080` i nettleseren.

## Miljøvariabler

Lag en `.env`-fil i rotkatalogen for å overstyre standardverdier:

```env
VITE_WHATSAPP_NUMBER=4799476190
VITE_INSTAGRAM_URL=https://instagram.com/evig_eventyr
```

## Tilgjengelige kommandoer

| Kommando | Beskrivelse |
|---|---|
| `npm run dev` | Start dev-server |
| `npm run build` | Produksjonsbygg |
| `npm run lint` | Kjør ESLint |
| `npm run test` | Kjør tester |

## Deployment

Publisert via GitHub Pages.
