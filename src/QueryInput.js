import $ from 'jquery';

class QueryInput {
  constructor() {
    this.$el = $('<div class="query-input"></div>');
    this._queries = [];
  }

  render() {
    this.$el.html(`
      <span class="pills-holder"></span>
      <input class="mock-input" type="text">
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
