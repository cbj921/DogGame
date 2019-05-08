
cc.Class({
    extends: cc.Component,

    properties: {
        textBg: [cc.SpriteFrame],
        loveTextJson: cc.JsonAsset,
        mainText: cc.Label,
        numberLabel: cc.Label,
        winEffect: {
            type: cc.AudioClip,
            default: null,
        },
        clickEffect: {
            type: cc.AudioClip,
            default: null,
        },
    },

    popWindow() {
        // 用来弹出文本框
        this.node.position = cc.v2(0, 20); // 这里是相对父节点的坐标系
        this.node.getComponent(cc.Sprite).spriteFrame = this.randLetter();
        this.playLoveText();
        this.playWinEffect();
    },

    randLetter() {
        // 随机选择信纸
        let randNumber = Math.floor(Math.random() * this.textBg.length);
        return this.textBg[randNumber];
    },

    playLoveText() {
        this.fullText = this.loveTextJson.json.textData; // 得到全部的文本
        let randSeq = Math.floor(Math.random() * this.fullText.length);
        let randText = this.fullText[randSeq];
        this.mainText.string = randText;
        this.showHasPlayText(randSeq); // 用来显示语句数量标签
        cc.sys.localStorage.setItem("lastText", randText);
    },

    showHasPlayText(randSeq) {
        let seqArray = JSON.parse(cc.sys.localStorage.getItem("saveArray"));
        let num = 0;
        if (seqArray == null) {
            seqArray = new Array(this.fullText.length);
        }
        seqArray[randSeq] = 1;

        for (let i=0;i<seqArray.length;i++) {
            if (seqArray[i] == 1) {
                num++;
            }
        }
        this.numberLabel.string = num + '/' + this.fullText.length;
        cc.sys.localStorage.setItem("saveArray", JSON.stringify(seqArray));
    },

    /*getText(){
        let textData = JSON.parse(cc.sys.localStorage.getItem("loveText")); 
        if( textData == null){
            cc.sys.localStorage.setItem("loveText",JSON.stringify(this.loveTextJson));
        }

        return textData.json;

    },*/

    textAppear() {
        let lastText = cc.sys.localStorage.getItem("lastText");
        if (lastText == null) {
            lastText = "还没有解锁过情话哦。";
        }
        this.mainText.string = lastText;
        this.node.position = cc.v2(0, 20);
    },

    TextClose() {
        // 这个函数实现“假”关闭文本框，因为只是将文本框移出可见范围
        this.node.position = cc.v2(1500, 0);
    },

    playWinEffect() {
        cc.audioEngine.playEffect(this.winEffect);
    },
    playClickEffect() {
        cc.audioEngine.playEffect(this.clickEffect);
    },

    // update (dt) {},
});
