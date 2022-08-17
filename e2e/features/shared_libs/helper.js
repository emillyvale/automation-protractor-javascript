var until = protractor.ExpectedConditions
var fs = require('fs')
var Buffer = require('safe-buffer').Buffer
const { setDefaultTimeout } = require('cucumber')
setDefaultTimeout(60 * 1000)

var Helper = function () {}

// Wait to see if element is on DOM
Helper.prototype.elementIsPresenceDom = function (element) {
  browser.wait(until.presenceOf(element), 25000, 'Element ' + element.getText() + ' taking too long to appear in the DOM')
  browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement())
}

// Wait to see if element is clickable
Helper.prototype.elementIsClickable = function (element) {
  browser.wait(until.elementToBeClickable(element), 50000, 'Element taking too long to appear in the DOM and stay clickable')
}

// Wait to see if element is visible
Helper.prototype.elementIsVisible = function (element) {
  browser.wait(until.visibilityOf(element), 10000, 'Element taking too long to appear in the DOM and stay visible')
}

// Wait to see if element is not attache to the DOM
Helper.prototype.elementIsNotAttachedOnDom = function (element) {
  browser.wait(until.stalenessOf(element), 10000, 'Element appeared in DOM')
}

// Wait to see if element is not present of DOM
Helper.prototype.elementIsNotPresentOfDom = function (element) {
  return browser.wait(until.not(until.presenceOf(element)))
}

// Force the browser to stop. Funciona sem o await
Helper.prototype.stopBrowser = function (time) {
  browser.sleep(time)
}

// Wait for dropdown list elements load
Helper.prototype.waitForCount = function (elementArrayFinder, expectedCount) {
  return function () {
    return elementArrayFinder.count().then(function (actualCount) {
      return expectedCount === actualCount // or <= instead of ===, depending on the use case
    })
  }
}

// Wait for all elements the array of webelements
Helper.prototype.presenceOfAll = function (elementArrayFinder) {
  return function () {
    return elementArrayFinder.count(function (count) {
      return count > 0
    })
  }
}

// This function take a screenshot and save in directory screenshots
Helper.prototype.getScreenshot = function (name) {
  function writeScreenShot (data, filename) {
    var stream = fs.createWriteStream(filename)
    stream.write(Buffer.from(data, 'base64').toString())
    stream.end()
  }
  return browser.takeScreenshot().then((png) => {
    writeScreenShot(png, 'report/screenshots/' + name + '.png')
  })
}

// This function make scrool to down on page
Helper.prototype.scrollPageDown = function (valuePixels) {
  browser.executeScript('window.scrollBy(0,' + valuePixels + ');')
}

// This function make type JavaScript Event 
Helper.prototype.typeScript = function (text, element) {
  browser.executeScript('arguments[0].value = "'+ text +'";', element);
}

//To locate an invisible element 
Helper.prototype.mouseHoverElement = function (element) {
  this.elementIsVisible(element);
  browser.actions().mouseMove(element).perform();
}

// Check if an array is ascending ordered - V2
Helper.prototype.stringArrayIsAscendingOrdered = function (data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].localeCompare(data[i + 1]) > 0) {
      return false
    }
  }
  return true
}

// Check if an array is descending ordered - V2
Helper.prototype.stringArrayIsDescendingOrdered = function (data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].localeCompare(data[i + 1]) < 0) {
      return false
    }
  }
  return true
}

module.exports = Helper
