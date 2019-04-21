const DOGSTATE = cc.Enum({
    SLEEP: -1,
    STAND: -1,
    RUN: -1,
    EAT: -1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        dog: cc.Sprite,
        dogAnimation: cc.Animation,
        dogSleepPicture: cc.SpriteFrame,
        dogShakePicture: cc.SpriteFrame,
        randStateNum: 0, // 该值只能在0-1之间,用来在 touchInStand() 中决定触摸后状态
        duration: 0,
        textLabel: require("textLabel"),
    },

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.setDogSleep();
        this.node.on(cc.Node.EventType.TOUCH_START, this.dogTouchFunc, this);
    },

    setDogSleep() {
        this.dog.spriteFrame = this.dogSleepPicture;
        this.dogState = DOGSTATE.SLEEP;
    },

    // 处理触摸狗的事件
    dogTouchFunc() {
        this.textLabel.playText(this.dogState);
        if (this.dogState == DOGSTATE.SLEEP) {
            this.touchInSleep();
        } else if (this.dogState == DOGSTATE.STAND) {
            this.touchInStand();
        } else if (this.dogState == DOGSTATE.RUN) {
            this.touchInRun();
        } else if (this.dogState == DOGSTATE.EAT) {
            this.touchInEat();
        }

    },

    touchInSleep() {
        this.dogState = DOGSTATE.STAND;
        this.dog.spriteFrame = this.dogShakePicture;
        this.dogAnimation.scheduleOnce(() => {
            this.dogAnimation.play("stand");
        }, 0.5);
    },

    touchInStand() {
        let randNum = 0;
        randNum = Math.random(); // 利用随机数来决定 stand 状态下被触摸后干嘛
        // 有两种情况，一种是触摸后乱跑，一种是触摸后显示文字
        if (randNum > this.randStateNum) {
            // 乱跑情况
            this.happyRun();
        } else {
            //this.textLabel.playText(this.dogState);
        }
    },

    touchInRun() {
        // 不要跑动时点击动画
        cc.log("run");
    },

    touchInEat() {

    },

    happyRun() { // 这里的代码可以用，但是很奇怪，需要优化 
        this.dogState = DOGSTATE.RUN;
        let runDistance = Math.random() + 0.2;
        let runLeft = cc.moveBy(this.duration, cc.v2(-runDistance * 300, 0));
        let runRight = cc.moveBy(this.duration, cc.v2(runDistance * 300, 0));
        if (Math.random() > 0.5) {
            this.dogAnimation.play("runLeft");
            this.node.runAction(runLeft);
            this.dogAnimation.scheduleOnce(()=>{
                this.dogAnimation.play("runRight");
                this.node.runAction(runRight);
            },this.duration);

        } else {
            this.dogAnimation.play("runRight");
            this.node.runAction(runRight);
            this.dogAnimation.scheduleOnce(()=>{
                this.dogAnimation.play("runLeft");
                this.node.runAction(runLeft);
            },this.duration);
        }
        this.dogAnimation.scheduleOnce(()=>{
            this.dogAnimation.play("stand");
            this.dogState = DOGSTATE.STAND;
        },2*this.duration+0.1); // 需要等待两个 duration 才能执行
    },

    onLoad() {
        //cc.log(this.dogAnimation);
        //this.dogAnimation.play("runRight");

    },

});
