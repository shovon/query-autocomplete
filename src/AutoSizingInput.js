import $ from 'jquery';

class AutoSizeInput {
  constructor(value, className) {
    this.$el = $(`<input type="text" class="${className}">`);

    this.$el.on('propertychange change click keyup input paste', () => {
      const content = 
        $(this).val().length > 0 ? $(this).val() :
        $(this).prop("placeholder");
      const widthTester = $("<span>"+content+"</span>").hide();
      widthTester.insertAfter($(this));
      $(this).css("width",(widthTester.width() + 10)+"px");
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
