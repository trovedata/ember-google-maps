/* global google */
import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/google-map';

const { computed, get, getProperties, set } = Ember;

export default Ember.Component.extend(ParentMixin, {
  layout,

  didInsertParent() {
    this._super(...arguments);

    let map = new google.maps.Map(this.$().find('.map').get(0), {
      zoom: 4,
      center: getProperties(this, ['lat', 'lng'])
    });

    set(this, 'map', map);
  }
});
