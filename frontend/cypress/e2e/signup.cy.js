describe('Signup Page Tests', () => {
  beforeEach(() => {
    cy.visit('/signup'); // Visit the signup page before each test
    cy.intercept('POST', 'http://localhost:5000/api/signup').as('signupRequest');
  });

  it('should render the signup form correctly', () => {
    // Check page structure
    cy.get('.container').should('exist');
    cy.get('.formContainer').should('exist');
    
    // Check form elements
    cy.get('h2.heading').should('contain', 'Sign Up');
    cy.get('p.subheading').should('contain', 'Create an account');
    cy.get('form.form').should('exist');
    
    // Check email input
    cy.get('.inputContainer').first().within(() => {
      cy.get('label.label').should('contain', 'Email:');
      cy.get('input[type="email"]')
        .should('exist')
        .should('have.attr', 'required');
    });
    
    // Check password input
    cy.get('.inputContainer').eq(1).within(() => {
      cy.get('label.label').should('contain', 'Password:');
      cy.get('input[type="password"]')
        .should('exist')
        .should('have.attr', 'required');
    });
    
    // Check submit button
    cy.get('button.button')
      .should('contain', 'Sign Up')
      .should('have.attr', 'type', 'submit');
    
    // Check login link
    cy.get('.linkContainer')
      .should('contain', 'Already have an account?');
    cy.get('a.link')
      .should('have.attr', 'href', '/');
  });

  it('should validate email format before submission', () => {
    // Test invalid email
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('validpassword123');
    cy.get('button.button').click();
    
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .should('contain', 'please insert valid email address');
  });

  it('should validate password length before submission', () => {
    // Test short password
    cy.get('input[type="email"]').type('valid@example.com');
    cy.get('input[type="password"]').type('short');
    cy.get('button.button').click();
    
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .should('contain', 'Password must be at least 6 characters long');
  });

  it('should successfully sign up with valid credentials', () => {
    // Mock successful response
    cy.intercept('POST', 'http://localhost:5000/api/signup', {
      statusCode: 201,
      body: {}
    }).as('successfulSignup');
    
    // Fill out form
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[type="password"]').type('securepassword123');
    cy.get('button.button').click();
    
    // Verify API call
    cy.wait('@successfulSignup').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        email: 'newuser@example.com',
        password: 'securepassword123'
      });
    });
    
    // Verify UI response
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .should('contain', 'Signup Successful!');
    
    // Verify navigation
    cy.url().should('include', '/');
  });

  it('should handle existing email error', () => {
    // Mock error response
    cy.intercept('POST', 'http://localhost:5000/api/signup', {
      statusCode: 400,
      body: { message: 'Email already exists' }
    }).as('existingEmail');
    
    // Fill out form
    cy.get('input[type="email"]').type('existing@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button.button').click();
    
    // Verify error handling
    cy.wait('@existingEmail');
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .should('contain', 'This email is already registered');
  });

  it('should handle general signup errors', () => {
    // Mock error response
    cy.intercept('POST', 'http://localhost:5000/api/signup', {
      statusCode: 500,
      body: {}
    }).as('serverError');
    
    // Fill out form
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button.button').click();
    
    // Verify error handling
    cy.wait('@serverError');
    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .should('contain', 'Error signing up');
  });

  it('should navigate to login page when clicking login link', () => {
    cy.get('a.link').click();
    cy.url().should('include', '/');
  });
});