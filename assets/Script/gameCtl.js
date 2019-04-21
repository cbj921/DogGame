

cc.Class({
    extends: cc.Component,

    properties: {
        dogScript: require("dog"),
        textLabel: require("textLabel"),
    },

    init(){
        this.dogScript.init(this);
        this.textLabel.init(this);
    },

    onLoad () {
        this.init();
    },


    // update (dt) {},
});
