import option from '@/defaults/options/pie/carouselPieData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
  setOption(attrs, basicChart, datas, mapped, sourceDiv, attrId, _this) {
    let options = option
    //数据
    let rData = [];
    let numSum = 0;
    let realData = basicUtil.getRealData(datas, mapped);
    let interval = _this.$store.state.interval;
    let intervalNow = '';
    for (let h = 0; h < interval.length; h++) {
      if (interval[h].indexOf(attrId) > 0) {
        //在全局数组中删除
        clearInterval(interval[h].replace(attrId, ''));
        interval.splice(h, 1);
      }
    }
    for (let r = 0; r < realData.length; r++) {
      numSum += parseInt(realData[r].value);
      let obj = {
        name: realData[r].type,
        value: realData[r].value
      }
      rData.push(obj);
    }
    options.series[0].data = rData;
    //第一个数据的data为selected
    options.series[0].data[0].selected = true;

    //饼图属性
    options.series[0].radius = [(attrs[1].properties[0].value * 100 + '%'), (attrs[1].properties[1].value * 100 + '%')];

    //中间百分比部分
    let centerBox = sourceDiv.children('#centerDiv');
    let numDiv = '';
    if (centerBox) {
      centerBox.remove();
    }
    if (attrs[2].properties[1].fieldData[0].value) { //显示真实数值
      numDiv = '<div id="numBox"><span id="num">20</span></div>';
    } else {
      if (attrs[2].properties[4].value == "后置") {
        numDiv = '<div id="numBox"><span id="num">20</span><span id="sign">' + attrs[2].properties[2].value + '</span></div>';
      } else {
        numDiv = '<div id="numBox"><span id="sign">' + attrs[2].properties[2].value + '</span><span id="num">20</span></div>';
      }
    }
    let centerDiv = '<div id="centerDiv" style="position:absolute;top:0;width:100%;height:100%;text-align:center;display:flex;flex-direction:column;justify-content:center;">' + numDiv + '<div id="nameBox">系列</div></div>';
    sourceDiv.append(centerDiv);
    centerBox = sourceDiv.children('#centerDiv');
    let numBox = centerBox.children('#numBox').children('#num');
    let signBox = centerBox.children('#numBox').children('#sign');
    let nameBox = centerBox.children('#nameBox');
    centerBox.css({
      "font-family": attrs[2].properties[0].fieldData[0].value,
      "color": attrs[2].properties[0].fieldData[1].value,
      "font-weight": attrs[2].properties[0].fieldData[2].value,
      "z-index": '-1'
    })
    signBox.css({
      "font-size": attrs[2].properties[3].value + 'px',
      "margin-left": attrs[2].properties[5].value + 'px',
      "margin-right": attrs[2].properties[5].value + 'px'
    })
    numBox.css({
      "font-size": attrs[2].properties[6].value + 'px',
    })
    let animation = "rotate-x " + (attrs[1].properties[3].value / 1000) + "s infinite";
    nameBox.css({
      "font-size": attrs[2].properties[7].value + 'px',
      "animation": animation
    })
    //饼图轮播
    intervalNow = tools.loopShowTooltip(basicChart, options, {
      loopSeries: true,
      interval: attrs[1].properties[3].value,
      moveTime: attrs[1].properties[2].value,
      numBox: numBox,
      nameBox: nameBox,
      realData: rData,
      numSum: numSum,
      ifRealNum: attrs[2].properties[1].fieldData[0].value,
      attrId: attrId
    }).interval;
    if (intervalNow != 0) {
      interval.push(intervalNow);
      _this.$store.state.interval = interval;
    }

    //图例
    let attrLegend = basicUtil.getAttrArr(attrs);
    options.legend = basicUtil.getLegend(attrLegend.legend, attrLegend.legendeditable);
    //自定义类别
    let seriesNum = attrs[4].properties.length;
    for (let n = 0; n < seriesNum; n++) {
      options.color[n] = attrs[4].properties[n].fieldData[0].value;
    }

    return options
  }
}
