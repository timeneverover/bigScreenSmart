<template lang="html">
    <div id="app">
        <div class="create-screen">
            <div class="top-bar">
                <div class="skew-decorator"></div>
                <div class="cancel-btn" @click="cancelCreate">
                    <span>取消创建</span>
                </div>
            </div>
            <div class="creator-wp">
                <div class="template-list">
                    <div class="template-selector">
                        <a class="template-selector-item" :class="index==currentIndex?'selected':''" v-for="(temp,index) in templateData" @click="chooseTemp(temp,index)">
                            <div class="template-content-wp">
                                <div class="template-thumbnail-wp">
                                    <img class="template-thumbnail" v-bind:src="temp.leftImgUrl" alt="template-thumbnail">
                                </div>
                            </div>
                            <div class="template-desc">
                                <div class="desc-name ellipsis-2">
                                    <div class="name-text">{{temp.leftTitle}}</div>
                                    <i class="right-arrow"></i>
                                </div>
                                <div class="desc-scale desc-info">
                                    <p v-for="leftContent in temp.leftContent">{{leftContent}}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="template-preview">
                    <div class="preview-title">选择模板</div>
                    <div class="preview-content">
                        <div class="preview-wrapper" :style="{width:rightWrapWidth +'%'}">
                            <div class="preview-img-wp">
                                <img class="preview-img" :src="rightImageUrl" alt="模板预览图">
                                <div class="preview-img-mask" >
                                    <button class="btn-md btn-normal create-btn" type="button" @click="createBtnClick">
                                        <span>创建</span>
                                    </button>
                                </div>
                            </div>
                            <div class="preview-info">
                                <div class="preview-desc">
                                    <p>{{rightContent}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import httpService from '../publicService/HttpService.js'
import Urls from '../publicService/urls.js'
export default {
    data() {
        return {
            currentIndex: 0,
            rightWrapWidth: 68,
            rightImageUrl: require('../assets/chooseTemplate/emptyTemplate.png'),
            rightContent: '在空白的画布上尽情施展您的创意吧！',
            templateData: [
                {
                    selected: '',
                    leftImgUrl: require('../assets/chooseTemplate/emptyTemplate.png'),
                    leftTitle: '空白',
                    leftContent: ['尺寸自定'],
                    rightImgUrl: require('../assets/chooseTemplate/emptyTemplate.png'),
                    rightContent: '在空白的画布上尽情施展您的创意吧！',
                    rightShow: false,
                    rightImgWidth: 200,
                }
            ]
        }
    },
    mounted() {
        let _this = this;
        //获取已存在模板列表
        httpService.getLink(Urls.getDefaultModuleList)
          .then(function(res) {
              for(let i=0;i<res.length;i++){
                  let tempObj = {
                      selected: '',
                      leftImgUrl: _this.imageUrl + res[i].screen_url,
                      leftTitle: res[i].mo_name,
                      leftContent: ['比例16:9','1920x1080px'],
                      rightImgUrl: _this.imageUrl + res[i].screen_url,
                      rightContent: res[i].mo_descr,
                      rightShow: false,
                      rightImgWidth: 2188,
                      moId: res[i].mo_id
                  }
                  _this.templateData.push(tempObj);
              }
          })
          .catch(function(error) {
              console.log(error);
          });
    },

    methods: {
        chooseTemp(temp,index){
            this.currentIndex = index;
            if(temp.rightImgWidth<1900){
                this.rightWrapWidth = 68;
            }else{
                this.rightWrapWidth = 86;
            }
            this.rightImageUrl = temp.rightImgUrl;
            this.rightContent = temp.rightContent;
        },
        createBtnClick(){
            let moId = '';
            if(this.currentIndex>0){
                moId = this.templateData[this.currentIndex].moId;
            }
            this.$store.dispatch('savePopShow',true);
            this.$store.dispatch('savePopObj',{
                popName: 'create',
                popData: {groupId:this.$route.query.groupId,tempImage:this.rightImageUrl,
                          tempIndex:this.currentIndex,tempId:moId},
                popTitle: '创建大屏数据',
                contentTitle: '数据大屏名称',
                contentInput: '请输入大屏名称',
                button: ['创建'],
            });
        },
        cancelCreate(){
            this.$router.push('/');
        }
    }
}
</script>

<style lang="css">
    @import '../css/chooseTemplate.css';
</style>
