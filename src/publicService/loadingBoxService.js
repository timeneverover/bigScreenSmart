/**
 * Created by yancan on 2017/6/27.
 */
export default {
  open: function(text) {
    if (text == undefined || text == null)
      text = "正在加载数据,请稍候...";
    var currentoverlay = $("#loadingOverlay");
    if (currentoverlay.length > 0 && currentoverlay != null)
      currentoverlay.remove();
    var html = '<div id="loadingOverlay"><div class="spread"></div><div id="loadingDiv"><span class="public_loadingText">' + text + '</span> </div></div> ';
    $("body").append(html);
  },
  close: function() {
    var overlay = $("#loadingOverlay");
    if (overlay.length > 0 && overlay != null) {
      overlay.fadeOut(function() {
        $(this).remove();
      })
    }
  }
}
