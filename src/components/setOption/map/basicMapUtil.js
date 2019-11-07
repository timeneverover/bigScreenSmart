import option from '@/defaults/options/basicMapData.js'
import mapJson from '@/components/setOption/map/mapJson.js'
export default {
  setOption(attrs, attrArr, sourceDiv) {
    let options = option;
    let thermIndex = [];
    let isLineShow = false;
    //根据后台传过来得属性改变地图的渲染
    //地图全局属性
    options.backgroundColor = attrs[2].properties[0].value;
    let filter = 'brightness(100%) saturate(100%) grayscale(30%)'
    if (attrs[2].properties[2].editable == "1") {
      filter = 'brightness(' + attrs[2].properties[2].fieldData[0].value +
        '%) saturate(' + attrs[2].properties[2].fieldData[1].value +
        '%) grayscale(' + attrs[2].properties[2].fieldData[2].value + '%)'
    }
    sourceDiv.css({
      opacity: attrs[2].properties[1].value,
      filter: filter
    })

    options.geo.zoom = attrs[2].properties[3].value;
    options.geo.center = [attrs[2].properties[4].fieldData[0].value, attrs[2].properties[4].fieldData[1].value];
    let ifDrag = attrs[2].properties[6].fieldData[0].value;
    let ifZoom = attrs[2].properties[7].fieldData[0].value;
    if (ifDrag && ifZoom) {
      options.geo.roam = true;
    } else if (!ifDrag && !ifZoom) {
      options.geo.roam = false;
    } else if (ifDrag && !ifZoom) {
      options.geo.roam = 'move';
    } else {
      options.geo.roam = 'scale';
    }
    let convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = mapJson.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };
    //子组件区域热力图数据
    options.series = [];
    let thermExist = false;
    for (let i = 0; i < attrArr.length; i++) {
      let mappedJson = {};
      let graphData = [];
      let attr_id = attrArr[i].attr_id;
      let attr_descr = attrArr[i].attr_descr;
      let data_descr = attrArr[i].data_descr.datas;
      let real_data_value = data_descr.data_value;
      data_descr.after_data_value = [];
      let after_data_value = data_descr.after_data_value;
      let mapped = attrArr[i].data_descr.mapped;
      let realData = [];
      for (let m = 0; m < mapped.length; m++) {
        if (mapped[m].value == "") {
          mappedJson[mapped[m].name] = mapped[m].name;
        } else {
          mappedJson[mapped[m].name] = mapped[m].value;
        }
      }
      for (let d = 0; d < real_data_value.length; d++) {
        after_data_value[d] = {};
        if (attr_descr.name == "区域热力层") {
          let named = mappedJson.area_id;
          let valued = mappedJson.value;
          after_data_value[d].area_id = real_data_value[d][named];
          after_data_value[d].value = real_data_value[d][valued];
        } else if (attr_descr.name == "飞线层") {
          let named = mappedJson.from;
          let valued = mappedJson.to;
          after_data_value[d].from = real_data_value[d][named];
          after_data_value[d].to = real_data_value[d][valued];
        } else if (attr_descr.name == "呼吸气泡层") {
          let named = mappedJson.name;
          let valued = mappedJson.value;
          let typed = mappedJson.type;
          after_data_value[d].name = real_data_value[d][named];
          after_data_value[d].value = real_data_value[d][valued];
          after_data_value[d].type = real_data_value[d][typed];
        }
      }
      realData = after_data_value;
      //根据index渲染不同的series
      if (attr_descr.name == "区域热力层") {
        //判断为第一个区域热力层
        thermIndex.push(i);
        thermExist = true;
      } else if (attr_descr.name == "飞线层") {
        isLineShow = true;
        //属性关联
        options.series[i] = mapComponentSeries("飞线层", attr_descr, attr_id);
        //数据关联
        let lineData = [];
        for (let j = 0; j < realData.length; j++) {
          if (realData[j].from && realData[j].to) {
            let from = realData[j].from.split(',');
            let to = realData[j].to.split(',');
            let obj = {
              coords: [
                [parseFloat(from[0]), parseFloat(from[1])],
                [parseFloat(to[0]), parseFloat(to[1])]
              ]
            }
            lineData.push(obj);
          } else {
            break;
          }

        }
        options.series[i].data = lineData;
      } else if (attr_descr.name == "呼吸气泡层") {
        //属性关联
        options.series[i] = mapComponentSeries("呼吸气泡层", attr_descr, attr_id);
        //数据关联
        let sData = [];
        let seriesData = attr_descr.properties[6].properties;
        for (let s = 0; s < seriesData.length; s++) {
          for (let j = 0; j < realData.length; j++) {
            //判断系列
            if (realData[j].type == seriesData[s].fieldData[1].value) {
              let obj = {
                name: realData[j].name,
                value: mapJson.geoCoordMap[realData[j].name].concat(realData[j].value),
                symbol: seriesData[s].fieldData[0].value,
                itemStyle: {
                  color: seriesData[s].fieldData[2].value
                }
              }
              sData.push(obj)
            }
          }
        }
        options.series[i].data = sData;
      }

    }

    //判断如果没有区域热力层
    if (thermExist) {
      let graphData = [];
      let realData = [];
      let index = thermIndex[0];
      let attr_descr = attrArr[index].attr_descr;
      let data_descr = attrArr[index].data_descr.datas;

      realData = data_descr.after_data_value

      options.geo.show = true;
      //属性关联
      options.series[index] = mapComponentSeries("区域热力层", attr_descr, attrArr[index].attr_id);
      //--填充颜色
      if (attr_descr.properties[4].editable == '2') {
        options.visualMap.show = false;
      } else {
        options.visualMap.show = true;
        options.visualMap.left = attr_descr.properties[4].properties[0].value;
        options.visualMap.bottom = attr_descr.properties[4].properties[1].value;
      }
      options.visualMap.seriesIndex = [index];
      options.visualMap.min = parseInt(attr_descr.properties[1].properties[0].value);
      options.visualMap.max = parseInt(attr_descr.properties[1].properties[2].value);
      options.visualMap.inRange.color = [attr_descr.properties[1].properties[1].value, attr_descr.properties[1].properties[3].value];

      //数据关联
      for (let j = 0; j < realData.length; j++) {
        let obj = {
          name: mapJson.provinceData[realData[j].area_id],
          value: realData[j].value
        }
        graphData.push(obj)
      }

      options.series[index].data = graphData;
    } else {
      options.visualMap.show = false;
    }

    //判断如果没有飞线层，防止出现删除后留有痕迹问题
    if (!isLineShow) {
      options.series.push({
        zlevel: 3,
        name: 'lines',
        type: 'lines',
        coordinateSystem: 'geo', //使用的坐标系
        effect: { //特效配置
          show: false
        },
        symbolSize: 0,
        data: []
      });
    }

    //根据不同的子组件渲染不同的series属性
    function mapComponentSeries(type, attr_descr, attr_id) {
      let series = {};
      let formatter = {
        "name": '{b}',
        "value": '{c}',
        "name&value": "{b}\n{c}"
      };
      if (type == '区域热力层') {
        //formatter不太好用
        options.geo.label = {
          normal: {
            show: attr_descr.properties[0].editable == "1" ? true : false,
            formatter: formatter[attr_descr.properties[0].properties[0].value],
            // formatter: '{c}',
            fontFamily: attr_descr.properties[0].properties[3].value,
            color: attr_descr.properties[0].properties[1].value,
            fontSize: attr_descr.properties[0].properties[4].value,
            textShadowColor: attr_descr.properties[0].properties[2].value,
            textShadowBlur: 5,
          }
        };
        options.geo.itemStyle = {
          areaColor: attr_descr.properties[1].properties[4].value,
          borderColor: attr_descr.properties[2].properties[0].value,
          borderType: attr_descr.properties[2].properties[2].value,
          borderWidth: attr_descr.properties[2].properties[1].value,
        };
        options.geo.emphasis = {
          label: {
            show: true,
            formatter: formatter[attr_descr.properties[3].properties[1].value],
            color: attr_descr.properties[3].properties[0].value
          },
          itemStyle: {
            areaColor: attr_descr.properties[3].properties[1].value
          }
        }
        series = {
          zlevel: 1,
          name: 'thermodynamic',
          id: attr_id,
          type: 'map',
          mapType: 'china',
          geoIndex: 0,
          roam: true,
          center: [106.5360, 38.5714],
          zoom: 1,
          selectedMode: 'single',
          data: []
        }

      } else if (type == '飞线层') {
        series = {
          zlevel: 3,
          name: 'lines',
          id: attr_id,
          type: 'lines',
          coordinateSystem: 'geo', //使用的坐标系
          effect: { //特效配置
            show: true,
            period: attr_descr.properties[0].value, //特效动画时间
            constantSpeed: attr_descr.properties[1].value, //动画移动的速度 xx像素/s
            symbol: attr_descr.properties[6].properties[6].value,
            symbolSize: attr_descr.properties[6].properties[5].value,
            color: attr_descr.properties[6].properties[2].value,
            trailLength: attr_descr.properties[2].value, //特效尾迹的长度
          },
          symbol: [attr_descr.properties[4].value, attr_descr.properties[5].value],
          symbolSize: 10,
          large: true,
          lineStyle: {
            color: { //颜色线性渐变
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: attr_descr.properties[6].properties[0].value // 0% 处的颜色
              }, {
                offset: 1,
                color: attr_descr.properties[6].properties[1].value // 100% 处的颜色
              }],
              global: false
            },
            width: attr_descr.properties[6].properties[3].value, //线宽
            opacity: attr_descr.properties[6].properties[4].value,
            curveness: attr_descr.properties[3].value //边的曲折度
          },
          data: []
        }
      } else if (type == '呼吸气泡层') {
        let ifSizeAsData = attr_descr.properties[3].fieldData[0].value;
        series = {
          zlevel: 2,
          name: 'effectScatter',
          id: attr_id,
          type: 'effectScatter',
          lengendHoverLink: true,
          coordinateSystem: 'geo',
          showEffectOn: 'render', //配置何时显示特效（绘制完成）
          rippleEffect: {
            scale: attr_descr.properties[1].value, //动画波纹最大缩放比例
            period: attr_descr.properties[4].value, //动画周期（秒）
            brushType: attr_descr.properties[5].value, //波纹绘制方式： stroke,fill
          },
          symbol: 'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
          symbolSize: function(val) {
            if (ifSizeAsData) {
              return val[2] / 1;
            } else {
              return attr_descr.properties[2].value;
            }
          },
          label: {
            show: false,
          },
          itemStyle: {
            color: '#FBF320',
            shadowBlur: 10,
            // shadowColor: 'red',
            opacity: 0.5,
          },
          hoverAnimation: true,
          data: [],
        }
      }
      return series;
    }
    return options
  }
}
