# Pentia Dashboard App

En mobilvenlig dashboard-applikation til håndtering af byggesager, udviklet som UCL-projekt i samarbejde med Pentia.

## Teknologi

- **Vue 3** med Composition API og `<script setup>`
- **TypeScript**
- **Pinia** til state management
- **Vue Router** til navigation
- **Firebase / Firestore** til database og autentificering
- **SCSS** til styling

## Kom i gang

### Forudsætninger

- Node.js (v20.19.0 eller v22.12.0+)
- npm

### Installation

```bash
npm install
```

### Scripts

| Script | Beskrivelse |
|--------|-------------|
| `npm run dev` | Start udviklingsserver |
| `npm run build` | Byg til produktion (inkl. type-check) |
| `npm run preview` | Forhåndsvis produktionsbuild |
| `npm run type-check` | Kør TypeScript type-check |
| `npm run test:unit` | Kør unit tests med Vitest |
| `npm run doc` | Generer TypeDoc dokumentation |
| `npm run lint` | Kør ESLint på src/ |
| `npm run lint:fix` | Fix ESLint fejl automatisk |
| `npm run lint:oxlint` | Kør OxLint med auto-fix |
| `npm run lint:watch` | Watch-tilstand for lint |

## Projektstruktur

```
src/
├── assets/
│   ├── icons/          # SVG-ikoner som Vue-komponenter
│   ├── img/            # Billeder (brugere, huse)
│   └── scss/           # Global SCSS (abstracts, components, globals, views)
├── components/         # Genbrugelige komponenter
│   └── chat/           # Chat-specifikke komponenter
├── composables/        # Genanvendelig logik (useProfileView, useChatView m.fl.)
├── config/             # Firebase konfiguration
├── router/             # Vue Router opsætning
├── seeders/            # Firestore seed-scripts
├── stores/             # Pinia stores (auth, user, case, image, message m.fl.)
└── views/
    ├── client/         # Klient-sider (hjem, profil, kalender, kontrakt m.fl.)
    └── manager/        # Manager-sider (hjem, profil, klientvisning m.fl.)
```

## Brugerroller

| Rolle | Adgang |
|-------|--------|
| **Manager** | Overblik over alle sager og klienter, chat, mappe |
| **Klient** | Egen sag, byggetrin, kalender, kontrakt, chat |

## Firebase

Projektet bruger følgende Firestore-samlinger:

- `users` — brugere med rolle, billede og tilknyttede sager
- `cases` — byggesager med adresseoplysninger
- `messages` — chatbeskeder
- `images` — billeder til brugere og sager
- `buildingSteps` — byggetrin tilknyttet en sag

## Miljøvariabler

Opret en `.env` fil i roden med Firebase-konfiguration:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Linting

Projektet bruger ESLint med Vue, TypeScript og Stylistic plugins.

```bash
npm run lint
```

### Regler

#### Generelt
| Regel | Niveau | Beskrivelse |
|-------|--------|-------------|
| `indent` | error | 4 mellemrum |
| `no-console` | warn | Advar om console.log |
| `no-debugger` | error | Forbyd debugger |
| `no-unused-vars` | error | Ingen ubrugte variabler |
| `no-var` | error | Brug `let`/`const` i stedet for `var` |
| `prefer-const` | error | Brug `const` hvor muligt |
| `no-duplicate-imports` | error | Ingen duplicate imports |
| `no-unreachable` | error | Ingen kode efter `return`/`throw` |

#### TypeScript
| Regel | Beskrivelse |
|-------|-------------|
| `array-type` | Brug `Type[]` array syntax |
| `explicit-function-return-type` | Alle funktioner skal have return type |
| `consistent-type-definitions` | Brug `interface` frem for `type` |

#### Stylistic
| Regel | Beskrivelse |
|-------|-------------|
| `quotes` | Single quotes |
| `semi` | Semikolon påkrævet |
| `max-len` | Maks 120 tegn per linje |
| `object-curly-spacing` | Mellemrum i `{ }` |
| `comma-dangle` | Trailing comma i multiline |

### Ignorerede stier
- `src/router/**`
- `src/assets/icons/**`
- `dist/`, `dist-ssr/`, `coverage/`