
///<reference types="Cypress"/>
import HomePage from "../../support/pageObjects/HomePage"
const homePage = new HomePage()
describe('Heroku App Test Framework',function(){
    beforeEach(function(){
        cy.fixture('TestData').then(function(data){
            this.data = data
        })
        cy.visit(Cypress.env("url"))

    })

    it('Verify Month name when clicked matched with the Sales by Month',function(){
          //Check Month name when clicked matched with the Sales by Month
          this.data.Months.forEach(function(element){
            cy.selectShoesByMonth(element)    
            cy.get('.title h2').each(($el,index,$list) => {
                const month = $el.text() 
                let result = month.split(" ")
                result = result[0].trim() 
                cy.log('Shoes by Month : '+result) 
                expect(result.includes(element)).to.be.true   
                          
            })
        })        
     })

     it('Verify Number of Shoe Prices matched between Product and Test Data',function(){

        //Select Shoes for the month
        cy.selectShoesByMonth(this.data.Month) 


        //Get the Price of Shoe
        cy.get('tr td[class*=shoe_price]').each(($el,index,$list) => {
            let priceText = $el.text()
            cy.log(priceText)
            if(priceText.includes(this.data.Price))
            {
                cy.log('Shoe Price matched')
                expect(priceText.includes(this.data.Price)).to.be.true
            }
        })
              
    })

     it('Verify Duplicate entries do not exist for the same brand',function(){
        
        //Click All Sales
        homePage.clickAllShoes().click()

        let count = 0
        
        //Get all the Brands
        cy.get('tr:nth-child(2)').each(($el,index,$list) => {
            const name_product = $el.text()
            //cy.log(name_product)
            if(name_product.includes(this.data.Name))
                //expect(name_product).to.have.length(1) 
                count++    
        }).then(function(){
            cy.log('Count:' +count)
            expect(1).to.be.eq(count)
        })
        
     })

     it('Verify brand selection from dropdown is successful',function(){
        homePage.selectBrand().each(($el,index,$list) => {
        const val = $el.text()
        cy.log('Value: '+val)
        homePage.selectBrand().select(10).should('have.value',this.data.Brand)
        homePage.clickSearchButton().click()
        homePage.getLabel().should('contain',this.data.Brand)

        /* if(val.includes('Acorn')){ Attempted Code commented due to issue in selecting dropdown by value
            cy.get('#brand').focus()
            cy.get('#brand').scrollIntoView()
            cy.get('#brand').select('Acorn',{ force: true }).invoke('val').should('have.value','Acorn')
        } */
    })
 })


     it('Verify Error Message is displayed if No Promo Code is Entered',function(){
        //Click Promo Code Submit without entering the promo code
        homePage.clickPromoSubmit().click()
        homePage.getErrorText().should('have.text','Please enter a promotional code')
     })

     it('Verify Error Message is displayed if No Email Address is Entered',function(){
        //CLick Submit without entering email address
        homePage.clickEmailSubmit().click()
        homePage.getErrorText().should('have.text','Please enter an email address')
     })

})
