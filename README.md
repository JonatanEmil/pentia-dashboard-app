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

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Start udviklingsserver

```bash
npm run dev
```

### Byg til produktion

```bash
npm run build
```

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
