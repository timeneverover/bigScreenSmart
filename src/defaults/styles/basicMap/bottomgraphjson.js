{
  "id": "bottomGraph",
  "name": "底图层",
  "version": "V1.0.0",
  "type": "isMapComponents",
  "properties": [{
    "name": "蒙版颜色",
    "editable": "singel",
    "type": "color",
    "value": "transparent"
  }, {
    "name": "透明度",
    "editable": "singel",
    "type": "range",
    "fieldData": [{
      "name": "透明度",
      "value": 2,
      "minValue": 0,
      "maxValue": 1,
      "step": 0.1
    }]
  }, {
    "name": "瓦片",
    "editable": "singel",
    "type": "select",
    "value": "GeoQ午夜蓝",
    "selecctData": ["GeoQ水墨灰", "GeoQ午夜蓝", "GeoQ彩色", "GeoQ边界(带标注)"]
  }, {
    "name": "滤镜",
    "hasChild": true,
    "editable": "2",
    "type": "hasChild",
    "fieldData": [{
      "name": "亮度",
      "type": "range",
      "value": 1,
      "minValue": 0,
      "maxValue": 10,
      "step": 0.05
    }, {
      "name": "对比度",
      "type": "range",
      "value": 1,
      "minValue": 0,
      "maxValue": 5,
      "step": 0.02
    }, {
      "name": "灰度",
      "type": "range",
      "value": 0,
      "minValue": 0,
      "maxValue": 1,
      "step": 0.01
    }, {
      "name": "色相",
      "type": "range",
      "value": 0,
      "minValue": 0,
      "maxValue": 360,
      "step": 1.08
    }, {
      "name": "反转",
      "type": "range",
      "value": 0,
      "minValue": 0,
      "maxValue": 1,
      "step": 0.01
    }, {
      "name": "饱和度",
      "type": "range",
      "value": 1,
      "minValue": 0,
      "maxValue": 10,
      "step": 0.03
    }, {
      "name": "墨度",
      "type": "range",
      "value": 0,
      "minValue": 0,
      "maxValue": 1,
      "step": 0.02
    }]
  }]

}