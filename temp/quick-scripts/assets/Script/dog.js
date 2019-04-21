(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/dog.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '62f467lk8JBkJ9Or01kLIrv', 'dog', __filename);
// Script/dog.js

"use strict";

var DOGSTATE = cc.Enum({
    SLEEP: -1,
    STAND: -1,
    RUN: -1,
    EAT: -1
});

cc.Class({
    extends: cc.Component,

    properties: {
        dog: cc.Sprite,
        dogAnimation: cc.Animation,
        dogSleepPicture: cc.SpriteFrame,
        dogShakePicture: cc.SpriteFrame,
        randStateNum: 0, // 该值只能在0-1之间,用来在 touchInStand() 中决定触摸后状态
        duration: 0,
        textLabel: require("textLabel")
    },

    init: function init(gameCtl) {
        this.gameCtl = gameCtl;
        this.setDogSleep();
        this.node.on(cc.Node.EventType.TOUCH_START, this.dogTouchFunc, this);
    },
    setDogSleep: function setDogSleep() {
        this.dog.spriteFrame = this.dogSleepPicture;
        this.dogState = DOGSTATE.SLEEP;
    },


    // 处理触摸狗的事件
    dogTouchFunc: function dogTouchFunc() {
        this.nowTime = new Date(); // 用来记录触摸时的时间
        this.textLabel.playText(this.dogState);
        this.labelFlag = 1; // 1 表示文本框的 active == true

        if (this.dogState == DOGSTATE.SLEEP) {
            this.touchInSleep();
        } else if (this.dogState == DOGSTATE.STAND) {
            this.touchInStand();
        } else if (this.dogState == DOGSTATE.RUN) {
            this.touchInRun();
        } else if (this.dogState == DOGSTATE.EAT) {
            this.touchInEat();
        }
    },
    touchInSleep: function touchInSleep() {
        var _this = this;

        this.dogState = DOGSTATE.STAND;
        this.dog.spriteFrame = this.dogShakePicture;
        this.dogAnimation.scheduleOnce(function () {
            _this.dogAnimation.play("stand");
        }, 0.5);
    },
    touchInStand: function touchInStand() {
        var randNum = 0;
        randNum = Math.random(); // 利用随机数来决定 stand 状态下被触摸后干嘛
        // 有两种情况，一种是触摸后乱跑，一种是触摸后显示文字
        if (randNum > this.randStateNum) {
            // 乱跑情况
            this.happyRun();
        } else {
            //this.textLabel.playText(this.dogState);
        }
    },
    touchInRun: function touchInRun() {
        // 不要跑动时点击动画
        cc.log("run");
    },
    touchInEat: function touchInEat() {},
    happyRun: function happyRun() {
        var _this2 = this;

        // 这里的代码可以用，但是很奇怪，需要优化 
        this.dogState = DOGSTATE.RUN;
        var runDistance = Math.random() + 0.2;
        var runLeft = cc.moveBy(this.duration, cc.v2(-runDistance * 300, 0));
        var runRight = cc.moveBy(this.duration, cc.v2(runDistance * 300, 0));
        if (Math.random() > 0.5) {
            this.dogAnimation.play("runLeft");
            this.node.runAction(runLeft);
            this.dogAnimation.scheduleOnce(function () {
                _this2.dogAnimation.play("runRight");
                _this2.node.runAction(runRight);
            }, this.duration);
        } else {
            this.dogAnimation.play("runRight");
            this.node.runAction(runRight);
            this.dogAnimation.scheduleOnce(function () {
                _this2.dogAnimation.play("runLeft");
                _this2.node.runAction(runLeft);
            }, this.duration);
        }
        this.dogAnimation.scheduleOnce(function () {
            _this2.dogAnimation.play("stand");
            _this2.dogState = DOGSTATE.STAND;
        }, 2 * this.duration + 0.1); // 需要等待两个 duration 才能执行
    },
    onLoad: function onLoad() {
        //cc.log(this.dogAnimation);
        //this.dogAnimation.play("runRight");

    },
    update: function update(dt) {
        // 以下功能用来隐藏文本框
        if (this.labelFlag) {
            this.laterTime = new Date();
            if (this.laterTime - this.nowTime >= 5000) {
                this.textLabel.labelActive(false);
                this.labelFlag = 0;
            }
        }
        // 到此

    }
});

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
        //# sourceMappingURL=dog.js.map
        