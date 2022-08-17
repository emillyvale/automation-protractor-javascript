'use strict'
const { element } = require('protractor');
const { default: doubleClick } = require('webdriverio/build/commands/element/doubleClick');
const Helper = require('../shared_libs/helper.js')

class LoginPage {
  init() {
    this.helper = new Helper()
    this.msgEmailError = element(by.className('MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense'));
    this.firstName = element(by.name('firstname'));
    this.lastName = element(by.name('lastname'));
    this.telephone = element(by.name('telephone'));
    this.email = element(by.id('customer-email'));
    this.menuKit = element(by.id("store.menu")).element(by.className("level0 nav-1 category-item first level-top parent category-landing"));
    this.kit = element(by.className("c-btn c-btn--arrow"));
    this.price = element(by.xpath('//*[@id="narrow-by-list"]/dd[1]/ol/li[1]'));
    this.cheapestsocks = element(by.className("product-item-info"));
    this.combox = element(by.id("attribute127"));
    this.allowCookie = element(by.id("btn-cookie-allow"));
    this.size = element(by.xpath('//*[@id="attribute127"]/option[4]'));
    this.addToCart = element(by.id("product-addtocart-button"));
    this.checkout = element(by.id("top-cart-btn-checkout"));
    this.checkBox = element(by.xpath('//*[@id="customer-email-fieldset"]/fieldset[1]/div/label[1]'));
    this.continue = element(by.className('button action continue primary'));
    this.continuePayment = element(by.id("sagepaysuiteserver-actions-toolbar"));
    this.address = element(by.name('street[0]'));
    this.addressSelect = element(by.xpath('//*[@id="html-body"]/div[5]/div[2]/div[2]/div[2]'));
    this.next = element(by.xpath('//*[@id="shipping-method-buttons-container"]/div/button'));
    this.collect = element(by.xpath('//*[@id="shipping-option"]/div[2]/div[2]/h3'));
    this.deliveryMethods = element(by.xpath('//*[@id="checkout-shipping-method-load"]/table/tbody/tr[1]/td[1]/label'));
    this.cardNumber = element(by.className('button action continue primary')).element(by.xpath('//*[@id="form-card_details.field-pan"]'));
    this.expiryMonth = element(by.name('expirymonth'));
    this.expiryYear = element(by.name('expiryyear'));
    this.securityCode = element(by.name('securitycode'));
    //layout__item 1/1 form-group
  }

  async openbrowser(){
    browser.ignoreSynchronization = true;
    await browser.get("/");
    browser.driver.manage().window().maximize()
  }

  allowCookies(){
    this.helper.elementIsClickable(this.allowCookie);
    return this.allowCookie.click();
  }
  
  selectMenuKit(){
    this.helper.elementIsClickable(this.menuKit);
    return this.menuKit.click();
  }

  selectKit(){
    this.helper.elementIsClickable(this.kit);
    return this.kit.click();
  }

  selectPrice(){
    this.helper.elementIsClickable(this.price);
    return this.price.click();
  }

  selectProduct(){
    this.helper.elementIsClickable(this.cheapestsocks);
    return this.cheapestsocks.click();
  }

  selectSize(){
    this.helper.elementIsClickable(this.size);
    return this.size.click();
  }

  clickaddToCart(){
    this.helper.elementIsClickable(this.addToCart);
    return this.addToCart.click();
  }

  clickCheckout(){
    this.helper.elementIsClickable(this.checkout);
    return this.checkout.click();
  }

  async fillEmail(){
    this.helper.elementIsClickable(this.email);
    await this.email.sendKeys("emillylinda@gmail.com")
    return await this.email.click;
  }

  clickCheckBox(){
    this.helper.elementIsClickable(this.checkBox);
    return this.checkBox.click();
  }

  clickButtonContinue(){
    this.helper.elementIsClickable(this.continue);
    return this.continue.click();
  }

  async fillLogin(){
    this.helper.elementIsClickable(this.firstName);
    await this.firstName.sendKeys("Emilly")
    this.helper.elementIsClickable(this.lastName);
    await this.lastName.sendKeys("Magalhaes")
    this.helper.elementIsClickable(this.address);
    await this.address.sendKeys("3 ", "Skerry ", "Hall")
    await this.address.sendKeys(protractor.Key.ENTER)
    this.helper.elementIsClickable(this.telephone);
    await this.telephone.sendKeys("1234567")
  }

  clickCollect(){
    this.helper.elementIsClickable(this.collect);
    return this.collect.click();
  }

  chooseDelivery(){
    this.helper.elementIsVisible(this.deliveryMethods);
    return this.deliveryMethods.click();
  }

  clickNext(){
    this.helper.elementIsClickable(this.next);
    return this.next.click();
  }

  clickButtonContinuePayment(){
    this.helper.elementIsClickable(this.continuePayment);
    return this.continuePayment.click();
  }

  async fillCardDetails(){
    this.helper.elementIsClickable(this.cardNumber);
    await this.cardNumber.sendKeys("5555666677778884")
    this.helper.elementIsClickable(this.expiryMonth);
    await this.expiryMonth.sendKeys("02")
    this.helper.elementIsClickable(this.expiryYear);
    await this.expiryYear.sendKeys("29")
    this.helper.elementIsClickable(this.securityCode);
    await this.securityCode.sendKeys("123")
  }

  async verifyMsgErrorEmail() {
    this.helper.elementIsVisible(this.msgEmailError);
    return await this.msgEmailError.isDisplayed();
  }

}
module.exports = LoginPage
