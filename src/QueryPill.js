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
    this._input =
      new AutoSizingInput(this._query);

    // TODO: handle the event when the value in the input changes.
    this.$el.append(this._input.$el);

    this._input.on('deleted', () => {
      this.removePill();
    });

    this._input.on('change', () => {
      this.emit('change');
    })
    this._input.val(this._query.query);

    return this;
  }

  removePill() {
    this.emit('deleted');
  }

  goBack() {
    this.emit('go-back');
  }

  val() {
    return this._input.val();
  }

  adjustWidth() {
    this._input.adjustWidth();
  }

  focus() {
    this._input.val();
    this._input.focus();
  }
}
