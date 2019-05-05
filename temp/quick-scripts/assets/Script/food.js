(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/food.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '11fdazwbz9NV4ocqIH10YxN', 'food', __filename);
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
            var firstTime = new Date();
            cc.sys.localStorage.setItem("feedFirstTime", firstTime);
            cc.sys.localStorage.setItem("hungryLevel", this.hungryLabel.string);
        } else {
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "人家碗里的还没吃完哦.";
        }
    },
    calcHungryLevel: function calcHungryLevel() {
        // 计算饱食度
        var lastFeedTime = new Date(cc.sys.localStorage.getItem("feedFirstTime")); // 这里的lastFeedTime 为 string 类型,要转换成object 类型
        if (lastFeedTime == null) {
            this.hungryLabel.string = 0;
            //cc.log("没有获取到时间");
        };
        this.getHungryLevel();

        var nowTime = new Date();
        var hungryNumber = Math.floor((nowTime - lastFeedTime) / 1000 / 3600 * 20);
        this.hungryLabel.string -= hungryNumber;
        if (this.hungryLabel.string < 0) {
            this.hungryLabel.string = 0;
        }
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
        //# sourceMappingURL=food.js.map
        