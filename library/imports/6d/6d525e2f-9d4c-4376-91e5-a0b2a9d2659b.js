"use strict";
cc._RF.push(module, '6d5254vnUxDdpHloLKp0mWb', 'loveText');
// Script/loveText.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        textBg: [cc.SpriteFrame],
        loveTextJson: cc.JsonAsset,
        mainText: cc.Label,
        numberLabel: cc.Label,
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
        this.fullText = this.loveTextJson.json.textData; // 得到全部的文本
        var randSeq = Math.floor(Math.random() * this.fullText.length);
        var randText = this.fullText[randSeq];
        this.mainText.string = randText;
        this.showHasPlayText(randSeq); // 用来显示语句数量标签
        cc.sys.localStorage.setItem("lastText", randText);
    },
    showHasPlayText: function showHasPlayText(randSeq) {
        var seqArray = JSON.parse(cc.sys.localStorage.getItem("saveArray"));
        var num = 0;
        if (seqArray == null) {
            seqArray = new Array(this.fullText.length);
        }
        seqArray[randSeq] = 1;

        for (var i = 0; i < seqArray.length; i++) {
            if (seqArray[i] == 1) {
                num++;
            }
        }
        this.numberLabel.string = num + '/' + this.fullText.length;
        cc.sys.localStorage.setItem("saveArray", JSON.stringify(seqArray));
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