import Ember from 'ember';

const { Helper, get, set, computed, observer } = Ember;

export function average(values) {
  let sum = values.reduce((a, b) => {
    return a + b;
  }, 0);

  return sum / get(values, 'length');
}

export default Ember.Helper.extend({
  content: Ember.computed('values.[]', function() {
    let values = get(this, 'values');

    return average(values);
  }),

  compute([values]) {
    set(this, 'values', values);

    return get(this, 'content');
  },

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
