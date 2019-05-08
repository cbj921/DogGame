"use strict";
cc._RF.push(module, '11fdazwbz9NV4ocqIH10YxN', 'food');
// Script/food.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        textLabel: cc.Label,
        hungryLabel: cc.Label,
        textLabelScript: require("textLabel"),
        loveText: require("loveText")
    },

    init: function init() {
        this.getHungryLevel();
        this.calcHungryLevel();
        if (this.hungryLabel.string == 0) {
            this.node.active = false;
        } else {
            this.node.active = true;
        }
    },
    feedFood: function feedFood() {
        if (this.hungryLabel.string == 0) {
            this.node.active = true;
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "主人真好！好香哦！";
            this.hungryLabel.string = 100;
            //
            // TODO:调用情话文本框输出
            this.loveText.popWindow();
            //
            var firstTime = new Date().getTime(); // 创建一个时间戳
            cc.sys.localStorage.setItem("feedFirstTime", firstTime); // 存储的为时间戳
            //cc.sys.localStorage.setItem("hungryLevel",this.hungryLabel.string);
        } else {
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "人家碗里的还没吃完哦.";
        }
    },
    calcHungryLevel: function calcHungryLevel() {
        // 计算饱食度
        var lastFeedTime = cc.sys.localStorage.getItem("feedFirstTime"); // 这里的lastFeedTime 为 时间戳
        if (lastFeedTime == null) {
            this.hungryLabel.string = 0;
            //cc.log("没有获取到时间");
        };
        //this.getHungryLevel();

        var nowTime = Date.now();
        var hungryNumber = Math.floor((nowTime - lastFeedTime) / 1000 / 3600 * 40);
        this.hungryLabel.string = 100 - hungryNumber;
        if (this.hungryLabel.string < 0) {
            this.hungryLabel.string = 0;
        }

        //cc.log(lastFeedTime);
    },
    getHungryLevel: function getHungryLevel() {
        var hungry = cc.sys.localStorage.getItem("hungryLevel");
        if (hungry == null) {
            this.hungryLabel.string = 0;
        } else {
            this.hungryLabel.string = hungry;
        }
    },
    onLoad: function onLoad() {},
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();