export default {
  setOption(_this, attrs, sourceDiv, arr, attrId) {
    let interval = _this.$store.state.interval;
    let data = _this.moveListBarData;
    //------全局------
    //表格行数
    let totalHeight = attrs[0].properties[0].fieldData[1].value;
    let totalWidth = attrs[0].properties[0].fieldData[0].value;
    let columnNum = attrs[1].properties[0].value;
    let barBox = sourceDiv.find('.barBox');
    let listConHeight = 0;
    if (!_this.isListBarShow && !_this.isListLightShow && attrs[6].editable == '2') {
      listConHeight = totalHeight / columnNum;
    } else {
      let barHeight = barBox.height();
      listConHeight = (totalHeight / columnNum) - barHeight - 1;
    }
    sourceDiv.find('.list-content').height(listConHeight);
    //字体
    let totalFont = attrs[1].properties[1].value;
    sourceDiv.find('.list-box').css({
      "font-family": totalFont
    });
    // 轮播 + 流光
    let ifMove = attrs[1].properties[2].fieldData[0].value;
    let moveTime = attrs[1].properties[3].value * 1000;
    let duringTime = attrs[1].properties[4].value * 1000;
    let intervalNow = '';
    let scrollNum = Math.ceil(arr.length / columnNum);
    let listContent = sourceDiv.find('.list-content');
    let lightContent = sourceDiv.find('.light');
    let listBox = sourceDiv.find('.list-content-box');
    setTimeout(function() {
      listContent = sourceDiv.find('.list-content');
      lightContent = sourceDiv.find('.light');
      listBox = sourceDiv.find('.list-content-box');
      //内容  --溢出文本滚动
      let wordMove = attrs[1].properties[5].fieldData[3].fieldData[0].value;
      let wordMoveTime = attrs[1].properties[5].fieldData[4].value;
      let columnContent = sourceDiv.find('.column-name');
      let animateLoop = wordMoveTime + 's wordsLoop linear infinite normal';
      if (wordMove) {
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
        sourceDiv.find('.column-name span').css({
          "animation": ''
        });
      }
      columnContent.css({
        "font-size": attrs[1].properties[5].fieldData[0].value + 'px',
        "color": attrs[1].properties[5].fieldData[1].value,
        "font-weight": attrs[1].properties[5].fieldData[2].value,
        "width": attrs[1].properties[5].fieldData[5].value + '%',
      })
      //数值
      let valueContent = sourceDiv.find('.column-value');
      valueContent.css({
        "width": attrs[1].properties[6].fieldData[3].value + '%',
        "font-size": attrs[1].properties[6].fieldData[0].value + 'px',
        "color": attrs[1].properties[6].fieldData[1].value,
        "font-weight": attrs[1].properties[6].fieldData[2].value
      })

      //-----行配置-----
      let evenBackground = attrs[2].properties[0].value;
      let oddBackground = attrs[2].properties[1].value;
      sourceDiv.find('.list-content-wrap:even').css({
        "background-color": evenBackground
      });
      sourceDiv.find('.list-content-wrap:odd').css({
        "background-color": oddBackground
      });
      //-----序列号-----
      sourceDiv.find('.column-index').css({
        "width": attrs[3].properties[0].value + '%',
        "color": attrs[3].properties[1].fieldData[0].value,
        "font-size": attrs[3].properties[1].fieldData[1].value + 'px'
      });
      sourceDiv.find('.content-index .index-bg').css({
        "font-weight": attrs[3].properties[1].fieldData[2].value
      });
      //-----柱状图-----
      let barContent = sourceDiv.find('.bar');
      barContent.css({
        "background": attrs[4].properties[0].value,
        "height": attrs[4].properties[1].value + 'px'
      });
      //-----流光-----
      lightContent.css({
        "background": attrs[5].properties[0].value,
        "width": attrs[5].properties[1].value + 'px',
        "height": attrs[5].properties[2].value + 'px',
        "box-shadow": "0 0 6px 1px " + attrs[5].properties[0].value
      });
      //-----分割线-----
      if (attrs[6].editable == "1") {
        barBox.css({
          "border-bottom": "0.5px solid " + attrs[6].properties[0].value
        })
      } else {
        barBox.css({
          "border-bottom": "none"
        })
      }
    }, 10);
    //动画
    let j = 1;
    for (let h = 0; h < interval.length; h++) {
      if (interval[h].indexOf(attrId) > 0) {
        //在全局数组中删除定时器
        clearInterval(interval[h].replace(attrId, ''));
        interval.splice(h, 1);
      }
    }
    //初始化
    lightContent.css({
      "left": -attrs[5].properties[1].value + 'px'
    }).stop();
    listBox.css({
      "top": 0
    });
    listContent.css({
      "animation": ""
    })
    listContent.removeClass('vertical-flip');

    if (ifMove || _this.isListLightShow) {
      //列表超出最大高度整体轮播，来展示超出的行
      if (ifMove && _this.isListLightShow) { //字翻 光
        intervalNow = intervalCreate('all', moveTime, duringTime);
      } else if (ifMove && !_this.isListLightShow) { //字翻
        intervalNow = intervalCreate('move', moveTime, duringTime);
      } else if (!ifMove && _this.isListLightShow) { //光
        intervalNow = intervalCreate('light', moveTime, duringTime);
      }
      interval.push(intervalNow + attrId);
      _this.$store.state.interval = interval;

    }

    function intervalCreate(name, moveTime, duringTime) {
      //初始化
      if (name == 'light') {
        lightContent.animate({
          left: "100%"
        }, attrs[5].properties[3].value * 1000, "linear");
        listContent.css({
          "animation": ""
        })
      } else if (name == 'move') {
        listContent.css({
          "animation": "vertical-flip " + moveTime + "ms linear"
        })
      } else { //all
        lightContent.animate({
          left: "100%"
        }, attrs[5].properties[3].value * 1000, "linear");
        listContent.css({
          "animation": "vertical-flip " + moveTime + "ms linear"
        })
      }
      //定时器
      let intervalNow = setInterval(function() {
        if (j >= scrollNum) {
          j = 0;
        } else {
          if (listContent.hasClass('vertical-flip')) {
            listBox.css({
              "top": -totalHeight * j + "px"
            });
            ++j;
          }
        }

        if (listContent.hasClass('vertical-flip')) {
          if (name == 'light' || name == 'all') { //流光
            lightContent.animate({
              left: "100%"
            }, attrs[5].properties[3].value * 1000, "linear");
          }
          if (name == 'move' || name == 'all') {
            listContent.css({
              "animation": "vertical-flip " + moveTime + "ms linear"
            })
          }
        } else {
          if (name == 'light' || name == 'all') { //流光
            lightContent.css({
              "left": -attrs[5].properties[1].value + 'px'
            }).stop();
          }
          if (name == 'move' || name == 'all') {
            listContent.css({
              "animation": ""
            })
          }
        }
        listContent.toggleClass('vertical-flip');
      }, duringTime);
      return intervalNow;
    }

  }
}
