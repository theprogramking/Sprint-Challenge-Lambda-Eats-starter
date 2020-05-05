describe("Form testing", () => {
  it("Checks that user can type in first input box", () => {
    cy.visit("localhost:3000/pizza");
    cy.get("input[name='name']").type("Rick Sanchez");
  });

  it("Checks the chceckboxes", () => {
    cy.visit("localhost:3000/pizza");
    cy.get("#sas").click();
    cy.get("#pep").click();
  });

  it("Submits the form", () => {
    cy.visit("localhost:3000/pizza");
    cy.get("form").submit();
  });
});
