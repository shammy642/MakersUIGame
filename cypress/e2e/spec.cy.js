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

  it("entering a name, the name should appear on the next page", () => {
    cy.visit("/")
    cy.get('input[placeholder="Username"]').type("Joe");
    cy.contains("Create Game").click()
    cy.url().should('include', '/lobby/host')
    cy.contains("Joe(Host)").should("be.visible")
  })
});

describe("Lobby Host Page", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('input[placeholder="Username"]').type("Joe");
    cy.contains("Create Game").click()
    cy.url().should('include', '/lobby/host')
  })
  it("the inputed name should appear on in the lobby page", () => {
    cy.contains("Joe(Host)").should("be.visible")
  })
  it("should have link with random room on page", () => {
    cy.get(".game-link").should("contain", `${window.location.origin}`)
  })
})
