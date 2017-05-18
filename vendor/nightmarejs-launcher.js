/*global  Testem, arguments*/
'use strict'
var Nightmare = require('nightmare')
require('nightmare-custom-event')(Nightmare)

Nightmare.action('sendImage',
  function (ns, options, parent, win, renderer, done) {
    parent.respondTo('sendImage', function (image, done) {
      win.webContents.send('return-image-event', {
        image: image
      }).catch(function (error) {
        console.error('error-send-image', error)
      })
      done()
    })
    done()
  },
  function (image, done) {
    this.child.call('sendImage', image, done)
  })

var nightmare = Nightmare(
//   {
//   openDevTools: {
//     mode: 'detach'
//   },
//   show: true
// }
)
var url = process.argv[2]
nightmare
  .viewport(3000, 8000)
  .wait(2000)
  .on('capture-event', function (data) {
    try {
      console.log(data.rect)
      nightmare.screenshot(undefined, data.rect).then(function (result) {
        var image = result.toString('base64')
        nightmare.sendImage(image).then(function (result) {
        }).catch(function (error) {
          console.error('error-call-send-image', error)
        })
      }).catch(function (error) {
        console.error('Search failed:', error)
      })
    } catch (error) {
      console.error('error-capture', error)
    }
  })
  .bind('capture-event')
  .goto(url)
  .evaluate(function () {
    Testem.afterTests(
      // Asynchronously
      function (config, data, callback) {
        callback(null)
        // Set time to wait for callback to finish its work. Then close launcher (Issue Testem: fails to close custom launcher on Linux) https://github.com/testem/testem/issues/915
      }
    )
  })
  .then(function (result) {
    console.error(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error)
    console.error('error.error', error)
  })
