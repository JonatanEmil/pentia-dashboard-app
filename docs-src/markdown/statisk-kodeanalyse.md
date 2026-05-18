# Statisk Kodeanalyse

## Linting og formatteringsregler
Til linting bruges der ESLint, hvilket som regel holdes kørende med npm run lint:watch, men kan sagtens køres med npm run lint for one time run.
ESLint er valgt da det har bred understøttelse for Vue og TypeScript via dedikerede plugins, og integrerer godt med vores udviklingsmiljø.

Projektet bruger ESLint med Vue, TypeScript og Stylistic plugins.

| Script | Beskrivelse |
|--------|-------------|
| `npm run lint` | Kør ESLint på src/ |
| `npm run lint:fix` | Fix ESLint fejl automatisk |
| `npm run lint:watch` | Watch-tilstand for lint |


### Generelle regler
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

### TypeScript regler
| Regel | Beskrivelse |
|-------|-------------|
| `array-type` | Brug `Type[]` array syntax |
| `explicit-function-return-type` | Alle funktioner skal have return type |
| `consistent-type-definitions` | Brug `interface` frem for `type` |

### Stylistic regler
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