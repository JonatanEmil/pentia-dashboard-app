describe('Flow 2: Klient sender besked', () => {
    const testBesked = `Cypress test besked ${Date.now()}`;

    beforeEach(() => {
        cy.visit('localhost:5173/');
    });

    it('Should show sent message on screen after sending', () => {
        // Logger ind som klient
        cy.get('input[type="email"]').type('kenny.jordstrom@gmail.com');
        cy.get('input[type="password"]').type('client1');
        cy.get('button[type="submit"]').click();

        // Tjekker at vi er logget ind
        cy.url().should('include', '/client/home');

        // Navigerer til beskeder via navbar
        cy.get('.navbarContainer a[href="/chat"]').click();
        cy.url().should('include', '/chat');

        // Tjekker at tidligere beskeder vises
        cy.get('.message-content').should('have.length.greaterThan', 0);

        // Skriver en besked
        cy.get('input[placeholder="Skriv dit spørgsmål her..."]')
            .type(testBesked);

        // Sender beskeden
        cy.get('.chatButtonSubmit').click();

        // Bekræfter at beskeden vises på skærmen
        cy.contains(testBesked).should('be.visible');
    });
});