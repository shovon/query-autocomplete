import $ from 'jquery';
import Query from './Query';
import QueryPill from './QueryPill';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';
import { removeAt, setAt } from 'idempotent/bound';

const classNames = createStyles({
  queryInput: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    padding: '12px',
    border: '1px solid black'
  },

  input: {
    border: 'none',
    outline: 'none'
  }
}, APP_NAME);

// TODO: unit test this
function indexOf(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i)) {
      return i
    }
  }
  return -1;
}

const defaultPlaceholder = 'Start typing your query';

// TODO: handle the case when the user hits backspace from the empty text input.

export default class QueryInput {
  constructor() {
    this.$el = $(`<div tabindex="-1" class="${classNames.queryInput}"></div>`);
    this._queries = [];
    this._index = 0;
  }

  render() {
    this.$el.html(`
      <span class="pills-holder ${classNames.pillsHolder}"></span>
      <input
        class="mock-input ${classNames.input}"
        placeholder="${defaultPlaceholder}"
        type="text">
    `);

    const $pillsHolder = this.$el.find('.pills-holder');
    this._$pillsHolder = $pillsHolder;

    const $input = this.$el.find('.mock-input');
    this._$input = $input;
    $input.keyup((e) => {
      if ($input.val().length > 0) {
        this.addQuery($input.val());
      } else if (e.keyCode === 8) {
        this.focusLastPill();
      }
    });

    this.$el.focus(({target}) => {
      $input.focus();
    });

    return this;
  }

  refreshPillsHolder(focusedIndex = this._queries.length - 1) {
    this._$pillsHolder.empty();

    this._queries.forEach((query, index) => {

      const queryPill = new QueryPill(query).render();

      queryPill.once('deleted', () => {
        const index = indexOf(this._queries, (a) => {
          return a.id === query.id
        });
        this._queries = this._queries::removeAt(index);
        this.refreshPillsHolder(index - 1);
      });

      queryPill.on('change', () => {
        const newQuery = new Query(query.id, queryPill.val());
        const index = indexOf(this._queries, (a) => {
          return a.id === query.id
        });
        if (index === -1) { throw new Error('Not supposed to be negative'); }
        this._queries[index] = newQuery;
      });

      this._$pillsHolder.append(queryPill.$el);
      queryPill.adjustWidth();

      if (index === focusedIndex) {
        queryPill.focus();
      }
    });

    if (this._queries.length !== 0) {
      this._$input.val('');
      this._$input.attr('placeholder', '');
    } else {
      this._$input.val('');
      this._$input.attr('placeholder', defaultPlaceholder);
      this._$input.focus();
    }
  }

  focusLastPill() {
    this.refreshPillsHolder();
  }

  addQuery(queryString) {
    this._queries.push(new Query(this._index, queryString));
    this._index++;

    this.refreshPillsHolder();
  }
}
