var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var OverScene = (function (_super) {
    __extends(OverScene, _super);
    function OverScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    OverScene.prototype.initView = function () {
        console.log('创建');
        // 菜单
        var menu = GameUtil.createButton('菜单');
        menu.x = this.stage.stageWidth / 2;
        menu.y = this.stage.stageHeight / 4;
        menu.touchEnabled = true;
        menu.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SceneController.initGame();
        }, this);
        this.addChild(menu);
        // 分享
        var share = GameUtil.createButton('分享');
        share.x = this.stage.stageWidth / 2;
        share.y = menu.y + menu.height * 1.5;
        this.addChild(share);
        // 手指
        var hand = createBitmapByName('hand_png');
        hand.anchorOffsetX = hand.width / 2;
        hand.anchorOffsetY = hand.height / 2;
        hand.x = this.stage.stageWidth / 2;
        hand.y = share.y + share.height * 1.5;
        this.addChild(hand);
        // 提示
        var msgText = new eui.Label();
        msgText.text = '点击重新开始';
        msgText.size = 80;
        msgText.stroke = 5;
        msgText.textColor = 0x000000;
        msgText.strokeColor = 0xffffff;
        msgText.x = (this.stage.stageWidth - msgText.width) / 2;
        msgText.y = hand.y + hand.height * 1.5;
        this.addChild(msgText);
    };
    return OverScene;
}(egret.DisplayObjectContainer));
__reflect(OverScene.prototype, "OverScene");
