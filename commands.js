// Custom reusable login
Cypress.Commands.add('login', (phone, otp) => {
  cy.visit('/');
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type(phone);
  cy.get('input[name="otp"]').type(otp);
  cy.get('button[type="submit"]').click();
});