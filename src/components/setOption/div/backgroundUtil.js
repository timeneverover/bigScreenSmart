export default {
  setOption(attrs, sourceDiv, imageUrl) {
    let defined = attrs[1].fieldData[0].value;
    let innerDiv = sourceDiv.find('.bg-inner');
    let borderRadius = defined ? '0 0 0 0' : attrs[3].properties[0].value.toString() + 'px ' +
      attrs[3].properties[2].value.toString() + 'px ' +
      attrs[3].properties[3].value.toString() + 'px ' +
      attrs[3].properties[1].value.toString() + 'px';
    if (defined) {
      let filter = 'blur(' + attrs[5].properties[0].value + ')' + ' drop-shadow(0 0 ' + attrs[6].properties[0].value + ' ' + attrs[4].properties[6].value + ')';
      sourceDiv.css({
        "background": attrs[4].properties[6].value,
        "border-radius": borderRadius,
        "filter": filter
      });
      let sourceBorder = attrs[4].properties[4].value + ' #000 ' + attrs[4].properties[3].value;
      if (attrs[4].properties[1].fieldData[0].value) { //裁剪背景为背景色
        innerDiv.css({
          "background": attrs[4].properties[5].value
        });
      } else { //不裁剪背景为图片
        //图片边框
        let border = attrs[4].properties[2].value + 'px ' + attrs[4].properties[6].value + ' ' + attrs[4].properties[3].value;
        let url = "url('" + imageUrl + attrs[4].properties[0].value + "') " + attrs[4].properties[5].value + " no-repeat";
        innerDiv.css({
          "background": url,
          'background-size': '100% 100%',
          "border": border
        });
      }
      sourceDiv.css({
        "border": sourceBorder
      })
    } else {
      let filter = 'blur(' + attrs[5].properties[0].value + ')' + ' drop-shadow(0 0 ' + attrs[6].properties[0].value + ' ' + attrs[2].value + ')';
      sourceDiv.css({
        "background": attrs[2].value,
        "border": "none",
        "border-radius": borderRadius,
        "filter": filter
      });
      innerDiv.css({
        "background": "none"
      });
    }
  }
}
