export default {
  //边框切换方法
  borderSwitch(sourceVal, sourceDiv) {
    switch (sourceVal) {
      case "框1":
        sourceDiv.css({
          "border-width": "71px 23px",
          "border-image-source": "url('" + require('@/assets/border/border1.png') + "')",
          "border-image-slice": "71 23"
        });
        break;
      case "框2":
        sourceDiv.css({
          "border-width": "32px 37px",
          "border-image-source": "url('" + require('@/assets/border/border2.png') + "')",
          "border-image-slice": "32 37 fill"
        });
        break;
      case "框3":
        sourceDiv.css({
          "border-width": "14px",
          "border-image-source": "url('" + require('@/assets/border/border3.png') + "')",
          "border-image-slice": "14 fill"
        });
        break;
      case "框4":
        sourceDiv.css({
          "border-width": "14px 100px",
          "border-image-source": "url('" + require('@/assets/border/border4.png') + "')",
          "border-image-slice": "14 100"
        });
        break;
      case "框5":
        sourceDiv.css({
          "border-width": "46px 305px 117px 33px",
          "border-image-source": "url('" + require('@/assets/border/border5.png') + "')",
          "border-image-slice": "46 305 117 33 fill"
        });
        break;
      case "框6":
        sourceDiv.css({
          "border-width": "45px 103px 51px 29px",
          "border-image-source": "url('" + require('@/assets/border/border6.png') + "')",
          "border-image-slice": "45 103 51 29 fill"
        });
        break;
      case "框7":
        sourceDiv.css({
          "border-width": "29px 107px 109px 16px",
          "border-image-source": "url('" + require('@/assets/border/border7.png') + "')",
          "border-image-slice": "29 107 109 16 fill"
        });
        break;
      case "框8":
        sourceDiv.css({
          "border-width": "15px 11px 16px 8px",
          "border-image-source": "url('" + require('@/assets/border/border8.png') + "')",
          "border-image-slice": "15 11 16 8 fill"
        });
        break;
      case "框9":
        sourceDiv.css({
          "border-width": "152px 27px 127px 354px",
          "border-image-source": "url('" + require('@/assets/border/border9.png') + "')",
          "border-image-slice": "152 27 127 354 fill"
        });
        break;
      case "框10":
        sourceDiv.css({
          "border-width": "56px 4px 76px 393px",
          "border-image-source": "url('" + require('@/assets/border/border10.png') + "')",
          "border-image-slice": "56 4 76 393 fill"
        });
        break;
      case "框11":
        sourceDiv.css({
          "border-width": "17px 24px 18px 19px",
          "border-image-source": "url('" + require('@/assets/border/border11.png') + "')",
          "border-image-slice": "17 24 18 19 fill"
        });
        break;
    }
  },
  //装饰切换方法
  decorateSwitch(sourceVal, sourceDiv, positions) {
    let num = sourceVal.slice(3) - 1;
    let imgName=''
    if(sourceVal.indexOf('png')!=-1){
    	imgName=sourceVal+'.png'
    }else{
    	imgName=sourceVal+'.gif'
    }
    sourceDiv.css({
      "background-image": "url('" + require('@/assets/decorate/' + imgName) + "')",
//    "background-position": positions[num],
      "background-size":'100% 100%'

    });
  }

}
