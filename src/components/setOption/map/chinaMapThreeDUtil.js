import option from '@/defaults/options/chinaMapThreeDData.js'
import mapJson from '@/components/setOption/map/mapJson.js'
export default {
  setOption(attrs, attrArr, datas) {
    let sData = datas.sdata[0];
    let min = Math.min.apply(null, datas.ydata[0]);
    let max = Math.max.apply(null, datas.ydata[0]);
    let options = option;
    let autoRotate = '';
    let autoRotateDirection = 'cw';
    let mapAlpha = '';
    let mapBeta = '';
    //visualMap最大值最小值
    if (attrs[4].editable == "2") {
      options.visualMap.show = false;
    } else {
      options.visualMap.show = true;
      options.visualMap.left = attrs[4].properties[0].value;
      options.visualMap.bottom = attrs[4].properties[1].value;
    }
    options.visualMap.min = min;
    options.visualMap.max = max;
    //全局样式改变
    if (attrs[2].properties[0].editable == "1") {
      options.geo3D.viewControl.autoRotate = 'autoRotate';
      autoRotate = 'autoRotate';
      if (attrs[2].properties[0].fieldData[0].value == "顺时针") {
        options.geo3D.viewControl.autoRotateDirection = 'cw';
        autoRotateDirection = 'cw';
      } else {
        options.geo3D.viewControl.autoRotateDirection = 'ccw';
        autoRotateDirection = 'ccw';
      }
      options.geo3D.viewControl.alpha = attrs[2].properties[0].fieldData[1].value;
      mapAlpha = attrs[2].properties[0].fieldData[1].value;
      options.geo3D.viewControl.beta = attrs[2].properties[0].fieldData[2].value;
      mapBeta = attrs[2].properties[0].fieldData[2].value;
    } else {
      options.geo3D.viewControl.autoRotate = false;
      autoRotate = false;
      mapAlpha = 30;
      options.geo3D.viewControl.alpha = 30;
    }
    //填充颜色
    options.visualMap.inRange.color = [attrs[3].properties[0].fieldData[0].value, attrs[3].properties[0].fieldData[1].value];
    //子组件渲染
    options.series = [];
    //底图层数据
    let mapDataArr = [];
    for (let s = 0; s < sData.length; s++) {
      mapDataArr.push({
        name: mapJson.provinceData[sData[s][0]],
        value: [sData[s][1]]
      })
    }
    //底图层属性
    options.series[0] = {
      name: '底图层', //底图层
      map: 'china',
      type: "map3D",
      zlevel: 0,
      viewControl: {
        autoRotate: autoRotate,
        autoRotateDirection: autoRotateDirection,
        alpha: mapAlpha,
        beta: mapBeta
      },
      coordinateSystem: 'geo3D',
      boxHeight: 10,
      regionHeight: 1,
      instancing: false,
      itemStyle: {
        color: attrs[3].properties[0].fieldData[2].value, //无数据背景色
        opacity: attrs[3].properties[0].fieldData[3].value,
        borderColor: attrs[3].properties[1].fieldData[0].value,
        borderWidth: attrs[3].properties[1].fieldData[1].value,
      },
      emphasis: { //当鼠标放上去  地区区域是否显示名称
        label: {
          show: true,
          textStyle: {
            color: 'yellow',
            fontSize: 20,
            backgroundColor: 'rgba(0,23,11,0)'
          }
        },
        itemStyle: {
          areaColor: "yellow",
          opacity: 0.9,
        }
      },
      light: { //光照阴影
        main: {
          color: '#fff', //光照颜色
          intensity: 1, //光照强度
          shadowQuality: 'high', //阴影亮度
          shadow: true, //是否显示阴影
          alpha: 40,
          beta: 40
        }
      },
      shading: 'lambert',
      data: mapDataArr
    }

    for (let i = 0; i < attrArr.length; i++) {
      let mappedJson = {};
      let attr_descr = attrArr[i].attr_descr;
      let data_descr = attrArr[i].data_descr.datas;
      let real_data_value = data_descr.data_value;
      let attr_id = attrArr[i].attr_id;
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
        if (attr_descr.name == "3D中国地图飞线层") {
          let named = mappedJson.from;
          let valued = mappedJson.to;
          after_data_value[d].from = real_data_value[d][named];
          after_data_value[d].to = real_data_value[d][valued];
        } else if (attr_descr.name == "3D中国地图柱状图层" || attr_descr.name == "3D中国地图气泡层") {
          let named = mappedJson.area_id;
          let valued = mappedJson.value;
          after_data_value[d].area_id = real_data_value[d][named];
          after_data_value[d].value = real_data_value[d][valued];
        }
      }
      realData = after_data_value;
      //series0为底图层，其余为i+1
      let seriesdata = [];
      if (attr_descr.name == "3D中国地图飞线层") { //飞线层
        //属性关联
        options.series[i + 1] = mapComponentSeries("飞线层", attr_descr, attr_id);
        //数据关联
        // let lineData = [];
        for (let j = 0; j < realData.length; j++) {
          if (realData[j].from && realData[j].to) {
            let from = realData[j].from.split(',');
            let to = realData[j].to.split(',');
            let obj = [
              [parseFloat(from[0]), parseFloat(from[1]), 0],
              [parseFloat(to[0]), parseFloat(to[1]), 0]
            ]
            seriesdata.push(obj);
          } else {
            break;
          }
        }
      } else if (attr_descr.name == "3D中国地图柱状图层" || attr_descr.name == "3D中国地图气泡层") { //柱图
        //属性关联,数据关联
        if (attr_descr.name == "3D中国地图柱状图层") { //添加最小值假数据就不会有数据显示不出来
          options.series[i + 1] = mapComponentSeries("柱状图层", attr_descr, attr_id);
          seriesdata.push({
            name: " ",
            value: [0, 0, 0]
          })
        } else {
          options.series[i + 1] = mapComponentSeries("气泡层", attr_descr, attr_id);
        }
        for (let b = 0; b < realData.length; b++) {
          let provinceName = mapJson.provinceData[realData[b].area_id];
          let geoCoord = mapJson.geoCoordMap[provinceName];
          if (geoCoord) {
            seriesdata.push({
              name: provinceName,
              value: [geoCoord[0], geoCoord[1], realData[b].value]
            })
          }
        }
      }
      options.series[i + 1].data = seriesdata;
    }

    //根据不同的子组件渲染不同的series属性
    function mapComponentSeries(type, attr_descr, attr_id) {
      let series = {};
      if (type == '柱状图层') {
        series = {
          type: "bar3D", //柱图层
          name: '柱状图',
          id: attr_id,
          coordinateSystem: 'geo3D',
          zlevel: 0,
          geo3DIndex: 0,
          bevelSize: attr_descr.properties[0].properties[2].value, //柱体的倒角（0-1），方的/椭圆的
          minHeight: 0, //最小柱子的高度
          itemStyle: { //柱状体样式
            color: attr_descr.properties[0].properties[0].value, //填充色
            opacity: attr_descr.properties[0].properties[1].value //透明度
          },
          label: { //标签设置
            show: attr_descr.properties[1].editable == "1" ? true : false,
            distance: 0,
            formatter: function(params) {
              let _formatter = attr_descr.properties[1].properties[4].value;
              if (_formatter == "name") {
                return params.data.name
              } else if (_formatter == "value") {
                return params.data.value[2]
              } else {
                return params.data.name + ':' + params.data.value[2]
              }
            },
            textStyle: { //标签字体
              color: attr_descr.properties[1].properties[0].value,
              backgroundColor: 'transparent',
              fontFamily: attr_descr.properties[1].properties[3].value,
              fontSize: attr_descr.properties[1].properties[1].value,
              fontWeight: attr_descr.properties[1].properties[2].value
            }
          },
          emphasis: { //柱体选中高亮样式设置
            itemStyle: { //柱体
              color: attr_descr.properties[2].properties[0].value,
              opacity: attr_descr.properties[2].properties[1].value
            },
            label: { //标签
              show: attr_descr.properties[3].editable == "1" ? true : false,
              distance: 0,
              formatter: function(params) {
                let _formatter = attr_descr.properties[3].properties[4].value;
                if (_formatter == "name") {
                  return params.data.name
                } else if (_formatter == "value") {
                  return params.data.value[2]
                } else {
                  return params.data.name + ':' + params.data.value[2]
                }
              },
              textStyle: { //标签字体
                color: attr_descr.properties[3].properties[0].value,
                backgroundColor: 'transparent',
                fontFamily: attr_descr.properties[3].properties[3].value,
                fontSize: attr_descr.properties[3].properties[1].value,
                fontWeight: attr_descr.properties[3].properties[2].value
              }
            }
          },
          barSize: attr_descr.properties[0].properties[3].value, //柱子粗细
          shading: 'lambert',
          animation: true,
          data: []
        }
      } else if (type == '气泡层') {
        series = {
          name: "气泡层", //3d散点层没有动画属性
          id: attr_id,
          type: "scatter3D",
          coordinateSystem: "geo3D",
          geo3DIndex: 0,
          zlevel: 0,
          symbol: attr_descr.properties[0].value, //散点得形状
          symbolSize: attr_descr.properties[1].value,
          itemStyle: { //散点样式
            color: attr_descr.properties[2].value,
            opacity: attr_descr.properties[3].value,
            borderWidth: 0,
          },
          label: { //标签样式
            show: false
          },
          emphasis: { //高亮设置
            itemStyle: { //散点样式
              color: attr_descr.properties[4].properties[0].value,
              opacity: 1,
              borderWidth: 0,
            },
            label: { //标签样式
              show: attr_descr.properties[4].editable == "1" ? true : false,
              distance: 0,
              position: 'top',
              fomatter: "{b}",
              textStyle: {
                color: attr_descr.properties[4].properties[1].value,
                fontSize: attr_descr.properties[4].properties[2].value,
                fontWeight: attr_descr.properties[4].properties[3].value,
                fontFamily: attr_descr.properties[4].properties[4].value,
                backgroundColor: 'transparent'
              },
              formatter: function(params) {
                let _formatter = attr_descr.properties[4].properties[5].value;
                if (_formatter == "name") {
                  return params.data.name
                } else if (_formatter == "value") {
                  return params.data.value[2]
                } else {
                  return params.data.name + ':' + params.data.value[2]
                }
              },
            }
          },
          animation: true,
          data: []
        }
      } else { //飞线层
        series = {
          name: "飞线层", //飞线层
          id: attr_id,
          type: "lines3D",
          coordinateSystem: "geo3D",
          geo3DIndex: 0,
          zlevel: 0,
          effect: { //尾迹特效
            show: true,
            trailColor: attr_descr.properties[0].value,
            trailWidth: attr_descr.properties[1].value, //尾迹宽度
            trailLength: attr_descr.properties[2].value, //尾迹长度0-1
            period: attr_descr.properties[3].value, //周期
            trailOpacity: attr_descr.properties[4].value,
          },
          lineStyle: { //线条样式
            color: attr_descr.properties[5].value,
            opacity: attr_descr.properties[6].value,
            width: attr_descr.properties[7].value
          },
          data: [] //注：若有柱状图，海拔坐标为柱状体图最小值，若没有随意0
        }
      }
      return series;
    }
    return options
  }
}
