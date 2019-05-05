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

const firstTouchText = ["你就是我的新主人吗？","你好漂亮哦，开心！","我忘记自己是怎么到主人手上了","但是我记得之前好像是一个男生在养我",
                        "他好像给我取名小狗几？","好傻的名字哦","不管啦，主人求抱抱~~","mua！",];

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
        this.order = 0;
    },

    playText(dogState){
        this.textBg.active = true;
        this.labelFlag = 1; // 1 表示文本框的 active == true
        this.nowTime = new Date(); // 用来记录触摸时的时间
        if(dogState == DOGSTATE.SLEEP){
            if(!this.firstOpenFlag){
                this.playNameText(touchSleepText);
            }else{
                this.textLabel.string = "Emmmm~~谁刚刚动我？";
            }
        }
        if(dogState == DOGSTATE.STAND){
            if(!this.firstOpenFlag){
                this.playNameText(touchStandText);
            }else{
                this.firstTouch(firstTouchText);
            }
        }
        if(dogState == DOGSTATE.EAT){
            this.textLabel.string = "Emmm...真好吃...";
        }
    },

    labelActive(boolean){
        this.textBg.active = boolean;
        /*if(boolean){
            this.labelFlag = 1;
        }*/
    },

    labelDisappear(){
        // 自动隐藏文本框
    if(this.labelFlag){
        this.laterTime = new Date();
        if(this.laterTime - this.nowTime >= 5000){
            this.textBg.active = false;
            this.labelFlag = 0;
        }
    }
    },

    playNameText(textName){
        // 参数为传入的文本文件名
        let length = textName.length;
        let randText = textName[Math.floor(Math.random()*length)];
        this.textLabel.string = randText;
    },

    firstTouch(firstTouchText){
        // 播放第一次触摸的文本模式
        this.textLabel.string = firstTouchText[this.order];
        this.order++;
        if(this.order == firstTouchText.length){
            this.firstOpenFlag = 0;
            let nowDay = new Date();
            cc.sys.localStorage.setItem("lastDay",nowDay);
            //cc.log(cc.sys.localStorage.getItem("lastDay"));
        }
    },

    onLoad(){
        if(cc.sys.localStorage.getItem("lastDay") == null){
            this.firstOpenFlag = 1;
        } 
    },


    update (dt) {
        this.labelDisappear();
    },
});
