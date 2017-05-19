import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-map', 'Integration | Component | google map', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{google-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#google-map}}
      template block text
    {{/google-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
