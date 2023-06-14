describe('Pizza Sipariş Testi', () => {
    it('Sipariş ver', () =>{
        cy.visit("http://localhost:3000/");
        cy.get('#order-pizza').click();
        cy.get('#siparis').should("be.visible");
        cy.get("input[id='buyuk']").click();
        cy.get("button[name='secim']").click();
        cy.get("button[name='normal']").click();
        cy.get("input[name='misir']").check();
        cy.get("input[name='sosis']").check();
        cy.get("input[name='sucuk']").check();
        cy.get("input[name='biber']").check();
        cy.get("input[name='zeytin']").check();
        cy.get("input[name='name-input']").type("Tuğba Muslu");
        cy.get("button[id='arttir']").click();
        cy.get("button[id='arttir']").click();
        cy.get("button[id='siparis-ver']").click();
        cy.get('#siparis-onay').should("be.visible");
    })
});

describe('Form Testi', () => {
    it('İsim Boş kontrolü', () =>{
        cy.visit("http://localhost:3000/pizza");
        cy.get("input[name='name-input']").type("Tuğba Muslu");
        cy.get("input[name='name-input']").clear();
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('İsim min 5 karakter kontrolü', () =>{
        cy.visit("http://localhost:3000/pizza");
        cy.get("input[name='name-input']").type("Tuğ");
        cy.get('.invalid-feedback').should('be.visible');
    })
    it('Boyut seçilmezse butonun pasif mi?', () =>{
        cy.visit("http://localhost:3000/pizza");
        cy.get("input[name='name-input']").type("Tuğba Muslu");
        cy.get("button[name='secim']").click();
        cy.get("button[name='normal']").click();
        cy.get('#siparis-ver').should('be.disabled');
    })
    it('Hamur tipi seçilmezse butonun pasif mi?', () =>{
        cy.visit("http://localhost:3000/pizza");
        cy.get("input[id='buyuk']").click();
        cy.get("input[name='name-input']").type("Tuğba Muslu");
        cy.get('#siparis-ver').should('be.disabled');
    })
});
     