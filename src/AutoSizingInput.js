import $ from 'jquery';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';
import EventEmitter from 'events';

const classNames = createStyles({
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    width: '0'
  }
}, APP_NAME);

export default class AutoSizingInput extends EventEmitter {
  constructor(value) {
    super();

    this.$el = $(`
      <input
        type="text"
        class="${classNames.input}">`);

    // This handles the case when the user changes the content of the textbox.
    this.$el.on('propertychange change click keyup input paste', (e) => {

      this.adjustWidth();

      this.emit('change');

      // TODO: determine if the user pressed backspace or not.
      if (this.val() === '' && e.keyCode === 8) {
        this.emit('deleted');
      }

      this._lastValue = this.val();

    });

  }

  adjustWidth() {
    // Update width.
    const content = 
      this.val().length > 0 ? this.val() :
      this.$el.prop("placeholder");
    const widthTester = $("<span>"+content+"</span>").hide();
    widthTester.insertAfter(this.$el);
    this.$el.css("width",(widthTester.width() + 10)+"px");
    widthTester.remove();
  }

  val(...param) {
    return this.$el.val(...param);
  }

  isEmpty() {
    return this.$el.val().length === 0;
  }

  focus() {
    this.$el.focus();
  }
}
