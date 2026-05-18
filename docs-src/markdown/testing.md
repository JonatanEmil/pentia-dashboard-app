# Testing

## Tilhørende Scripts

| Script              | Beskrivelse                |
|---------------------|----------------------------|
| `npm run test:unit` | Kør unit tests med Vitest  |
| `npx cypress open`  | Åben Cypress til E2E tests |

## Unit Tests
Unit tests køres med Vitest og bruges til at teste generel forretningslogik.  

Vi har valgt at udføre unit tests på login funktionen i src/stores/authStore.ts, da det er den vigtigste funktion i vores system. 
Derudover har vi valgt at udføre unit tests på toDanishTime i src/utils/toDanishTime.ts, 
updateBuildingStep i src/stores/buildingStepStore.ts og useSearch i src/composables/useSearch.ts, da disse er mindre funktioner. 
Ved unit testing køres scriptet:  
```bash
npm run test:unit
```

### Kodeeksempel
```ts
import { describe, it, expect } from 'vitest';
import { toDanishTime } from '../toDanishTime';

describe('toDanishTime', () => {

    it('returns a string', () => {
        expect(typeof toDanishTime(new Date())).toBe('string');
    });

    it('formats date parts correctly (dd.mm.yyyy)', () => {
        const date = new Date('2024-03-05T10:00:00Z');
        const result = toDanishTime(date);
        
        expect(result).toContain('05.03.2024');
    });

    it('zero-pads day and month', () => {
        const date = new Date('2024-01-01T10:00:00Z');
        const result = toDanishTime(date);
        
        expect(result).toContain('01.01.2024');
    });
});
```
Se filer for alle unittests: <br>
https://github.com/JonatanEmil/pentia-dashboard-app/blob/master/src/composables/__tests__/useBuildingStep.test.ts <br>
https://github.com/JonatanEmil/pentia-dashboard-app/blob/master/src/stores/__tests__/authStore.test.ts <br>
https://github.com/JonatanEmil/pentia-dashboard-app/blob/master/src/utils/__tests__/toDanishTime.test.ts


## End-to-End Tests
E2E tests køres med Cypress og bruges til at teste komplekse brugerflows i applikationen.  

Vi har valgt at teste to flows:  

Flow 1: Log ind som manager → Klik på en client → Gå ind på et building step → Checkmark building step → Opdateret på homeview?  
Flow 2: Log ind som client → Gå til beskeder → Se tidligere beskeder → Skriv til manager → Se besked på skærmen?  

Ved E2E tests køres scriptet:  
```bash
npx cypress open
```
Hvor du føres videre til deres GUI for E2E testing.

### Kodeeksempel
```js
describe('Checkmark', () => {
    beforeEach(() => {
        cy.visit('localhost:5173/');
    })

    it('Should show as dark when building step is marked as done', () => {
        //Logger ind som manager
        cy.get('input[type="email"]').type('jakob.orntoft@byggmester.dk');
        cy.get('input[type="password"]').type('manager1');
        cy.get('button[type="submit"]').click();

        //Tjekker at vi er logget ind ved at tjekke at vi er på manager home
        cy.url().should('include', '/manager/home');

        //Går ind på en klient
        cy.get('.card-client').first().click();
        cy.url().should('include', '/clientView/');

        //Tjekker at der er building steps
        cy.get('.itemList').should('exist');

        

        //Klikker på den lyse building step
        cy.get('.linkButton.light').first().click();
        cy.url().should('include', '/manager/buildingSteps/');

       
        // Efter klik på status-knap
        cy.get('#status').click();
        cy.get('button[type="submit"]').click();

        // Hvis UI opdateres = databasen er opdateret
        cy.get('[data-cy="step-status-btn"]').should('have.class', 'completed');
       

    });

});
```
Se filer for alle E2E tests: <br>
https://github.com/JonatanEmil/pentia-dashboard-app/blob/master/cypress/e2e/checkmark.cy.js <br>
https://github.com/JonatanEmil/pentia-dashboard-app/blob/master/cypress/e2e/clientChat.cy.js
