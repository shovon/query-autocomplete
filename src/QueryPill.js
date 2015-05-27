import $ from 'jquery';

export default class QueryPill {
  constructor(query) {
    this._query = query;
    this.$el = $('<span class="pill"></span>');
  }

  render() {
    this._propertyInput =
      new AutoSizeInput(this._query.property, 'property');

    this._comparatorInput =
      new AutoSizeInput(this._query.comparator, 'comparator');

    this._valueInput =
      new AutoSizeInput(this._query.value, 'value');

    this.$el.append(this._propertyInput.$el);
    this.$el.append(this._comparatorInput.$el);
    this.$el.append(this._valueInput.$el);

    return this;
  }

  focus(property) {
    this._propertyInput.val(property);
    this._propertyInput.focus();
  }
}
