# CI/CD-pipeline
CI/CD-pipeline står for Continuous Integration and Continuous Delivery/Deployment. Det handler om at validerer koden der sendes til produktion.

## GitHub Actions

GitHub har en feature der kaldes "Github Actions". Med denne feature kan du eksekvere kode i det kode du pusher til din valgte branch, så du altid kan sikre lige hvad det skal være altid udføres på koden. Hvis det fejles på nogen måde i den eksekvering vil koden ikke blive pushet alligevel.  

Måden dette bliver håndteret på er via YAML-filer i .github/workflows. Disse filer består af workflows, events, runners, jobs og steps.  

**Workflows** er dine YAML filer. <br>
**Events** er når noget bestemt sker, så start workflow. Oftest vil det være på push, men det kan også gøres ved pull requests eller planlagt. <br>
**Runners** er virtuelle maskiner der kører den kode du vil have eksekveret. GitHub hoster med Ubuntu (Linux), Windows og MacOS. <br>
**Jobs** er samlinger af steps, som kan køre paralelt eller i rækkefølge. <br>
**Steps (eller actions)** er koden der skal køres. Det kan være al slags kode, men er som regel cli-commands eller scripts fra din package.json.

I dette projekt er GitHub Actions konfigureret til at køre ved push til `master`, som er projektets produktionsbranch. Her har vi sørget for at disse ting eksekveres automatisk:  
- Unit tests
- Building
- E2E tests
- Deploying til Firebase
- Oprettelse af dokumentation
- Upload af dokumentation


## YAML File
``` yml
name: CI

on:
  push:
    branches: [master]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint:eslint

      - name: Unit tests
        run: npm run test:unit:run

      - name: E2e tests
        uses: cypress-io/github-action@v6
        with:
          start: npm run dev
          wait-on: 'http://localhost:5173'

      - name: Build
        run: npm run build-only

      - name: Deploy to Firebase Hosting
        run: npx firebase-tools deploy --only hosting --token ${{ secrets.FIREBASE_TOKEN }}

```