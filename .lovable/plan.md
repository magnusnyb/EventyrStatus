

## Legg til "Call me maybe" lenke

Legger til en tekstlenke under WhatsApp-knappen som ringer telefonnummeret, med samme tekststorrelse som WhatsApp-knappen.

### Endring i `src/pages/Index.tsx`

Legg til en `<a>`-tag rett under `<WhatsAppButton />` inne i den eksisterende flex-containeren:

```tsx
<a
  href="tel:+4799476190"
  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
>
  <Phone className="h-4 w-4" />
  Call me maybe · +47 994 76 190
</a>
```

- `text-sm` matcher WhatsApp-knappens tekststorrelse
- `h-4 w-4` pa ikonet matcher ogsa WhatsApp-knappens ikon
- Ingen border, ingen bakgrunn - kun ren tekst
- Phone-ikon importeres fra lucide-react

