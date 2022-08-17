const {Given, When, Then, Before} = require('cucumber');
const { browser } = require('protractor');
const EC = protractor.ExpectedConditions;
const expect = require('chai').use(require('chai-as-promised')).expect

const Login = require('../page_objects/loginPage.js');
const loginPage = new Login();

  Before(async ()=> {
    await loginPage.init();
  });

  Given('on the home screen', async () => {
    await loginPage.openbrowser();
  });

  When('buy the cheapest product in the store', async () => {
    await loginPage.allowCookies();
    await loginPage.selectMenuKit();
    await loginPage.selectKit();
    await loginPage.selectPrice();
    await loginPage.selectProduct();
    await loginPage.selectSize();
    await loginPage.clickaddToCart();
    await loginPage.clickCheckout();
    await loginPage.fillEmail();
    await loginPage.clickCheckBox();
    await loginPage.clickButtonContinue();
    await loginPage.fillLogin();
    await loginPage.chooseDelivery();
    await loginPage.clickNext();
    await loginPage.clickButtonContinuePayment();
    await loginPage.fillCardDetails();
  });
  
  Then('view message informing that purchase was successful', async () => {
    expect(await loginPage.verifyInvalidEmail()).to.equal(true);
  });
