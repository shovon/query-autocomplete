import $ from 'jquery';
import Query from './Query';
import QueryPill from './QueryPill';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';

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

export default class QueryInput {
  constructor() {
    this.$el = $(`<div class="${classNames.queryInput}"></div>`);
    this._queries = [];
  }

  render() {
    this.$el.html(`
      <span class="pills-holder ${classNames.pillsHolder}"></span>
      <input
        class="mock-input ${classNames.input}"
        placeholder="Start typing your query"
        type="text">
    `);

    const $pillsHolder = this.$el.find('.pills-holder');
    this._$pillsHolder = $pillsHolder;

    const $input = this.$el.find('.mock-input');
    this._$input = $input;
    $input.keyup(() => {
      if ($input.val()) {
        this.addQuery($input.val());
      }
    });

    this.$el.focus(({target}) => {
      console.log('Focused');
      $input.focus();
    });

    return this;
  }

  addQuery(property) {
    const query = new Query({ property: query });
    this._queries.push(query);
    const queryPill = new QueryPill(query).render();
    this._$pillsHolder.append(queryPill.$el);
    queryPill.focus(property);
    this._$input.val('');
  }
}
