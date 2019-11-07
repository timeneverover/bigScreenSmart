export default {
  setOption(_this, attrs, sourceDiv, arr, attrId) {
    let interval = _this.$store.state.interval;
    //------全局------
    //表格行数
    let totalHeight = attrs[0].properties[0].fieldData[1].value;
    let columnNum = attrs[1].properties[0].value;
    let headHeight = _this.isHeadShow ? sourceDiv.find('.list-header').height() : 0;
    let listConHeight = (totalHeight - headHeight) / columnNum;
    sourceDiv.find('.list-content').height(listConHeight);
    //轮播
    let listContentBox = sourceDiv.find('.list-content-box');
    let ifMove = attrs[1].properties[1].fieldData[0].value;
    let moveType = attrs[1].properties[3].fieldData[0].value;
    let moveTime = attrs[1].properties[3].fieldData[1].value * 1000;
    let ifSingleNotMove = attrs[1].properties[3].fieldData[2].fieldData[0].value;
    let isSingle = listContentBox.height() == (totalHeight - headHeight) ? true : false;
    let moveTop = 0;
    let scrollNum = 0;
    let intervalNow = '';
    for (let h = 0; h < interval.length; h++) {
      if (interval[h].indexOf(attrId) !=-1) {
      	console.log('clear intercal:'+attrId)
        //在全局数组中删除
        clearInterval(interval[h].replace(attrId, ''));
        interval.splice(h, 1);
      }
    }
    if (ifMove && !(isSingle && ifSingleNotMove)) {
      listContentBox.css({
        top: 0
      }).stop();
      moveTop = moveType == "全部滚动" ? (totalHeight - headHeight) : listConHeight;
      scrollNum = moveType == "全部滚动" ? Math.ceil(arr.length / columnNum) : arr.length;
      let n = 1;
      let j = scrollNum;
      intervalNow = setInterval(function() {
        j--;
        listContentBox.animate({
          top: -moveTop * n + 'px'
        })
        if (j > 1) {
          n++;
        } else {
          listContentBox.css({
            top: 0
          })
          j = scrollNum + 1;
          n = 0;
        }
      }, moveTime);
      interval.push(intervalNow + attrId);
      _this.$store.state.interval = interval;

    } else {
      listContentBox.css({
        top: 0
      });
      listContentBox.stop();
    }
    //溢出文本滚动
    let wordMove = attrs[1].properties[5].fieldData[0].fieldData[0].value;
    let wordMoveTime = attrs[1].properties[5].fieldData[1].value;
    let animateLoop = wordMoveTime + 's wordsLoop linear infinite normal';
    if (wordMove) {
      let columnContent = sourceDiv.find('.column-content');
      for (let i = 0; i < columnContent.length; i++) {
        let column = columnContent[i];
        let columnSWidth = column.scrollWidth;
        let columnWidth = $(column).width();
        if (columnSWidth > columnWidth) {
          $(column).find('span').css({
            "animation": animateLoop
          });
        }
      }
    } else {
      sourceDiv.find('.column-content span').css({
        "animation": ''
      });
    }

    //字体
    let totalFont = attrs[1].properties[2].value;
    //动画
    //空值隐藏行
    //溢出文本滚动
    sourceDiv.find('.list-box').css({
      "font-family": totalFont
    });
    //-----表头-----
    //表头行高
    let titleLineHeight = attrs[2].properties[0].value * 2;
    let titleBackground = attrs[2].properties[1].value;
    let titleTextAlign = attrs[2].properties[2].fieldData[0].value;
    let titleFont = attrs[2].properties[2].fieldData[1].value;
    let titleColor = attrs[2].properties[2].fieldData[2].value;
    let titleFontSize = attrs[2].properties[2].fieldData[3].value + 'px';
    let titleFontWeight = attrs[2].properties[2].fieldData[4].value;
    let titleTextAlignObj = {
      "左对齐": "left",
      "居中对齐": "center",
      "右对齐": "right"
    }
    sourceDiv.find('.list-header').css({
      "height": titleLineHeight,
      "background-color": titleBackground,
      "text-align": titleTextAlignObj[titleTextAlign],
      "font-family": titleFont,
      "color": titleColor,
      "font-size": titleFontSize,
      "font-weight": titleFontWeight
    });
    //-----行配置-----
    let evenBackground = attrs[3].properties[0].value;
    let oddBackground = attrs[3].properties[1].value;
    sourceDiv.find('.list-content:even').css({
      "background-color": evenBackground
    });
    sourceDiv.find('.list-content:odd').css({
      "background-color": oddBackground
    });
    //-----序列号-----
    let numBackgroundColor = attrs[4].properties[0].value;
    let numWide = attrs[4].properties[1].value + '%';
    let numcircle = attrs[4].properties[2].value;
    let numColor = attrs[4].properties[3].fieldData[0].value;
    let numFontSize = attrs[4].properties[3].fieldData[1].value + 'px';
    let numFontWeight = attrs[4].properties[3].fieldData[2].value;
    sourceDiv.find('.column-index').css({
      "width": numWide,
      "color": numColor,
      "font-size": numFontSize
    });
    let wid = sourceDiv.find('.content-index').width() * numcircle / 150 + 'px';
    sourceDiv.find('.content-index .index-bg').css({
      "background-color": numBackgroundColor,
      "width": wid,
      "height": wid,
      "line-height": wid,
      "font-weight": numFontWeight
    });
  }
}
