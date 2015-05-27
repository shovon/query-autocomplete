import $ from 'jquery';
import AutoSizingInput from './AutoSizingInput';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';

const classNames = createStyles({
  pill: {
    backgroundColor: '#CFE1FF',
    borderRadius: '5px',
    margin: '5px',
    padding: '5px'
  }
}, APP_NAME);

export default class QueryPill {
  constructor(query) {
    this._query = query;
    this.$el = $(`<span class="pill ${classNames.pill}"></span>`);
  }

  render() {
    this._propertyInput =
      new AutoSizingInput(this._query.property, 'property');

    this._comparatorInput =
      new AutoSizingInput(this._query.comparator, 'comparator');

    this._valueInput =
      new AutoSizingInput(this._query.value, 'value');

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
