describe("Host landing page", () => {
  it("Visits the host landing page", () => {
    cy.visit("/");
    cy.contains("Guess the number!").should("be.visible");
  });

  it("types username into form", () => {
    cy.visit("/");
    cy.get('input[placeholder="Username"]').type("Joe");
    cy.get('input[placeholder="Username"]').should("have.value", "Joe");
  });

  it("create game button exists", () => {
    cy.visit("/")
    cy.contains("Create Game").should('be.visible')
  })

  it("create game button should redirect to lobby host page", () => {
    cy.visit("/")
    cy.contains("Create Game").click()

    cy.url().should('include', '/lobby/host')
  })
});
