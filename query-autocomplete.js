$(function () {

  window.createTagsInput = createTagsInput;
  function createTagsInput() {
    var tags = [];

    // TODO: soft code the placeholder
    var tagsInput = $('<div class="tags"><input type="text" placeholder="Add tags here..."></div>');
    var input = tagsInput.find('input[type="text"]');

    function pushTag(tag) {
      tags.push(tag);
      input.val('');
      tagsInput.find('.tag').remove();
      tags.slice().reverse().forEach(function (tag) {
        tagsInput.prepend($('<span class="tag">' + tag + '</span>'));
      });
    }

    function popTag() {
      tags.pop();
      tagsInput.find('.tag').remove();
      tags.slice().reverse().forEach(function (tag) {
        tagsInput.prepend($('<span class="tag">' + tag + '</span>'));
      });
    }

    tagsInput.focusin(function () {
      input.focus();
    });

    input.focus(function (event) {
      event.stopPropagation();
    });

    function showDropdown(el, list) {
      var $ul = $(document.createElement);
      $ul.addClass('dropdown');
      $ul.css({ top: el})
    }

    input.keydown(function (event) {
      if (event.keyCode === 13) {
        pushTag(input.val());
      } else if (event.keyCode === 8 && input.val() === '') {
        popTag();
      }
    });
    return tagsInput;
  }

});
