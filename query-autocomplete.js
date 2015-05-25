// TODO: move this Webpack.

$(function () {

  // TODO: use CommonJS event emitter.
  class EventEmitter {
    constructor() {
      this._callbacks = {};
    }

    on(key, callback) {
      this._callbacks[key] = this._callbacks[key] || [];
      this._callbacks[key].push(callback);
    }

    emit(key, ...params) {
      if (this._callbacks[key]) {
        this._callbacks[key].forEach((callback) => {
          null::callback(...params);
        });
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  // <!-- A <query-input /> will be equivalent to: -->
  //
  // <div>
  //   <span class="pills-holder">
  //     <span>
  //       <input type="text">
  //       <input type="text">
  //       <input type="text">
  //     </span>
  //     <!-- ... more pills below. -->
  //   </span>
  //   <input class="mock-input" type="text">
  // </div>

  //////////////////////////////////////////////////////////////////////////////

  class Query {
    constructor(query) {
      this.property = query.property;
      this.comparator = query.comparator;
      this.value = query.value;
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  class QueryPill {
    constructor(query) {
      this._query = query;
      this.$el = $('<span></span>');
    }

    render() {
      this._$propertyInput = $('<input type="text" class="property">');
      this._$comparatorInput = $('<input type="text" class="comparator">');
      this._$valueInput = $('<input type="text" class="value">');

      this._$propertyInput.val(this._query.property);
      this._$comparatorInput.val(this._query.comparator);
      this._$valueInput = $(this._query.value);

      this.$el.append(this._$propertyInput);
      this.$el.append(this._$comparatorInput);
      this.$el.append(this._$valueInput);

      return this;
    }

    focus(property) {
      this._$propertyInput.val(property);
      this._$propertyInput.focus();
    }
  }

  //////////////////////////////////////////////////////////////////////////////

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

      var $input = this.$el.find('.mock-input');
      this._$input = $input;
      $input.keyup(() => {
        if ($input.val()) {
          this.addQuery($input.val());
        }
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

  // TODO: have this be in the final build script instead of this source file.
  window.QueryInput = QueryInput;
});
