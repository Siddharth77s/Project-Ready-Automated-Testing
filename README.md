Hi there !

This folder holds everything I built for the login / registration test task.

**What you’ll find inside**
1) Manual_TestCases.xlsx – the 10 step-by-step cases we agreed on.
2) cypress/e2e/loginFlow.cy.js – the Cypress script that tries every step.
3) cypress/screenshots/ – one PNG per test (all attempts recorded).
4) cypress/videos/ – a single MP4 showing the whole 2-minute run.
5) README.md – plain instructions plus a quick note on the current site setup.
6) package.json & cypress.config.js – everything needed to install and run the tests again.

**How to run it yourself**
1) Open a terminal in this folder.
2) Install once :  yarn install
3) Run the tests :  yarn cypress run --config supportFile=false --spec cypress/e2e/loginFlow.cy.js

**What just happened**
1] I pointed Cypress at the live site, pressed “go,” and let it try every test.
2] The site loads fine, but the public pages don’t have a login or sign-up form, so all ten tests end up looking for text boxes that aren’t there.
3] That’s why the log shows ten reds—Cypress is working, the site just doesn’t expose a login screen right now.

 **Next step**
## Give me a staging URL (or a demo environment) with the login page turned on, swap that URL into cypress.config.js, and the same script will turn green.
  
That’s it—thanks for checking it out!

**Prepared by**
Siddharth Shinde
Email : siddharthshinde9476@gmail.com
Phone: 91 8767679112