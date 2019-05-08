

cc.Class({
    extends: cc.Component,

    properties: {
        dogScript: require("dog"),
        textLabel: require("textLabel"),
        foodScript: require("food"),
    },

    init(){
        this.dogScript.init(this);
        this.textLabel.init(this);
        this.foodScript.init();
    },

    getNewDate(){
        let nowDay = new Date();
    },

    onLoad () {
        this.init();
        //cc.sys.localStorage.removeItem("saveArray");
        //cc.log(cc.sys.localStorage.getItem("asd"));
    },


    // update (dt) {},
});
