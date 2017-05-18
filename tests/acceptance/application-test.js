/*global capture,$ */
import {expect} from 'chai'
import {after, before, beforeEach, describe, it} from 'mocha'

import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

describe('Acceptance: Application', function () {
  let application

  this.timeout(5000)

  before(function () {
    application = startApp()
    server.loadFixtures()
  })

  after(function () {
    destroyApp(application)
    application = null
  })

  describe('visit /', function () {
    beforeEach(function () {
      return visit('/')
    })

    it('redirects correct route', function () {
      expect(currentPath()).to.equal('demo')
    })
  })

  ;[
    'area',
    'bookends',
    'button',
    'checkbox',
    'field',
    'helpers',
    'icons',
    'layout',
    'loading',
    'palette',
    'password',
    'radio',
    'scroll',
    'select',
    'toggle',
    'typography'
  ]
    .forEach((path) => {
      describe(`visit /${path}`, function () {
        this.timeout(60000)
        beforeEach(function () {
          return visit(`/${path}`)
        })

        it('renders correct route', function (done) {
          expect(currentPath()).to.equal(path)
          // if (path === 'icons'){
          //   debugger;
          // }
          var element = document.getElementById('ember-testing')
          capture(path, done, {width: element.scrollWidth,
            height: element.scrollHeight, experimentalSvgs: true})
        })
      })
    })

  describe('visit /link', function () {
    beforeEach(function () {
      return visit('/link')
    })

    it('renders correct route', function () {
      expect(currentPath()).to.equal('link.index')
    })
  })
})
