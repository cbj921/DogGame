"use strict";
cc._RF.push(module, '06df0gk8b9FyorJHTTLO0v5', 'textLabel');
// Script/textLabel.js

"use strict";

var DOGSTATE = cc.Enum({
    SLEEP: -1,
    STAND: -1,
    RUN: -1,
    EAT: -1
});

var touchStandText = ["开心!", "主人你要经常摸摸我哦", "主人你的手好软", "汪汪...", "主人你真好!", "爱你爱你爱你!", "好想每天都和你在一起呢", "主人是我哒，谁都不许抢!", "我...我叫...小狗几?", "大狗几是谁呢?", "主人你喜欢我吗?", "每天都要来看我哦", "要记得喂人家吃东西哦,要不然会饿饿", "每天喂我一次,就送主人一句情话"];
var touchSleepText = ["啊？主人!?", "主人你来啦!", "我好想你呀主人", "人家刚刚做梦梦到主人了,汪", "Wu~~刚刚睡醒~", "汪汪汪,吓死我啦"];
var touchEatText = [];

cc.Class({
    extends: cc.Component,

    properties: {
        textBg: cc.Node,
        textLabel: cc.Label,
        LoveText: cc.TextAsset
    },

    init: function init(gameCtl) {
        this.gameCtl = gameCtl;
        this.textBg.active = false;
    },
    playText: function playText(dogState) {
        this.textBg.active = true;
        if (dogState == DOGSTATE.SLEEP) {
            var length = touchSleepText.length;
            var randText = touchSleepText[Math.floor(Math.random() * length)];
            this.textLabel.string = randText;
        }
        if (dogState == DOGSTATE.STAND) {
            var _length = touchStandText.length;
            var _randText = touchStandText[Math.floor(Math.random() * _length)];
            this.textLabel.string = _randText;
        }
        if (dogState == DOGSTATE.EAT) {
            this.textLabel.string = "Emmm...真好吃...";
        }
    },
    labelActive: function labelActive(boolean) {
        this.textBg.active = boolean;
    },


    /*eventForActive(){
        // 对文本框进行监听，如果文本框为 active = true，则开启监听
        let nowTime = new Date();
        
    },*/

    onLoad: function onLoad() {}
}

// update (dt) {},
);

cc._RF.pop();