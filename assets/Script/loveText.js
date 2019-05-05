
cc.Class({
    extends: cc.Component,

    properties: {
        textBg:[cc.SpriteFrame],
        loveTextJson: cc.JsonAsset,
        mainText: cc.Label,
    },

    popWindow(){
        // 用来弹出文本框
        this.node.position = cc.v2(0,20); // 这里是相对父节点的坐标系
        this.node.getComponent(cc.Sprite).spriteFrame = this.randLetter(); 
        this.playLoveText();
    },

    randLetter(){
        // 随机选择信纸
        let randNumber = Math.floor(Math.random() * this.textBg.length);
        return this.textBg[randNumber];
    },

    playLoveText(){
        //
        //TODD: 输出情话
        //两个数组，一个用来存放还没出现过的文字下标，一个用来存放已经出现过的文字下标,然后将其存入缓存就行了
        //
        this.fullText = this.loveTextJson.json.textData; // 得到全部的文本
        let randText = this.fullText[Math.floor(Math.random() * this.fullText.length)];
        this.mainText.string = randText;
    },

    /*getText(){
        let textData = JSON.parse(cc.sys.localStorage.getItem("loveText")); 
        if( textData == null){
            cc.sys.localStorage.setItem("loveText",JSON.stringify(this.loveTextJson));
        }

        return textData.json;

    },*/

    TextClose(){
        // 这个函数实现“假”关闭文本框，因为只是将文本框移出可见范围
        this.node.position = cc.v2(1500,0);
    },

    start () {
        //cc.log(this.textBg[1]);
        //cc.log(this.loveTextJson.json.textData);
    },

    // update (dt) {},
});