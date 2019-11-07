import option from '@/defaults/options/pie/proportionPieData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
  setOption(attrs, datas, mapped, sourceDiv) {
    let options = option
    //数据
    let realData = basicUtil.getRealData(datas, mapped)[0];
    console.log('realData:'+JSON.stringify(realData))
    //字体
    options.series[1].label.fontFamily = attrs[1].value;
    //数值
    options.series[1].label.fontSize = attrs[2].properties[0].value;
    options.series[1].label.clolor = attrs[2].properties[1].value;
    options.series[1].label.fontWeight = attrs[2].properties[2].value;
    var realPercent=realData[mapped[1].name]/realData[mapped[0].name]*100
    options.series[1].label.formatter = function(params) {
      if (attrs[2].properties[4].fieldData[0].value) {
      	return realPercent.toFixed(attrs[2].properties[3].value)+'%'
//      return params.value
      } else {
        return params.percent.toFixed(attrs[2].properties[3].value) + '%';
      }
    }
    //中心数字滚动
    let numBox = sourceDiv.children('#numBox');
  /*  if (attrs[2].properties[4].fieldData[0].value) { //真实数值
      options.series[1].label.show = true;
      if (numBox) {
        numBox.remove();
      }
    } else {*/
      options.series[1].label.show = false;
      if (numBox) { //删除上次生成的元素
        numBox.remove();
      }
      let numDiv = '<div id="numBox"></div>';
      sourceDiv.append(numDiv);
      numBox = sourceDiv.children('#numBox');
      numBox.css({
        "position": 'absolute',
        "top": 0,
        "width": '100%',
        "text-align": 'center',
        "line-height": attrs[0].properties[0].fieldData[1].value + 'px',
        "font-size": attrs[2].properties[0].value,
        "color": attrs[2].properties[1].value,
        "font-weight": attrs[2].properties[2].value,
        "z-index": '-1'
      })
      if (attrs[2].properties[4].fieldData[0].value){
      	basicUtil.numRunFun(numBox, 1, realPercent, 0.5, '%', attrs[2].properties[3].value);
     }else{
     	basicUtil.numRunFun(numBox, 1, 20, 0.5, '%', attrs[2].properties[3].value);
     }
//  }
    //扇形
    if (parseInt(realData.actual) > parseInt(realData.aims)) {
      options.series[1].color = [basicUtil.setColor(attrs[3].properties[3]), attrs[3].properties[2].value];
    } else {
      options.series[1].color = [basicUtil.setColor(attrs[3].properties[1]), attrs[3].properties[2].value];
    }
    options.series[1].radius = [(attrs[3].properties[4].value * 100 + '%'), (attrs[3].properties[5].value * 100 + '%')];
    options.series[1].startAngle = attrs[3].properties[6].value;
    let text = "";
    if (attrs[3].properties[7].value == "" && attrs[3].properties[8].value == "") {
      text = "";
    } else if (attrs[3].properties[8].value == "") {
      text = attrs[3].properties[7].value + realData.aims;
    } else if (attrs[3].properties[7].value == "") {
      text = attrs[3].properties[8].value + realData.actual;
    } else {
      text = attrs[3].properties[7].value + realData.aims + "   " + attrs[3].properties[8].value + realData.actual;
    }
    options.title.text = text;

    //内环
    options.series[0].color = [attrs[4].properties[0].value];
    options.series[0].radius = [(attrs[4].properties[1].value * 100 + '%'), (attrs[4].properties[2].value * 100 + '%')];
    //图例
    let attrLegend = basicUtil.getAttrArr(attrs);
    options.legend = basicUtil.getLegend(attrLegend.legend, attrLegend.legendeditable)
    options.legend.formatter = attrs[3].properties[0].value;
    //动画
    options.animation = attrs[6].editable != '2'
    options.animationDuration = attrs[6].properties[0].value;
    options.animationEasing = attrs[6].properties[1].value;
    options.animationDurationUpdate = attrs[6].properties[2].value;
    //数据
    let percent = realData.actual / realData.aims;
    options.series[1].data = [{
      name: attrs[3].properties[0].value,
      value: realData.actual
    }, {
      name: '',
      value: (realData.aims - realData.actual),
      label: {
        show: false
      },
      tooltip: {
        show: false
      }
    }]


    return options
  }
}
