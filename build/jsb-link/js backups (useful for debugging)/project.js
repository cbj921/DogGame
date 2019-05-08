window.__require = function t(e, i, n) {
function o(a, s) {
if (!i[a]) {
if (!e[a]) {
var l = a.split("/");
l = l[l.length - 1];
if (!e[l]) {
var r = "function" == typeof __require && __require;
if (!s && r) return r(l, !0);
if (c) return c(l, !0);
throw new Error("Cannot find module '" + a + "'");
}
}
var h = i[a] = {
exports: {}
};
e[a][0].call(h.exports, function(t) {
return o(e[a][1][t] || t);
}, h, h.exports, t, e, i, n);
}
return i[a].exports;
}
for (var c = "function" == typeof __require && __require, a = 0; a < n.length; a++) o(n[a]);
return o;
}({
dog: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "62f467lk8JBkJ9Or01kLIrv", "dog");
var n = cc.Enum({
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
randStateNum: 0,
duration: 0,
textLabel: t("textLabel")
},
init: function(t) {
this.gameCtl = t;
this.setDogSleep();
this.node.on(cc.Node.EventType.TOUCH_START, this.dogTouchFunc, this);
},
setDogSleep: function() {
this.dog.spriteFrame = this.dogSleepPicture;
this.dogState = n.SLEEP;
},
dogTouchFunc: function() {
this.textLabel.playText(this.dogState);
this.dogState == n.SLEEP ? this.touchInSleep() : this.dogState == n.STAND ? this.touchInStand() : this.dogState == n.RUN ? this.touchInRun() : this.dogState == n.EAT && this.touchInEat();
},
touchInSleep: function() {
var t = this;
this.dogState = n.STAND;
this.dog.spriteFrame = this.dogShakePicture;
this.dogAnimation.scheduleOnce(function() {
t.dogAnimation.play("stand");
}, .5);
},
touchInStand: function() {
Math.random() > this.randStateNum && this.happyRun();
},
touchInRun: function() {
cc.log("run");
},
touchInEat: function() {},
happyRun: function() {
var t = this;
this.dogState = n.RUN;
var e = Math.random() + .2, i = cc.moveBy(this.duration, cc.v2(300 * -e, 0)), o = cc.moveBy(this.duration, cc.v2(300 * e, 0));
if (Math.random() > .5) {
this.dogAnimation.play("runLeft");
this.node.runAction(i);
this.dogAnimation.scheduleOnce(function() {
t.dogAnimation.play("runRight");
t.node.runAction(o);
}, this.duration);
} else {
this.dogAnimation.play("runRight");
this.node.runAction(o);
this.dogAnimation.scheduleOnce(function() {
t.dogAnimation.play("runLeft");
t.node.runAction(i);
}, this.duration);
}
this.dogAnimation.scheduleOnce(function() {
t.dogAnimation.play("stand");
t.dogState = n.STAND;
}, 2 * this.duration + .1);
},
setRandStateNum: function(t) {
this.randStateNum = t;
},
onLoad: function() {},
update: function(t) {}
});
cc._RF.pop();
}, {
textLabel: "textLabel"
} ],
food: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "11fdazwbz9NV4ocqIH10YxN", "food");
cc.Class({
extends: cc.Component,
properties: {
textLabel: cc.Label,
hungryLabel: cc.Label,
textLabelScript: t("textLabel"),
loveText: t("loveText")
},
init: function() {
this.getHungryLevel();
this.calcHungryLevel();
0 == this.hungryLabel.string ? this.node.active = !1 : this.node.active = !0;
},
feedFood: function() {
if (0 == this.hungryLabel.string) {
this.node.active = !0;
this.textLabelScript.labelActive(!0);
this.textLabel.string = "主人真好！好香哦！";
this.hungryLabel.string = 100;
this.loveText.popWindow();
var t = new Date().getTime();
cc.sys.localStorage.setItem("feedFirstTime", t);
} else {
this.textLabelScript.labelActive(!0);
this.textLabel.string = "人家碗里的还没吃完哦.";
}
},
calcHungryLevel: function() {
var t = cc.sys.localStorage.getItem("feedFirstTime");
null == t && (this.hungryLabel.string = 0);
var e = Date.now(), i = Math.floor((e - t) / 1e3 / 3600 * 20);
this.hungryLabel.string = 100 - i;
this.hungryLabel.string < 0 && (this.hungryLabel.string = 0);
},
getHungryLevel: function() {
var t = cc.sys.localStorage.getItem("hungryLevel");
this.hungryLabel.string = null == t ? 0 : t;
},
onLoad: function() {},
start: function() {}
});
cc._RF.pop();
}, {
loveText: "loveText",
textLabel: "textLabel"
} ],
gameCtl: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "56f28PhK0pFfIwAvY6M/UjD", "gameCtl");
cc.Class({
extends: cc.Component,
properties: {
dogScript: t("dog"),
textLabel: t("textLabel"),
foodScript: t("food")
},
init: function() {
this.dogScript.init(this);
this.textLabel.init(this);
this.foodScript.init();
},
getNewDate: function() {
new Date();
},
onLoad: function() {
this.init();
}
});
cc._RF.pop();
}, {
dog: "dog",
food: "food",
textLabel: "textLabel"
} ],
loveText: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "6d5254vnUxDdpHloLKp0mWb", "loveText");
cc.Class({
extends: cc.Component,
properties: {
textBg: [ cc.SpriteFrame ],
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
popWindow: function() {
this.node.position = cc.v2(0, 20);
this.node.getComponent(cc.Sprite).spriteFrame = this.randLetter();
this.playLoveText();
this.playWinEffect();
},
randLetter: function() {
var t = Math.floor(Math.random() * this.textBg.length);
return this.textBg[t];
},
playLoveText: function() {
this.fullText = this.loveTextJson.json.textData;
var t = this.fullText[Math.floor(Math.random() * this.fullText.length)];
this.mainText.string = t;
cc.sys.localStorage.setItem("lastText", t);
},
textAppear: function() {
var t = cc.sys.localStorage.getItem("lastText");
null == t && (t = "还没有解锁过情话哦。");
this.mainText.string = t;
this.node.position = cc.v2(0, 20);
},
TextClose: function() {
this.node.position = cc.v2(1500, 0);
},
playWinEffect: function() {
cc.audioEngine.playEffect(this.winEffect);
},
playClickEffect: function() {
cc.audioEngine.playEffect(this.clickEffect);
}
});
cc._RF.pop();
}, {} ],
textLabel: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "06df0gk8b9FyorJHTTLO0v5", "textLabel");
var n = cc.Enum({
SLEEP: -1,
STAND: -1,
RUN: -1,
EAT: -1
}), o = [ "开心!", "主人你要经常摸摸我哦", "主人你的手好软", "汪汪...", "主人你真好!", "爱你爱你爱你!", "好想每天都和你在一起呢", "主人是我哒，谁都不许抢!", "我...我叫...小狗几?", "大狗几是谁呢?", "主人你喜欢我吗?", "每天都要来看我哦", "要记得喂人家吃东西哦,要不然会饿饿", "每天喂我一次,就送主人一句情话" ], c = [ "啊？主人!?", "主人你来啦!", "我好想你呀主人", "人家刚刚做梦梦到主人了,汪", "Wu~~刚刚睡醒~", "汪汪汪,吓死我啦" ], a = [ "你就是我的新主人吗？", "你好漂亮哦，开心！", "我忘记自己是怎么到主人手上了", "但是我记得之前好像是一个男生在养我", "他好像给我取名小狗几？", "好傻的名字哦", "不管啦，主人求抱抱~~", "mua！" ];
cc.Class({
extends: cc.Component,
properties: {
textBg: cc.Node,
textLabel: cc.Label,
LoveText: cc.TextAsset
},
init: function(t) {
this.gameCtl = t;
this.textBg.active = !1;
this.order = 0;
},
playText: function(t) {
this.textBg.active = !0;
this.labelFlag = 1;
this.nowTime = new Date();
t == n.SLEEP && (this.firstOpenFlag ? this.textLabel.string = "Emmmm~~谁刚刚动我？" : this.playNameText(c));
t == n.STAND && (this.firstOpenFlag ? this.firstTouch(a) : this.playNameText(o));
t == n.EAT && (this.textLabel.string = "Emmm...真好吃...");
},
labelActive: function(t) {
this.textBg.active = t;
},
labelDisappear: function() {
if (this.labelFlag) {
this.laterTime = new Date();
if (this.laterTime - this.nowTime >= 5e3) {
this.textBg.active = !1;
this.labelFlag = 0;
}
}
},
playNameText: function(t) {
var e = t.length, i = t[Math.floor(Math.random() * e)];
this.textLabel.string = i;
},
firstTouch: function(t) {
this.textLabel.string = t[this.order];
this.order++;
if (this.order == t.length) {
this.firstOpenFlag = 0;
var e = new Date();
cc.sys.localStorage.setItem("lastDay", e);
}
},
onLoad: function() {
null == cc.sys.localStorage.getItem("lastDay") && (this.firstOpenFlag = 1);
},
update: function(t) {
this.labelDisappear();
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "dog", "food", "gameCtl", "loveText", "textLabel" ]);