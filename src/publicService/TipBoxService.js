/**
 * Created by dell on 2017/6/26.
 */
export default {
  timer: null,
  open: function(type, text) {
    if ($("#publicTipBox").length > 0) {
      if (this.timer != null)
        clearTimeout(this.timer);
      $("#publicTipBox").stop().remove();
    }
    var backColor = type == 'success' ? '#27343e' : 'RGB(93,43,62)';
    var borderColor = type == 'success' ? '#12b3ff' : '#DC6547';
    var htmlStr = '<div style="z-index:999999;background-color:' + backColor + ';border-color:' + borderColor + '" class="publicTipBox" id="publicTipBox">' +
      '<span class="publicTipText"> ' + text + '</span>' +
      '</div>';
    $("body").append(htmlStr);
    this.timer = setTimeout(function() {
      $("#publicTipBox").fadeOut(1000, function() {
        $("#publicTipBox").remove();
      });
    }, 2000)

  }
}
