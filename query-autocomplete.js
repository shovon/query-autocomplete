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

  class AutoSizeInput {
    constructor(value, className) {
      this.$el = $(`<input type="text" class="${className}">`);

      this.$el.keyup(function () {
        //firstly take the content or placeholder if content is missing
        var content = 
            $(this).val().length > 0 ? $(this).val() :
            $(this).prop("placeholder");
        //create testing element with same content as input
        var widthTester = $("<span>"+content+"</span>").hide();
        // place testing element into DOM after input (so it inherits same
        // formatting as input does) 
        widthTester.insertAfter($(this));
        //set inputs width; you may want to use outerWidth() or innerWidth()
        //depending whether you want to count padding and border or not
        $(this).css("width",(widthTester.width() + 200)+"px");
        //remove element from DOM
        widthTester.remove();
     });
    }

    val(...param) {
      return this.$el.val(...param);
    }

    focus() {
      this.$el.focus();
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  class QueryPill {
    constructor(query) {
      this._query = query;
      this.$el = $('<span class="pill"></span>');
    }

    render() {
      // $('<input type="text" class="property">');
      this._propertyInput =
        new AutoSizeInput(this._query.property, 'property');

      // this._$comparatorInput = $('<input type="text" class="comparator">');
      this._comparatorInput =
        new AutoSizeInput(this._query.comparator, 'comparator');

      // this._$valueInput = $('<input type="text" class="value">');
      this._valueInput =
        new AutoSizeInput(this._query.value, 'value');

      // this._$propertyInput.val(this._query.property);
      // this._$comparatorInput.val(this._query.comparator);
      // this._$valueInput.val(this._query.value);

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
