(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/gameCtl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '56f28PhK0pFfIwAvY6M/UjD', 'gameCtl', __filename);
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
        //cc.log(cc.sys.localStorage.getItem("asd"));
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
        //# sourceMappingURL=gameCtl.js.map
        