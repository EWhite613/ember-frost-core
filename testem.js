var Reporter = require('ember-test-utils/reporter')

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  'launch_in_ci': [
    'NightmareJsVisualAcceptance'
  ],
  'launch_in_dev': [
    'Firefox'
  ],

  'launchers': {
    'PhantomJsVisualAcceptance': {
      'command': 'phantomjs vendor/phantomjs-launcher.js <url>',
      'protocol': 'browser'
    },
    'SlimerJsVisualAcceptance': {
      'command': 'slimerjs --debug=true --error-log-file=error.log vendor/phantomjs-launcher.js <url>',
      'protocol': 'browser'
    },
    'NightmareJsVisualAcceptance': {
      'command': 'DEBUG=nightmare* node vendor/nightmarejs-launcher.js <url>',
      'protocol': 'browser'
    }
  },
  reporter: new Reporter(),
  test_page: 'tests/index.html?hidepassed'
}
