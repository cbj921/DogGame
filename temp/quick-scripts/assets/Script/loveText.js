(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/loveText.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d5254vnUxDdpHloLKp0mWb', 'loveText', __filename);
// Script/loveText.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        textBg: [cc.SpriteFrame],
        loveTextJson: cc.JsonAsset,
        mainText: cc.Label,
        winEffect: {
            type: cc.AudioClip,
            default: null
        },
        clickEffect: {
            type: cc.AudioClip,
            default: null
        }
    },

    popWindow: function popWindow() {
        // 用来弹出文本框
        this.node.position = cc.v2(0, 20); // 这里是相对父节点的坐标系
        this.node.getComponent(cc.Sprite).spriteFrame = this.randLetter();
        this.playLoveText();
        this.playWinEffect();
    },
    randLetter: function randLetter() {
        // 随机选择信纸
        var randNumber = Math.floor(Math.random() * this.textBg.length);
        return this.textBg[randNumber];
    },
    playLoveText: function playLoveText() {
        //
        //TODD: 输出情话
        //两个数组，一个用来存放还没出现过的文字下标，一个用来存放已经出现过的文字下标,然后将其存入缓存就行了
        //
        this.fullText = this.loveTextJson.json.textData; // 得到全部的文本
        var randText = this.fullText[Math.floor(Math.random() * this.fullText.length)];
        this.mainText.string = randText;
        cc.sys.localStorage.setItem("lastText", randText);
    },


    /*getText(){
        let textData = JSON.parse(cc.sys.localStorage.getItem("loveText")); 
        if( textData == null){
            cc.sys.localStorage.setItem("loveText",JSON.stringify(this.loveTextJson));
        }
          return textData.json;
      },*/

    textAppear: function textAppear() {
        var lastText = cc.sys.localStorage.getItem("lastText");
        if (lastText == null) {
            lastText = "还没有解锁过情话哦。";
        }
        this.mainText.string = lastText;
        this.node.position = cc.v2(0, 20);
    },
    TextClose: function TextClose() {
        // 这个函数实现“假”关闭文本框，因为只是将文本框移出可见范围
        this.node.position = cc.v2(1500, 0);
    },
    playWinEffect: function playWinEffect() {
        cc.audioEngine.playEffect(this.winEffect);
    },
    playClickEffect: function playClickEffect() {
        cc.audioEngine.playEffect(this.clickEffect);
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=loveText.js.map
        