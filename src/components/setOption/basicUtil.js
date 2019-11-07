export default {
  //属性按标题分隔
  getAttrArr(attr) {
    let len = attr.length
    let attrItem = {}
    for (let i = 0; i < len; i++) {
      if (attr[i].name == '全局样式') {
        attrItem.globalStyle = attr[i].properties
      } else if (attr[i].name == 'x轴') {
        attrItem.x = attr[i].properties
        attrItem.xeditable = attr[i].editable
      } else if (attr[i].name == 'y轴') {
        attrItem.y = attr[i].properties
        attrItem.yeditable = attr[i].editable
      } else if (attr[i].name == '图例') {
        attrItem.legend = attr[i].properties
        attrItem.legendeditable = attr[i].editable
      } else if (attr[i].name == '提示框') {
        attrItem.tooltip = attr[i].properties
        attrItem.tooltipeditable = attr[i].editable
      } else if (attr[i].name == '数据系列') {
        attrItem.serdata = attr[i].properties
      } else if (attr[i].name == '动画') {
        attrItem.animate = attr[i].properties
        attrItem.animateeditable = attr[i].editable
      } else if (attr[i].name == 'Y2轴') {
        attrItem.y2 = attr[i].properties
        attrItem.yeditable2 = attr[i].editable
      }
    }
    return attrItem
  },
  /// 提示框设置
  getTooltip(toolData, isShow, chartName) {
    var toolOption = {
      show: true,
      trigger: 'item',
      axisPointer: {
        tpye: 'line',
        lineStyle: {
          color: "#e4393c",
          width: "1",
          type: "solid"
        },
        z: 2222
      },
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "#333",
      padding: 5,
      borderColor: '#fff',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontFamily: 'normal',
        fontSize: 14,
        fontWeight: 'normal'
      },
      extraCssText: 'width:100px;height:30px',
      formatter: '',
      position: function(pos, params, dom, rect, size) {
        return [pos[0], pos[1]];
      }
    }

    if (isShow == "1") {
      toolOption.show = true;
    } else {
      toolOption.show = false;
    }
    if (toolData[0].value == "数据项") {
      toolOption.trigger = "item";
      /* toolOption.formatter = function(params) {
         return params.name + "</br>" + params.value
       };*/
    } else {
      toolOption.trigger = "axis";
      /*  toolOption.formatter = function(params) {
          let val = [];
          let biao = [];
          let name = "";
          for (let i = 1; i < params.length; i++) {
            val.push(params[i].value);
            biao.push(params[i].marker);
            name = params[i].name;
          }
          return name + "</br>" + val;
        };*/
    }
    if (toolData[1].value == "悬浮") {
      toolOption.triggerOn = "mousemove";
    } else {
      toolOption.triggerOn = "click";
    }
    toolOption.hideDelay = toolData[2].fieldData[0].value;
    toolOption.backgroundColor = toolData[3].fieldData[0].value;
    let w = toolData[3].fieldData[1].fieldData[0].value;
    let h = toolData[3].fieldData[1].fieldData[1].value;
    toolOption.extraCssText = toolData[3].fieldData[1].editable != '2' ? ("width:" + w + "px" + ";height:" + h + "px") : ''
    toolOption.padding = toolData[3].fieldData[2].value;
    toolOption.position = function(pos) {
      return [pos[0] + toolData[3].fieldData[3].value, pos[1] + toolData[3].fieldData[4].value]
    }
    toolOption.borderColor = toolData[3].fieldData[5].value;
    toolOption.borderWidth = toolData[3].fieldData[6].value;
    toolOption.textStyle.color = toolData[4].fieldData[0].value;
    toolOption.textStyle.fontFamily = toolData[4].fieldData[1].value;
    toolOption.textStyle.fontSize = toolData[4].fieldData[2].value;
    toolOption.textStyle.fontWeight = toolData[4].fieldData[3].value;
    if (chartName == '柱图') {
      if (toolData[5].fieldData[0].value == "直线指示器") {
        toolOption.axisPointer.type = 'line';
      }
      toolOption.axisPointer.lineStyle.color = toolData[5].fieldData[1].fieldData[0].value;

      toolOption.axisPointer.lineStyle.width = toolData[5].fieldData[1].fieldData[1].value;
      if (toolData[5].fieldData[1].fieldData[2].value == "实线") {
        toolOption.axisPointer.lineStyle.type = "solid";
      } else if (toolData[5].fieldData[1].fieldData[2].value == "虚线") {
        toolOption.axisPointer.lineStyle.type = "dashed";
      } else {
        toolOption.axisPointer.lineStyle.type = "dotted";
      }
    }

    return toolOption
  },
  /// 动画设置
  getAnimate(anData, isShow) {
    var option = {}
    options.animation = isShow != '2' ? true : false
    options.animationDuration = anData[0].value;
    options.animationEasing = anData[1].value;
    options.animationDurationUpdate = anData[2].value;
    /*   animationDurationUpdate: function (idx) {
		    // 越往后的数据延迟越大
		    return idx * 100;
		}*/
    return option
  },

  // 图例设置
  getLegend(legData, isShow) {
    var legOption = {
      show: true,
      orient: 'horizontal',
      x: 'center', //图例布局位置
      y: 'bottom',
      itemGap: 55, //图例布局左右间距
      padding: [0, 8], //图例布局上下间距
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { //图例文本样式
        color: '#ffffff',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20
      }
    }

    if (isShow == "1") {
      legOption.show = true;
    } else {
      legOption.show = false;
    }
    legOption.textStyle.fontSize = legData[0].fieldData[0].value;
    legOption.textStyle.color = legData[0].fieldData[1].value;
    legOption.textStyle.fontWeight = legData[0].fieldData[2].value;
    legOption.itemGap = legData[1].fieldData[0].fieldData[0].value; //左右间距
    let legendpadding = legData[1].fieldData[0].fieldData[1].value;
    if (legendpadding < 0) {
      legOption.padding = [0, 8];
    } else {
      legOption.padding = [legendpadding, 8];
    };

    let v = legData[1].fieldData[1].value; //底部居中
    switch (v) {
      case "顶部居中":
        legOption.x = 'center';
        legOption.y = 'top';
        break;
      case "顶部居左":
        legOption.x = 'left';
        legOption.y = 'top';
        break;
      case "顶部居右":
        legOption.x = 'right';
        legOption.y = 'top';
        break;
      case "底部居中":
        legOption.x = 'center';
        legOption.y = 'bottom';
        break;
      case "底部局左":
        legOption.x = 'left';
        legOption.y = 'bottom';
        break;
      case "底部居右":
        legOption.x = 'right';
        legOption.y = 'bottom';
        break;
      default:
        legOption.x = 'center';
        legOption.y = 'bottom';
    }
    return legOption
  },

  // 返回数据格式方法
  getFormatMethod(formatters) {
    let strOption = ''
    if (formatters == "默认") {
      strOption = null;
    } else if (formatters == "11(整数)") {
      strOption = function(value) {
        return parseInt(value);
      };
    } else if (formatters == "11.1(浮点数)") {
      strOption = function(value) {
        return parseFloat(value).toFixed(1)
      };
    } else if (formatters == "11.11(浮点数)") {
      strOption = function(value) {
        return parseFloat(value).toFixed(2)
      };
    }
    return strOption
  },
  //单独设置带有渐变填充的属性的颜色
  setColor(colorData) {
    let color = '';
    if (colorData.value == "颜色填充") {
      color = colorData.fieldData[0].value;
    } else { //渐变填充
      let xVal = 0;
      let yVal = 0;
      let val = colorData.fieldData[1].fieldData[2].value;
      if (val >= 180) {
        yVal = 1
        xVal = (val - 180) / 180;
      } else {
        xVal = 1
        yVal = val / 180;
      }
      color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: xVal,
        y2: yVal,
        colorStops: [{
          offset: 0,
          color: colorData.fieldData[1].fieldData[0].value
        }, {
          offset: 1,
          color: colorData.fieldData[1].fieldData[1].value
        }],
        globalCoord: false // 缺省为 false
      }
    }
    return color
  },
  //获取改变映射后的数据数组
  getRealData(datas, mapped) {
    let realData = [];
    for (let j = 0; j < datas.length; j++) {
      let obj = {};
      let _param = '';
      let _afterParam = '';
      for (let i = 0; i < mapped.length; i++) {
        _param = mapped[i].name;
        if (mapped[i].value) { //修改过
          _afterParam = mapped[i].value;
        } else {
          _afterParam = _param;
        }
        obj[_param] = datas[j][_afterParam];
      }
      realData.push(obj)
    }
    return realData
  },
  //数字滚动动画
  /* numBox:包含数字的元素
     startNum:起始数字
     endNum:终止数字
     speed:数字变化速度
     endSign:数字后的符号
     point:小数点位数
  */
  numRunFun(numBox, startNum, endNum, speed, endSign, point) {
    let numText = startNum;
    let golb = '';

    function numSlideFun() {
      if (startNum > endNum) {
        numText -= speed; //增加的值越小，速率越慢
        if (numText <= endNum) {
          numText = endNum;
          cancelAnimationFrame(golb);
        } else {
          golb = requestAnimationFrame(numSlideFun);
        }
      } else {
        numText += speed; //增加的值越小，速率越慢
        if (numText >= endNum) {
          numText = endNum;
          cancelAnimationFrame(golb);
        } else {
          golb = requestAnimationFrame(numSlideFun);
        }
      }

      numBox.html((~~(numText)).toFixed(point) + endSign)
    }
    numSlideFun();
  }

}
