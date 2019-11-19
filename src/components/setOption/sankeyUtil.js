import option from '@/defaults/options/sankeyData.js'
export default {
  setOption(attrs, datas) {
    let options = option;
    // console.log(datas);
    //布局方向
    options.series[0].orient = attrs[1].value;;
    //文本标签样式
    if(attrs[2].editable=='1'){
        options.series[0].label.normal.show = true;
        options.series[0].label.normal.fontFamily = attrs[2].properties[0].value;
        options.series[0].label.normal.fontSize = attrs[2].properties[1].value;
        options.series[0].label.normal.color = attrs[2].properties[2].value;
        options.series[0].label.normal.fontWeight = attrs[2].properties[3].value;
        options.series[0].label.normal.position = attrs[2].properties[4].value;
        options.series[0].label.normal.distance = attrs[2].properties[5].value;
    }else{
        options.series[0].label.normal.show = false;
    }
    //节点矩形样式
    options.series[0].itemStyle.normal.color = attrs[3].properties[0].value;
    options.series[0].itemStyle.normal.borderColor = attrs[3].properties[1].value;
    options.series[0].itemStyle.normal.borderWidth = attrs[3].properties[2].value;
    options.series[0].itemStyle.normal.borderType = attrs[3].properties[3].value;
    //桑基图边样式
    options.series[0].lineStyle.normal.color = attrs[4].properties[0].value;
    options.series[0].lineStyle.normal.curveness = attrs[4].properties[1].value;
    options.series[0].lineStyle.normal.opacity = attrs[4].properties[2].value;
    //数据系列
    let data = [];
    let dataList = attrs[5].properties;
    for(let i=0;i<dataList.length;i++){
        let dataObj = {
            name: dataList[i].fieldData[0].value,
            itemStyle: {
                color: dataList[i].fieldData[1].value
            }
        }
        data.push(dataObj);
    }
    options.series[0].data = data;
    //数据
    let linksList = datas.sdata[0];
    let links = [];
    for(let j=0;j<linksList.length;j++){
        let linkObj = {
            source: linksList[j][0],
            target: linksList[j][1],
            value: linksList[j][2]
        }
        links.push(linkObj);
    }
    options.series[0].links = links;

    return options;
  }
}
