const DOGSTATE = cc.Enum({
    SLEEP: -1,
    STAND: -1,
    RUN: -1,
    EAT: -1,
});

const touchStandText = ["开心!","主人你要经常摸摸我哦","主人你的手好软","汪汪...","主人你真好!","爱你爱你爱你!","好想每天都和你在一起呢",
                        "主人是我哒，谁都不许抢!","我...我叫...小狗几?","大狗几是谁呢?","主人你喜欢我吗?","每天都要来看我哦",
                        "要记得喂人家吃东西哦,要不然会饿饿","每天喂我一次,就送主人一句情话"];
const touchSleepText = ["啊？主人!?","主人你来啦!","我好想你呀主人","人家刚刚做梦梦到主人了,汪","Wu~~刚刚睡醒~","汪汪汪,吓死我啦"];
const touchEatText = [];

cc.Class({
    extends: cc.Component,

    properties: {
        textBg: cc.Node,
        textLabel:cc.Label,
        LoveText: cc.TextAsset,
    },

    init(gameCtl){
        this.gameCtl = gameCtl;
        this.textBg.active = false;
    },

    playText(dogState){
        this.textBg.active = true;
        this.labelFlag = 1; // 1 表示文本框的 active == true
        this.nowTime = new Date(); // 用来记录触摸时的时间
        if(dogState == DOGSTATE.SLEEP){
            let length = touchSleepText.length;
            let randText = touchSleepText[Math.floor(Math.random()*length)];
            this.textLabel.string = randText;
        }
        if(dogState == DOGSTATE.STAND){
            let length = touchStandText.length;
            let randText = touchStandText[Math.floor(Math.random()*length)];
            this.textLabel.string = randText;
        }
        if(dogState == DOGSTATE.EAT){
            this.textLabel.string = "Emmm...真好吃...";
        }
    },

    labelActive(boolean){
        this.textBg.active = boolean;
    },

    /*eventForActive(){
        // 对文本框进行监听，如果文本框为 active = true，则开启监听
        let nowTime = new Date();
        
    },*/

    onLoad(){
        
    },


    update (dt) {
    // 以下功能用来隐藏文本框
    if(this.labelFlag){
        this.laterTime = new Date();
        if(this.laterTime - this.nowTime >= 5000){
            this.textBg.active = false;
            this.labelFlag = 0;
        }
    }
// 到此

    },
});
