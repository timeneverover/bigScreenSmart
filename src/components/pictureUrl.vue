<template>
	<div class="gui-field-component gui-field-image-component">
		<div>
			<div class="gui-label-file">
				<img :src="imageUrl+pictureData.value" class="definedImg" alt="">
				<input @change="inputImgChange($event)" type="file" mutiple="" accept="image/png, image/jpeg, image/gif, image/jpg" class="gui-input-file imgFile">
				<div class="gui-label-file-icon" v-if="pictureData.value!=''">
					<i class="components-font icon fa fa-trash" @click="delBgImg(pictureData.value)"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Urls from '../publicService/urls.js'
	import TipBoxService from '../publicService/TipBoxService.js'
	import httpService from '../publicService/HttpService.js'
	export default {
		name: 'pictureUrl',
		data() {
			return {}
		},
		props: ['chartID', 'pictureData'],
		methods: {
			//删除图片
			delBgImg(imageName) {
				let _this = this
				console.log(imageName)
				let str = imageName.substring(imageName.lastIndexOf("/") + 1, imageName.length);
				let data = {};
				data.filename = str
				console.log(data)
				httpService.postLink(Urls.userdefinedBackgroundImgRemove, data).then(function(res) {
					_this.pictureData.value = res;
					$('.imgFile').val('')
					TipBoxService.open('success', '删除图片成功');
				}).catch(function(error) {
					console.log(error);
					TipBoxService.open('fail', error);
				})
			},
			//更新图片
			inputImgChange(e) {
				let _this = this
				let file = e.target.files[0];
				/*let fileSize1=Math.floor(file.size/1024)
				if(fileSize1>3*1024){
					this.tips.open('error', '请选择3M以内的图片！');
					return false
				}*/
				e.preventDefault()
			/*	let reader=new FileReader()
				reader.readAsDataURL(file)
				reader.onload=function(event){
					let imgcode=event.target.result
					console.log(imgcode)*/
					let param = new FormData();
					param.append('file', file, file.name);
					param.append('attrid', _this.chartID);
//					param.append('fileBase', imgcode);
					httpService.uploadFile(Urls.userdefinedBackgroundImgUpload, param).then(function(res) {
						_this.pictureData.value = res;
						TipBoxService.open('success', '上传图片成功');
					}).catch(function(error) {
						console.log(error);
						TipBoxService.open('fail', error);
					})
//				}
			},
			transformImgToBase64(files){
				console.log(files)
				let fileSize1=Math.floor(files.size/1024)
				if(fileSize1>3*1024){
					this.tips.open('error', '请选择3M以内的图片！');
					return false
				}
				let imgcode=false
				let reader=new FileReader()
				reader.readAsDataURL(files)
				reader.onload=function(e){
					imgcode=e.target.result
				}
				 return imgcode
			}
		}
	}
</script>

<style>
</style>