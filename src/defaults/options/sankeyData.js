export default{
    grid: {
      zlevel: 0,
    },
    textStyle: {
      fontFamily: "sans-serif"
    },
    series: [{
        type: "sankey",
        orient: 'horizontal',//vertical 桑基图横向纵向
        nodeWidth: 20,//每个矩形节点的宽度
        nodeGap: 10,//每个矩形节点间隔
        label: {//矩形节点文本标签的样式
            normal: {
                show: true,
                position: 'right',
                distance: 8,
                color: '#fff',
                fontSize: 12,
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            }
        },
        itemStyle: {//桑基图节点矩形样式
            normal: {
                color: '#00BAFF',
                borderColor: '#aaa',
                borderWidth: 1,
                borderType: 'solid',//dashed  dotted
            }
        },
        lineStyle: {//桑基图边样式
            normal: {
                color: 'source',//target 源节点，目标节点
                opacity: 0.1,
                curveness: 0.5//曲度
            }
        },
        layout:"none",
        focusNodeAdjacency: "allEdges",
        data: [{
            name: "防火墙日志分析",
            itemStyle: {
        	    color: '#fc853e'
        	}
        },{
            name: "163",
            itemStyle: {
        	    color: '#28cad8'
        	}
        }, {
            name: "164",
            itemStyle: {
        	    color: '#9564bf'
        	}
        }, {
            name: "165",
            itemStyle: {
        	    color: '#28cad8'
        	}
        }, {
            name: "b1",
            itemStyle: {
        	    color: '#00BAFF'
        	}
        }, {
            name: "b2",
            itemStyle: {
        	    color: '#fc853e'
        	}
        }, {
            name: "金融市场测试1",
            itemStyle: {
        	    color: '#9564bf'
        	}
        }, {
            name: "金融市场测试2",
            itemStyle: {
        	    color: '#00BAFF'
        	}
        }, {
            name: "金融市场测试3",
            itemStyle: {
        	    color: '#bd407e'
        	}
        }],
        links: [{
            source: "防火墙日志分析",
            target: "163",
            value: 10
        }, {
            source: "防火墙日志分析",
            target: "164",
            value: 5
        }, {
            source: "防火墙日志分析",
            target: "165",
            value: 5
        }, {
            source: "163",
            target: "金融市场测试1",
            value: 5
        }, {
            source: "163",
            target: "金融市场测试2",
            value: 3
        }, {
            source: "163",
            target: "b1",
            value: 3
        }, {
            source: "164",
            target: "b1",
            value:5
        }, {
            source: "164",
            target: "b2",
            value:5
        }, {
            source: "165",
            target: "b1",
            value: 3
        }, {
            source: "165",
            target: "b2",
            value: 3
        }, {
            source: "b1",
            target: "金融市场测试1",
            value: 1
        }, {
            source: "b1",
            target: "金融市场测试3",
            value: 2
        }, {
            source: "b2",
            target: "金融市场测试2",
            value: 2
        }, {
            source: "b2",
            target: "金融市场测试3",
            value: 3
        }]
    }]
}
