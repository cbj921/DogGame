

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
            let firstTime = new Date().getTime(); // 创建一个时间戳
            cc.sys.localStorage.setItem("feedFirstTime",firstTime); // 存储的为时间戳
            //cc.sys.localStorage.setItem("hungryLevel",this.hungryLabel.string);
        }
        else{
            this.textLabelScript.labelActive(true);
            this.textLabel.string = "人家碗里的还没吃完哦.";
        }
    },

    calcHungryLevel(){
        // 计算饱食度
        let lastFeedTime = cc.sys.localStorage.getItem("feedFirstTime"); // 这里的lastFeedTime 为 时间戳
        if(lastFeedTime == null) {
            this.hungryLabel.string = 0;
            //cc.log("没有获取到时间");
        };
        //this.getHungryLevel();

        let nowTime  = Date.now();
        let hungryNumber = Math.floor(((nowTime - lastFeedTime)/1000/3600) * 40);
        this.hungryLabel.string = 100 - hungryNumber;
        if(this.hungryLabel.string < 0){
            this.hungryLabel.string = 0;
        }
        
        //cc.log(lastFeedTime);

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
