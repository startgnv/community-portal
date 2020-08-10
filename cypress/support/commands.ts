// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyByhtSSBSLIO7D6I3vICW2mPQ29iN91QG8",
  authDomain: "startgnv-dev.firebaseapp.com",
  databaseURL: "https://startgnv-dev.firebaseio.com",
  projectId: "startgnv-dev",
  storageBucket: "startgnv-dev.appspot.com",
  messagingSenderId: "511952319398",
  appId: "1:511952319398:web:e80ca3ee0508caf31cd567"
};

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
