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
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg(enemyData) {
        var _this = _super.call(this) || this;
        _this._eggData = enemyData;
        _this.hasTrigger = false;
        _this.createEgg();
        return _this;
    }
    Egg.prototype.createEgg = function () {
        this.egg = createBitmapByName('egg_png');
        this.addChild(this.egg);
    };
    Egg.prototype.update = function (timeStamp) {
        this.x -= GameData.speed;
    };
    return Egg;
}(GameObject));
__reflect(Egg.prototype, "Egg");
