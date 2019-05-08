"use strict";
cc._RF.push(module, '56f28PhK0pFfIwAvY6M/UjD', 'gameCtl');
// Script/gameCtl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        dogScript: require("dog"),
        textLabel: require("textLabel"),
        foodScript: require("food")
    },

    init: function init() {
        this.dogScript.init(this);
        this.textLabel.init(this);
        this.foodScript.init();
    },
    getNewDate: function getNewDate() {
        var nowDay = new Date();
    },
    onLoad: function onLoad() {
        this.init();
        //cc.sys.localStorage.removeItem("feedFirstTime");
        //cc.log(cc.sys.localStorage.getItem("asd"));
    }
}

// update (dt) {},
);

cc._RF.pop();