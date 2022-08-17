const Data = require('./environments_parameters.json')

const TEST_ENV = process.env.TEST_ENV || 'localDev'
let environmentParameters

switch (TEST_ENV) {
  case 'local':
    environmentParameters = Data[0].local
    break
  case 'localDev':
    environmentParameters = Data[0].localDev
    break
  case 'localHom':
    environmentParameters = Data[0].localHom
    break
   case 'localProd':
     environmentParameters = Data[0].localProd
     break
}

exports.config = {
  seleniumAddress: environmentParameters.seleniumAddress,
  ignoreUncaughtExceptions: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  restartBrowserBetweenTests: false,
  getPageTimeout: 50000,
  allScriptsTimeout: 30000,
  highlightDelay: 2500,
  rootElement: '*[ng-app]',
  baseUrl: environmentParameters.baseUrl,
  specs: ['features/*.feature'],


  // SELENIUM_PROMISE_MANAGER: false,
  //specs: [
   // 'features/*.feature'
  //],
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=1280x1024',
      ]
    }
  },

  
  cucumberOpts: {
    require: ['../features/step_definitions/*.js'], // accepts a glob]
    tags: ['@Automation'],
    format: ['json:results.json'],
    profile: false,
    'no-source': true
    //strict: true,
    //‘no-colors’: true,
    //format: [‘progress’],
  },


  onPrepare: async () => {
    // await browser.waitForAngularEnabled(false);
    // var width = 1310;
    // var height = 600;
    // browser.driver.manage().window().setSize(width, height);
    // Use only for angular applications
    // False: app Angular
    // True: app not Angular
    /* eslint-disable no-undef */
    browser.ignoreSynchronization = true
  },


  afterLaunch: function () {
    var reporter = require('cucumber-html-reporter')
    var options = {
      theme: 'bootstrap',
      jsonFile: 'results.json',
      output: 'report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      storeScreenshots: false,
      metadata: {
        'App Version': '0.0.1',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome  83.0.4103.116',
        'Platform': 'OSX',
        'Parallel': 'Scenarios',
        'Executed': 'Remote'
      }
    }
    reporter.generate(options)
  }
}
