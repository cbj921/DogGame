"use strict";
cc._RF.push(module, '56f28PhK0pFfIwAvY6M/UjD', 'gameCtl');
// Script/gameCtl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        dogScript: require("dog"),
        textLabel: require("textLabel")
    },

    init: function init() {
        this.dogScript.init(this);
        this.textLabel.init(this);
    },
    onLoad: function onLoad() {
        this.init();
    }
}

// update (dt) {},
);

cc._RF.pop();