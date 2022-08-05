class HomePage{
   
    clickAllShoes(){
      return cy.get('a[href="/shoes"]')
    }
  
    clickPromoSubmit(){
      return cy.get('input[id="promo_code_submit"]')
    }
  
     getErrorText(){
      return cy.get('.flash.alert_danger')
     }
  
     selectBrand(){
      return cy.get('#brand')
     }
  
     clickSearchButton(){
      return cy.get('#search_button')
     }
  
     getLabel(){
       return cy.get('h2')
     }

     clickEmailSubmit(){
      return cy.get('#remind_email_submit')
     }
  }
  export default HomePage;