var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.createButton = function (text) {
        var button = new egret.DisplayObjectContainer();
        var button_bg = createBitmapByName('button_png');
        var textField = this.createText(text);
        button.addChild(button_bg);
        button.addChild(textField);
        textField.x = button_bg.width / 2;
        textField.y = button_bg.height / 2;
        button.touchEnabled = true;
        button.touchChildren = false;
        button.anchorOffsetX = button_bg.width / 2;
        button.anchorOffsetY = button_bg.height / 2;
        return button;
    };
    GameUtil.createText = function (text) {
        var textField = new eui.Label();
        textField.text = text;
        textField.size = 50;
        textField.anchorOffsetX = textField.width / 2;
        textField.anchorOffsetY = textField.height / 2;
        return textField;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
