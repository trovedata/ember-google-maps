import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

const { computed, get } = Ember;

export default Ember.Component.extend(ChildMixin, {
  map: computed.alias('parentComponent.map'),
  tagName: '',

  didInsertParent() {
    this._super(...arguments);

    get(this, 'map').data.loadGeoJson(get(this, 'geojson'));
    get(this, 'map').data.addListener('click', get(this, 'onClick'));
  }
});
