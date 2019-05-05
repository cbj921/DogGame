

cc.Class({
    extends: cc.Component,

    properties: {
        textLabel: cc.Label,
        hungryLabel: cc.Label,
        textLabelScript : require("textLabel"),
        loveText: require("loveText"),
    },

    init(){
        this.getHungryLevel();
        this.calcHungryLevel();
        if(this.hungryLabel.string == 0){
            this.node.active = false;
        }
        else {
            this.node.active = true;
        }
    },

    feedFood(){
        if(this.hungryLabel.string == 0){
            this.node.active = true;
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "主人真好！好香哦！";
            this.hungryLabel.string = 100;
            //
            // TODO:调用情话文本框输出
            this.loveText.popWindow();
            //
            let firstTime = new Date();
            cc.sys.localStorage.setItem("feedFirstTime",firstTime);
            cc.sys.localStorage.setItem("hungryLevel",this.hungryLabel.string);
        }
        else{
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "人家碗里的还没吃完哦.";
        }
    },

    calcHungryLevel(){
        // 计算饱食度
        let lastFeedTime = new Date(cc.sys.localStorage.getItem("feedFirstTime")); // 这里的lastFeedTime 为 string 类型,要转换成object 类型
        if(lastFeedTime == null) {
            this.hungryLabel.string = 0;
            //cc.log("没有获取到时间");
        };
        this.getHungryLevel();

        let nowTime  = new Date();
        let hungryNumber = Math.floor(((nowTime - lastFeedTime)/1000/3600) * 20);
        this.hungryLabel.string -= hungryNumber;
        if(this.hungryLabel.string < 0){
            this.hungryLabel.string = 0;
        }

    },

    getHungryLevel(){
        let hungry = cc.sys.localStorage.getItem("hungryLevel");
        if(hungry == null){
            this.hungryLabel.string = 0;
        }
        else{
            this.hungryLabel.string = hungry;
        }
    },

    onLoad (){
        
    },

    start () {

    },

    // update (dt) {},
});
