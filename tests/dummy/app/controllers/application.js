import Ember from 'ember';

const { set } = Ember;

export default Ember.Controller.extend({
  locations: Ember.A([
    {
      name: 'Ricardo',
      lat: 42,
      lng: 53,
      isOpen: false,
      active: true
    }
  ]),

  actions: {
    selectFeature(ev) {
      set(this, 'currentFeature', {
        name: 'Garrett',
        lat: 42,
        lng: 19,
        type: ev.feature.getGeometry().getType()
      });
    },

    clearFeature() {
      set(this, 'currentFeature', null);
    },

    createMarker() {
      this.get('locations').pushObject({
        name: 'Random Marker',
        lat: Math.random() * 42,
        lng: Math.random() * 19,
        isOpen: false,
        active: true
      });
    }
  }
});
