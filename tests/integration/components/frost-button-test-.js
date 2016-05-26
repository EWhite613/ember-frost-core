import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'


describeComponent(
  'frost-button',
  'Integration: FrostButtonComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-button}}
      //     template content
      //   {{/frost-button}}
      // `);
      console.log(this)
      this.render(hbs`{{frost-button}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
