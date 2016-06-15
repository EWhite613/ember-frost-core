import _ from 'lodash'
import Ember from 'ember'
const {Component, deprecate} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: 'frost-icon',
  classNameBindings: ['iconClass'],
  tagName: 'svg',

  propTypes: {
    pack: PropTypes.string,
    icon: PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      pack: 'frost'
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('icon', 'pack')
  /**
   * Get class for icon
   * @param {String} icon - icon to render
   * @param {String} pack - pack to get icon from
   * @returns {String} class for icon
   */
  iconClass (icon, pack) {
    return `frost-icon-${pack}-${icon}`
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /* Ember.Component method */
  didReceiveAttrs ({newAttrs}) {
    deprecate(
      'nested icon paths have been deprecated in favor of flat icon packs',
      !_.includes(_.get(newAttrs, 'icon.value'), '/'),
      {
        id: 'frost-debug.deprecate-nested-icon-paths',
        until: '1.0.0',
        url: 'http://ciena-frost.github.io/ember-frost-core/#/icons'
      }
    )
  }

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================
})
