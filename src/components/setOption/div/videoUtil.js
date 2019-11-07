export default {
  videoSet(sourceDiv, videoData, attrs, mapped) {
    let videoSource = $(sourceDiv).find('video');
    let pSource = $(sourceDiv).find('p');
    let videoUrl = "";
    //视频地址
    let data = videoData[0];
    if (mapped[0].value == "") {
      videoUrl = data[mapped[0].name];
    } else {
      videoUrl = data[mapped[0].value];
    }
    if (videoUrl == "" || videoUrl == undefined) {
      videoUrl = attrs[1].value;
    }
    videoSource.attr('src', videoUrl);
    //空视频文案
    if (attrs[1].value == '') {
      videoSource.hide();
      pSource.html(attrs[5].value).show();
    } else {
      videoSource.show();
      pSource.hide();
    }
    //自动播放
    if (attrs[2].fieldData[0].value) {
      videoSource.attr('autoplay', 'autoplay');
    } else {
      // videoSource.pause();
      videoSource.removeAttr('autoplay');
    }
    //循环播放
    if (attrs[3].fieldData[0].value) {
      videoSource.attr('loop', 'loop');
    } else {
      videoSource.removeAttr('loop');
    }
    //控制条
    if (attrs[4].fieldData[0].value) {
      videoSource.attr('controls', 'controls');
    } else {
      videoSource.removeAttr('controls');
    }
    //音量
    videoSource[0].volume = attrs[6].value / 100;
  }
}
