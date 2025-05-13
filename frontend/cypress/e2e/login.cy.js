/// <reference types="cypress" />

describe('Login Page Tests', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/') // Make sure your React app is running!
  })

  it('Should display the login form', () => {
    // Check if the form elements exist
    cy.get('h2.heading').should('contain', 'Login')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Login')
  })

  it('Should show error on invalid login', () => {
    // Type wrong credentials
    cy.get('input[type="email"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    // Check for error toast
    cy.contains('Username or password is incorrect').should('exist')
  })

  it('Should login successfully with correct credentials', () => {
    // Replace with a real test user (or mock API)
    cy.get('input[type="email"]').type('naduni@gmail.com')
    cy.get('input[type="password"]').type('hitharushika')
    cy.get('button[type="submit"]').click()

    // Check for success toast & redirect
    cy.contains('Login successful').should('exist')
    cy.url().should('include', '/Dashboard') // Checks if redirected
  })
})