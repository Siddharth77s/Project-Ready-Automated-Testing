// I picked Cypress because it’s quick to set up 
// I wrote 10 tests that mirror the 10 manual cases we agreed on.

beforeEach(() => {
  // Always open the live site first.
  cy.visit('/', { failOnStatusCode: false });
});

// -------------------------------------------------
// 1  First-time user creates an account
// -------------------------------------------------
it('Signs up a brand-new user', () => {
  cy.contains('Sign Up').click();
  cy.get('input[name="phone"]').type('9876543211'); // never used before
  cy.get('input[name="otp"]').type('123456');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');   // proves success
  cy.contains('Welcome');                     // user sees a greeting
});

// -------------------------------------------------
// 2  Happy-path login
// -------------------------------------------------
it('Logs in with correct phone + OTP', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('9876543210');
  cy.get('input[name="otp"]').type('123456');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// -------------------------------------------------
// 3  Empty phone number
// -------------------------------------------------
it('Warns if phone is left blank', () => {
  cy.contains('Login').click();
  cy.get('button[type="submit"]').click();     // skip phone
  cy.contains('Please enter phone');           // inline message appears
});

// -------------------------------------------------
// 4  Phone shorter than 10 digits
// -------------------------------------------------
it('Rejects 9-digit phone', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('123456789'); // only 9
  cy.get('button[type="submit"]').click();
  cy.contains('must be 10 digits');            // validation kicks in
});

// -------------------------------------------------
// 5  Empty OTP
// -------------------------------------------------
it('Warns if OTP is left blank', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('9876543210');
  cy.get('button[type="submit"]').click();     // skip OTP
  cy.contains('Please enter OTP');
});

// -------------------------------------------------
// 6  OTP shorter than 6 digits
// -------------------------------------------------
it('Rejects 5-digit OTP', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('9876543210');
  cy.get('input[name="otp"]').type('12345');   // only 5
  cy.get('button[type="submit"]').click();
  cy.contains('must be 6 digits');
});

// -------------------------------------------------
// 7  Retry with correct OTP after failure
// -------------------------------------------------
it('Allows a second attempt after wrong OTP', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('9876543210');
  cy.get('input[name="otp"]').type('000000');  // wrong OTP
  cy.get('button[type="submit"]').click();
  cy.contains('Invalid OTP');                  // first attempt fails

  cy.get('input[name="otp"]').clear().type('123456'); // correct now
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');    // succeeds on retry
});

// -------------------------------------------------
// 8  Logout → Login again
// -------------------------------------------------
it('Logs out and logs back in', () => {
  // helper command at bottom
  cy.login('9876543210', '123456');
  // logout
  cy.get('[data-cy=profile]').click();
  cy.contains('Logout').click();
  cy.url().should('not.include', '/dashboard');
  // login again
  cy.login('9876543210', '123456');
  cy.url().should('include', '/dashboard');
});

// -------------------------------------------------
// 9  Resend OTP
// -------------------------------------------------
it('Sends fresh OTP on request', () => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type('9876543212'); // new number
  cy.contains('Resend OTP').click();
  cy.contains('OTP sent');                       // visual confirmation
  cy.get('input[name="otp"]').type('123456');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// -------------------------------------------------
// 10  Refresh after login
// -------------------------------------------------
it('Keeps session after page refresh', () => {
  cy.login('9876543210', '123456');
  cy.reload();                                 // hit F5
  cy.url().should('include', '/dashboard');    // still logged in
});

// -------------------------------------------------
// Tiny helper so I don’t repeat the same 3 lines
// -------------------------------------------------
Cypress.Commands.add('login', (phone, otp) => {
  cy.contains('Login').click();
  cy.get('input[name="phone"]').type(phone);
  cy.get('input[name="otp"]').type(otp);
  cy.get('button[type="submit"]').click();
});