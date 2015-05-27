import $ from 'jquery';
import createStyles from 'styles.js';
import { APP_NAME } from './constants';

const classNames = createStyles({
  input: {
    background: 'none',
    border: 'none',
    outline: 'none',
    width: '0'
  }
}, APP_NAME);

export default class AutoSizingInput {
  constructor(value, className) {
    this.$el = $(`
      <input
        type="text"
        class="${classNames.input} ${className}">`);

    this.$el.on('propertychange change click keyup input paste', () => {
      const content = 
        this.$el.val().length > 0 ? this.$el.val() :
        this.$el.prop("placeholder");
      const widthTester = $("<span>"+content+"</span>").hide();
      widthTester.insertAfter(this.$el);
      this.$el.css("width",(widthTester.width() + 10)+"px");
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
