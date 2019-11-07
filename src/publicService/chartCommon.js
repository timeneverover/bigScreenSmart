import commonUtil from '@/publicService/commonUtls.js'
export default {
  // 获取映射后的数据
  getMappedData(arr, mapped, type) {
    let arrData = [].concat(arr)
    let len2 = mapped.length
    let arr1 = [],
      arr2 = [],
      arr3 = [],
      arr44 = []
    let boo = '',
      mapx = ''
    let h = len2 - 1
    for (h; h >= 0; h--) {
      if (mapped[h].name == 'x') {
        mapx = mapped[h].value
        if (mapx == '') {
          mapx = 'x'
        }
      } else if (mapped[h].name == 's'||mapped[h].name == 'type') {
        boo = mapped[h].value
        if (boo == '') {
          boo = mapped[h].name
        }
      }
    }
    if (type == '时间型') { // 将x轴数据按照时间先后顺序排列
      arrData.sort(function(data1, data2) {
        let x1 = commonUtil.DateToUnix(data1[mapx])
        let y1 = commonUtil.DateToUnix(data2[mapx])
        return x1 >= y1 ? 1 : -1;
      })
    } else if (type == '数值型') { // 将x轴数据按照从小到大顺序排列
      arrData.sort(function(data1, data2) {
        let x1 = data1[mapx]
        let y1 = data2[mapx]
        return x1 >= y1 ? 1 : -1;
      })
    }
    arr3 = this.getSimleType(arrData, boo)
    let len = arr3.length
    let data1 = mapped[0].value
    let data2 = ''
    let data3 = ''
    if (data1 == "") {
      data1 = mapped[0].name
    }
    if (len2 >= 2) { // r值
      data2 = mapped[1].value
      if (data2 == "") {
        data2 = mapped[1].name
      }
    }
    if (len2 >= 3) { // r值
      data3 = mapped[2].value
      if (data3 == "") {
        data3 = mapped[2].name
      }
    }
    let sdata = [],
      rdata = []
    let sids = [] // s数值数组
    for (let i = 0; i < len; i++) { // 二维数组
      let len3 = arr3[i].length
      let arr4 = [],
        arr5 = [],
        arr6 = []
      var sValue = ''
      for (let j = 0; j < len3; j++) {
        let item = [] //
        let xitem = {} // series 中data值
        if (arr3[i][j].hasOwnProperty(data1)) {
          let flag = this.getIsExisted(arr2, arr3[i][j][data1])
          if (!flag) {
            item.push(arr3[i][j][data1])
            arr2.push(arr3[i][j][data1])

          } else { // 已存在
            item.push(flag)
          }
          xitem.name = arr3[i][j][data1]
        }
        if (arr3[i][j].hasOwnProperty(data2)) {
          arr5.push(arr3[i][j][data2])
          item.push(arr3[i][j][data2])
        }
        if (data3 != '' && arr3[i][j].hasOwnProperty(data3)) {
          item.push(arr3[i][j][data3])
          rdata.push(arr3[i][j][data3])
        }
        if (boo != '' && sValue == '' && arr3[i][j].hasOwnProperty(boo)) {
          sValue = arr3[i][j][boo]
        }
        arr6.push(item)
      }
      sdata.push(arr6)
      arr1.push(arr5)
      sids.push(sValue)
      arr44.push(rdata)
    }
    let item = {}
    if (type == '时间型') {
      arr2.sort(function(data1, data2) {
        let x1 = commonUtil.DateToUnix(data1)
        let y1 = commonUtil.DateToUnix(data2)
        return x1 >= y1 ? 1 : -1;
      })
    } else if (type == '数值型') {
      arr2.sort(commonUtil.compareValue)
    }
    item.xdata = arr2
    item.ydata = arr1
    item.sdata = sdata
    item.stypes = sids
    item.rData = arr3
    item.zdata = arr44
    return item
  },
  //判断数组是否存在某值
  getIsExisted(arr, data) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
      if (arr[i] == data)
        return arr[i]
    }
    return false
  },
  //数组分类
  getSimleType(list, type) {
    var flag = 0,
      data = [];
    var len = list.length;
    for (var i = 0; i < len; i++) {
      var az = '';
      for (var j = 0; j < data.length; j++) {
        if (data[j][0][type] == list[i][type]) {
          flag = 1;
          az = j;
          break;
        }
      }
      if (flag == 1) {
        data[az].push(list[i]);
        flag = 0;
      } else if (flag == 0) {
        var wdy = [];
        wdy.push(list[i]);
        data.push(wdy);
      }
    }
    return data;
  },

  getLabel(geshi, dataType, value, xtype) { // 显示格式
    if (geshi == '11(整数)') {
      return parseInt(value)
    } else if (geshi == '11.1(浮点数)') {
      return parseFloat(value).toFixed(1)
    } else if (geshi == '11.11(浮点数)') {
      return parseFloat(value).toFixed(2)
    } else {
      if (xtype == '数值型') {
        return 0
      } else {
        let data = this.setDataByType(value, dataType)
        if (geshi == '2016年') {
          return data[0] + '年'
        } else if (geshi == '2016(年份)') {
          return data[0]
        } else if (geshi == '01月01日') {
          return data[1] + '月' + data[2] + '日'
        } else if (geshi == '01/01(月/日)') {
          return data[1] + '/' + data[2]
        } else if (geshi == '02:30:00') {
          return data[3] + ':' + data[4] + ':' + data[5]
        } else if (geshi == '02:30(时:分)') {
          return data[3] + ':' + data[4]
        } else if (geshi == '1月') {
          return data[1] + '月'
        } else if (geshi == '2日') {
          return data[2] + '日'
        } else if (geshi == '02h') {
          return data[3] + 'h'
        } else if (geshi == '02(时)') {
          return data[3]
        } else if (geshi == '01-01') {
          return data[1] + '-' + data[2]
        } else if (geshi == '01.01') {
          return data[1] + '.' + data[2]
        }
      }
    }
  },
  setDataByType(value, tt) {
    let arr = []
    if (tt == '2016') {
      arr = commonUtil.DateToArr(value, 'year')
    } else if (tt == '02') {
      arr = commonUtil.DateToArr(value, 'hour')
    } else if (tt == '01/01' || tt == '01-01' || tt == '01.01') {
      arr = commonUtil.DateToArr(value, 'month')
    } else {
      arr = commonUtil.DateToArr(value, 'normal')
    }
    return arr
  },
  setDataType(value, data) {
    //时间型，先判断数据格式是否一样，若一样
    let len1 = '',
      len2 = ''
    let flag = true
    if (value.indexOf(' ') > -1) {
      len1 = value.split(' ').length
      len2 = data.split(' ').length
    } else {
      len1 = 0
      len2 = 0
    }
    if (len1 == len2) {
      let len3 = '',
        len4 = '',
        len5 = '',
        len6 = ''

      if (value.indexOf('/') > -1) { // 含有年月日
        len3 = value.split('/').length
        len4 = data.split('/').length
      } else if (value.indexOf('.') > -1) {
        len3 = value.split('.').length
        len4 = data.split('.').length
      } else if (value.indexOf('-') > -1) {
        len3 = value.split('-').length
        len4 = data.split('-').length
      }
      if (value.indexOf(':') > -1) {
        len5 = value.split(':').length
        len6 = data.split(':').length
      }
      //					console.log('len3:' + len3 + ' len4:' + len4 + ' len5:' + len5 + ' len6:' + len6)
      if (len3 != len4 || len5 != len6) {
        return false
      } else {
        return true
      }
    } else { // 格式不等
      return false
    }

  },
  // 根据系列id，将s数组与data数组排序
  setDataSort(ids, sArr, dataArr) {
    let len1 = ids.length
    let len2 = sArr.length
    let len3 = dataArr.length
    let arr1 = [],
      arr2 = []
    for (let i = 0; i < len1; i++) {
      if (i >= len2) {
        break
      } else {
        let id = ids[i].sid // 数据系列的id
        if (id != null) { // 将系列样式有id的个数，对data和s进行排序。
          let flag = false
          let index = i
          for (let j = i; j < len2; j++) { //判断s数组中是否存在系列中的id
            if (id == sArr[j]) {
              flag = true
              index = j
              break
            }
          }
          if (flag) { // 存在
            let data1 = sArr[i]
            let data2 = dataArr[i]
            sArr[i] = sArr[index]
            dataArr[i] = dataArr[index]
            sArr[index] = data1
            dataArr[index] = data2
          } else { //不存在,添加空数组
            sArr[i] = ''
            dataArr[i] = []
          }
        }

      }
    }
    let item = {}
    item.sarr = sArr
    item.dataArr = dataArr
    return item
  },
  //设置区域渐变色
  setAreaColor(num, c1, c2) {
    let lin1 = 0,
      lin2 = 0,
      lin3 = 0,
      lin4 = 0
    let off = ''
    if (num < 90) {
      lin3 = 1
      off = num / 90
    } else if (num < 180) {
      lin1 = 1
      off = num / 180
    } else if (num < 270) {
      lin2 = 1
      off = num / 270
    } else {
      lin4 = 1
      off = num / 360
    }
    let lincolor = new echarts.graphic.LinearGradient(lin1, lin2, lin3, lin4, [{
      offset: 0,
      color: c1
    }, {
      offset: off,
      color: c2
    }], false)
    return lincolor
  }

}
