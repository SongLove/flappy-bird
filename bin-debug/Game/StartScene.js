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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    StartScene.prototype.initView = function () {
        // 背景
        var bg = createBitmapByName('bg_png');
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        // 开始按钮
        var startBtn = GameUtil.createButton('开始游戏');
        this.addChild(startBtn);
        startBtn.x = (this.stage.stageWidth - startBtn.width);
        startBtn.y = (this.stage.stageHeight - startBtn.height) / 2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SceneController.startGameScene();
        }, this);
    };
    return StartScene;
}(egret.DisplayObjectContainer));
__reflect(StartScene.prototype, "StartScene");
