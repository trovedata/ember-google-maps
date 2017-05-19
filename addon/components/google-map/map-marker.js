/* global google */
import Ember from 'ember';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import layout from '../../templates/components/google-map/map-marker';

const { computed, get, getProperties, set } = Ember;

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  layout,
  tagName: '',

  map: computed.alias('parentComponent.map'),

  didInsertParent() {
    this._super(...arguments);

    let marker = set(this, 'layer', new google.maps.Marker({
      position: getProperties(this, ['lat', 'lng']),
      map: get(this, 'map')
    }));

    marker.addListener('click', get(this, 'onClick'));
  },

  willDestroyParent() {
    this._super(...arguments);

    get(this, 'layer').setMap(null);
  }
});
