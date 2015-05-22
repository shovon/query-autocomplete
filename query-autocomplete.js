$(function () {

  function EventEmitter(){
    this._callbacks = {}
  }

  EventEmitter.prototype.on = function (key, callback) {
    this._callbacks[key] = this._callbacks[key] || [];
    this._callbacks[key].push(callback);
  };

  EventEmitter.prototype.emit = function (key) {
    var args = Array.prototype.slice.call(arguments, 1, arguments.length);
    this._callbacks[key] && this._callbacks[key].forEach(function (callback) {
      callback.apply(null, args);
    });
  };

  //////////////////////////////////////////////////////////////////////////////

  function QueryPill() {
    EventEmitter.call(this);

    this._value = '';
  }

  _.extend(QueryPill.prototype, EventEmitter.prototype);

  QueryPill.prototype.render = function () {
    var self = this;

    this.$el = $('<span></span>');

    // TODO: use a "dropdown input" rather than a regular input.
    this._$input = $('<input type="text">');

    this._$input.keyDown(function () {
      if (event.keyCode === 13 || event.keyCode === 9) { 
        if (event.keyCode === 9) {
          event.stopPropagation();
          event.preventDefault();
        }
        self._nextStep();
      } else if (event.keyCode === 8 && input.val() === '') {
        throw new Error('Not yet implemented');
      }
    });
  };

  QueryPill.prototype._nextStep = function () {
    throw new Error('Not yet implemented');
  };

  QueryPill.prototype._updateView = function () {
    throw new Error('Why does this even exist?');
  };

  //////////////////////////////////////////////////////////////////////////////

  window.QueryInput = QueryInput;
  function QueryInput() {
    var self = this;

    var tags = [];
    this._tags = tags;

    this.$el = $('<div tabindex="-1" class="tags"></div>');
  }

  QueryInput.prototype.render = function () {
    var self = this;

    // This is the input that will be detached from the DOM, and reattached.
    var $input = $(document.createElement('input'));

    $input.attr({
      type: 'text',
      // TODO: soft code the placeholder
      placeholder: 'Add tags here...'
    });
    this._$input = $input;
    this.$el.append($input);

    this.$el.focusin(function () {
      $input.focus();
    });

    this._$input.keydown(function (event) {
      if (event.keyCode === 13 || event.keyCode === 9) { 
        if (event.keyCode === 9) {
          event.stopPropagation();
          event.preventDefault();
        }
        self._pushTag($input.val()); // TODO: do something else.
      } else if (event.keyCode === 8 && $input.val() === '') {
        self._popTag(); // TODO: do something else.
      }
    });

    this._$input.focus(function (event) {
      event.stopPropagation();
    });

    return this;
  };

  QueryInput.prototype._pushTag = function (tag) {
    var self = this;

    this._tags.push(tag);
    this._$input.val('');

    // TODO: repetition of code. DRY it out.
    this.$el.find('.tag').remove();
    this._tags.slice().reverse().forEach(function (tag) {
      self.$el.prepend($('<span class="tag">' + tag + '</span>'));
    });
  };

  QueryInput.prototype._popTag = function (tag) {
    var self = this;

    this._tags.pop();
    this.$el.find('.tag').remove();
    this._tags.slice().reverse().forEach(function (tag) {
      self.$el.prepend($('<span class="tag">' + tag + '</span>'));
    });
  };

});
