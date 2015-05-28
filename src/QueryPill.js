import $ from 'jquery';
import AutoSizingInput from './AutoSizingInput';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';
import { EventEmitter } from 'events';

const classNames = createStyles({
  pill: {
    backgroundColor: '#CFE1FF',
    borderRadius: '5px',
    margin: '5px',
    padding: '5px',
    display: 'inline-block'
  },

  property: {
    fontWeight: 'bold'
  }
}, APP_NAME);

// TODO: investigate the viability of using 

export default class QueryPill extends EventEmitter {
  constructor(query) {
    super();

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

    // Edit logic.

    this._valueInput.on('deleted', () => {
      this._comparatorInput.focus();
    });

    this._comparatorInput.on('deleted', () => {
      this._propertyInput.focus();
    });

    this._propertyInput.on('deleted', () => {
      if (this._valueInput.isEmpty() && this._comparatorInput.isEmpty()) {
        this.removePill();
      } else {
        this.goBack();
      }
    });

    return this;
  }

  removePill() {
    this.emit('deleted');
  }

  goBack() {
    this.emit('go-back');
  }

  focus(property) {
    this._propertyInput.val(property);
    this._propertyInput.focus();
  }
}
