describe('', () => {
  beforeEach('запускаем сайт, вводим логин пароль, заходим',() => {
    
    cy.visit('www.saucedemo.com/v1/index.html')
    
    cy.get('[data-test=username]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    
    cy.get('[id=login-button]').click()
  })

  it('проверяем количество товаров, проверяем названия первого и последнего', () => {

    cy.get('.inventory_item').should('have.length', 6)

    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack')
    cy.get('.inventory_item_name').last().should('have.text', 'Test.allTheThings() T-Shirt (Red)')
  })
  
  it('проверяем описание и цену первого товара', () => {

    cy.get('.inventory_item_desc').first().should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
    cy.get('.inventory_item_price').first().should('have.text', '$29.99')
    
  })
  
  
  //cy.get('[id=item_4_title_link]').click()
  it('добавляем все товары в корзину, переходим в нее и оформляем заказ', () => {
    cy.get('button').as('[id=item_4_title_link]').click({ multiple: true ,force: true})
    
    cy.get('[id=shopping_cart_container]').click()
    
    cy.get('.checkout_button').click()
    
    cy.get('[data-test=firstName]').type('Karina')
    cy.get('[data-test=lastName]').type('Shirokova')
    cy.get('[data-test=postalCode]').type('420000')
    
    cy.get('.btn_primary').click()
    
    cy.get('.btn_action').click()
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
    
  })
  
  it('проверяем открытие карточки товара, выход обратно в каталог, добавление товара и удаление его из корзины', () => {
    cy.get('[id=item_4_title_link]').click()
    
    cy.get('button').as('[id=item_4_title_link]').click({ multiple: true ,force: true})
    
    cy.get('[id=shopping_cart_container]').click()
    
    cy.get('.cart_button').click()

  })
  
  it('проверяем селекты', () => {

    cy.get('select').select('Price (high to low)') 
    cy.get('select').select('Price (low to high)')
    cy.get('select').select('Name (Z to A)')
    cy.get('select').select('Name (A to Z)')

   //cy.get('.bm-burger-button').click()
   //cy.get('[id=logout_sidebar_link]').click()

  })
  
  it('заходим в меню и делаем выход', () => {

    cy.get('.bm-burger-button').click()
    cy.get('[id=logout_sidebar_link]').click()

  })

  
})
