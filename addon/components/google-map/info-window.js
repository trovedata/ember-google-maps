/* global google */
import Ember from 'ember';
import { ChildMixin, RenderBlockMixin } from 'ember-composability-tools';

const { observer, computed, get, getProperties, set } = Ember;

export default Ember.Component.extend(ChildMixin, RenderBlockMixin, {
  tagName: '',

  map: computed.alias('parentComponent.map'),

  _lat: computed.or('lat', 'parentComponent.lat'),
  _lng: computed.or('lng', 'parentComponent.lng'),

  isOpen() {
    let map = get(this, 'layer').getMap();

    return (map !== null && typeof map !== "undefined");
  },

  windowOpenChange: observer('open', function() {
    if (get(this, 'open')) {
      if (!this.isOpen()) {
        set(this, 'shouldRender', true);
        get(this, 'layer').open(get(this, 'map'), get(this, 'parentComponent.layer'));
      }
    } else {
      if (this.isOpen()) {
        set(this, 'shouldRender', false);
        get(this, 'layer').close();
      }
    }
  }),

  init() {
    this._super(...arguments);

    if (get(this, 'open')) {
      set(this, 'shouldRender', true);
    }
  },

  didInsertParent() {
    this._super(...arguments);

    let infoWindow = set(this, 'layer', new google.maps.InfoWindow({
      content: get(this, 'destinationElement'),
      position: {
        lat: get(this, '_lat'),
        lng: get(this, '_lng')
      }
    }));

    infoWindow.addListener('closeclick', get(this, 'onClose'));

    this.windowOpenChange();
  }
});
