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