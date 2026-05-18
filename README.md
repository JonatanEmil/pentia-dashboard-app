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

Før du kan køre projektet, skal du have følgende installeret på din computer:

1. **Node.js** – download og installer fra [nodejs.org](https://nodejs.org). Vælg version 20.19.0 eller 22.12.0+
2. **npm** – følger automatisk med når du installerer Node.js
3. **Git** – download og installer fra [git-scm.com](https://git-scm.com) hvis du ikke allerede har det

Du kan tjekke om du har dem installeret ved at åbne en terminal og skrive:
```bash
node -v
npm -v
```

### Installation

1. Klon projektet ned på din computer:
```bash
git clone <repository-url>
```

2. Gå ind i projektmappen:
```bash
cd pentia-dashboard-app
```

3. Opret en `.env` fil i roden af projektet med Firebase-konfigurationen (få værdierne fra en i gruppen):
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Installer projektets afhængigheder:
```bash
npm install
```

5. Start udviklingsserveren:
```bash
npm run dev
```

6. Åbn din browser og gå til adressen der vises i terminalen — typisk `http://localhost:5173`

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

## Firebase

Projektet bruger følgende Firestore-samlinger:

- `users` — brugere med rolle, billede og tilknyttede sager
- `cases` — byggesager med adresseoplysninger
- `messages` — chatbeskeder
- `images` — billeder til brugere og sager
- `buildingSteps` — byggetrin tilknyttet en sag

## Brugerroller

| Rolle | Adgang |
|-------|--------|
| **Manager** | Overblik over alle sager og klienter, chat, mappe |
| **Klient** | Egen sag, byggetrin, kalender, kontrakt, chat |

### Seeding af database

For at få samme data som projektet er udviklet med, kør den relevante seeder:

```bash
npx vite-node src/seeders/<seeder-fil>.ts
```