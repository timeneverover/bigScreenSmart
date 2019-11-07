<template>
  <div class="drop-comment" :tabindex='1' >
    <div class="drop-header" @click="showSelect=!showSelect" >
      <input class="select-value" :style="config" type="text" v-model="selectDatas" :title="config.seleted" readonly="readonly" />
      <i class="fa" :style="config2.imgconfig"  :class="showSelect===false?'fa-chevron-down':'fa-chevron-up'"></i>
    </div>
    <div class="drop-main content-scroll" :style="config2.dropconfig" v-show="showSelect" >
      <div v-show="search" class="search-item">
        <input class="search-input" type="text" placeholder="请输入搜索词" v-model="searchKey" />
      </div>
      <div class="master-item" :style="{height:config.height,lineHeight:config.height,fontSize:config.fontSize,color:config.color}" v-for="(data, index) in optionList" @click="selectValue(data, index)">{{data.name}}
        <i class="fa" :class="data.selected=== true ?'fa-circle':''"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selections',
  model: { // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
    prop: 'selectDatas',
    event: 'cc'
  },
  props: {
    dataList: Array,
    config: {},
    config2:{},
    selectDatas: ''
  },
  computed: {
    optionList () {
    	console.log(this.dataList)
    	let arr = []
    	let selList =''
    	if(this.dataList.length==0){
    		return arr
    	}
      let datas = this.dataList.filter(data => data.indexOf(this.searchKey) !== -1)
      let len = datas.length
      if (this.isMutil){
        selList = this.selectDatas
      }else{
        selList = this.selectDatas.split(',')
      }
      let len2 = selList.length
      for (let i = 0; i < len; i++) {
        let isSelected = false
        let item = {}
        item.name = datas[i]
        for (let j = 0; j < len2; j++) {
          if (datas[i] === selList[j]) {
            isSelected = true
            break
          }
        }
        item.selected = isSelected
        arr.push(item)
      }
      return arr
    }
  },
  data () {
    return {
      showSelect: false,
      searchKey: '',
       isMutil: false,
    search: false,
    maxNum: ''
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) this.showSelect = false
    })
  },
  methods: {
    selectValue (item, index) {
      if (this.isMutil) { // 多选
        if (item.selected) { // 取消选中
          this.optionList[index].selected = false
        } else { // 选中
          if (this.maxNum !== '') {
            // let arr1 = this.selectDatas.split(',')
            let arr1 = this.selectDatas
            if (arr1.length >= this.maxNum) {
              this.showSelect = false
            } else {
              this.optionList[index].selected = true
            }
          } else {
            this.optionList[index].selected = true
          }
        }
      } else { // 单选
        this.showSelect = false
        if (!item.selected) {
          let len3 = this.optionList.length
          for (let j = 0;j < len3; j++) {
            if (this.optionList[j].name === this.selectDatas) {
              this.optionList[j].selected = false
              break
            }
          }
          this.optionList[index].selected = true
        }
      }
      let selects = []
      let len = this.optionList.length
      for (let i = 0; i < len; i++){
        if (this.optionList[i].selected) {
          selects.push(this.optionList[i].name)
        }
      }
      console.log('seleeee:' + JSON.stringify(selects))

      if (this.isMutil){
        this.$emit('cc', selects)
      }else{
        this.$emit('cc', selects.toString())
      }
      //this.$emit('cc', selects.toString())
      this.$emit('change')
    },
    hideDrop () {
      console.log('blur click')
      this.showSelect = false
    }
  }
}
</script>

<style scoped>
  .drop-comment{
    display: flex;
    position: relative;
    white-space: nowrap;
    /*flex-wrap: wrap;*/
    z-index: 9;
    color: #000;
    cursor: pointer;
    width:90%;
    height: 90%;
  }
  .drop-comment .drop-header{
    display:flex;
    align-items: center;
    color: currentColor;
    position: relative;
    width:100%;
     height: 100%;
    z-index:9;
  }
  .drop-comment .drop-header .select-value{
    background:#0c3e57;
    width:100%;
     height: 100%;
     /*height: 30px;*/
    color:#ffffff;
    border:1px solid #4271B0;
    border-radius:5px;
    /*height:25px;*/
    padding-left:10px;
    /*padding-right:5px;*/
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor:pointer;
    font-size:13px;
  }
  .drop-comment .drop-header i{
    margin-left:-20px;
    color:#000;
    font-size:13px;
  }
  .drop-comment .drop-main {
    display: flex;
    z-index: 24;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    width:100%;
    height: auto;
    max-height: 200px;
    background: #fff;
    top: 100%;
    left: -0.1px;
    overflow: auto;
    list-style: none;
    box-sizing: border-box;
    border-left: 1px solid #4271B0;
    border-right: 1px solid #4271B0;
    border-bottom: 1px solid #4271B0;
    padding-left: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .drop-comment .drop-main .master-item{
   /* height: 28px;
    line-height: 28px;*/
    box-sizing: border-box;
    width: 100%;
    padding-left:10px;
    padding-right:5px;
    font-size:13px;
    display:flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
  }
  .drop-comment .drop-main .master-item:hover{
    /*background:#F4F4F4;*/
   opacity: 0.5;
  }
  .drop-comment .drop-main .search-item {
    height: 20px;
    line-height: 20px;
    width: 92%;
    margin:5px 0px;
  }
  .drop-comment .drop-main .search-input{
    height:20px;
    width:100%;
    line-height:20px;
    border-radius:5px;
    background:transparent;
    border:1px solid #4271B0;
    padding-left:10px;
    font-size:12px;
  }

  .drop-comment .drop-main .master-item .fa-circle{
    font-size:10px;
    color:#4271B0;
  }
  .content-scroll {
    -ms-scroll-chaining: chained;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
    scrollbar-arrow-color: transparent; /*三角箭头的颜色*/
    scrollbar-face-color: #333; /*立体滚动条的颜色*/
    scrollbar-3dlight-color: #666; /*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: #666; /*滚动条空白部分的颜色*/
    scrollbar-shadow-color: #999; /*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: #666; /*立体滚动条强阴影的颜色*/
    scrollbar-track-color: #666; /*立体滚动条背景颜色*/
    scrollbar-base-color:#f8f8f8; /*滚动条的基本颜色*/
  }
  .content-scroll::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  }
  .content-scroll::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    background: rgba(67,75,85);
  }
  .content-scroll::-webkit-scrollbar-track {/*滚动条里面轨道*/
    border-radius: 0;
    background: rgba(28,34,43);
  }
</style>
