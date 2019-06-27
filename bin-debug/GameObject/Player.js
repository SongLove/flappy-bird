// 小鸟的行为动作：跳 死亡
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        // 速度
        _this.acceleration = 0;
        _this.init();
        return _this;
    }
    Object.defineProperty(Player.prototype, "width", {
        // 计算人物宽高
        get: function () {
            return this._role.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "height", {
        get: function () {
            return this._role.height;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.init = function () {
        // 人物
        this._role = createBitmapByName('player_png');
        this.addChild(this._role);
        // 跳跃效果图
        this.jump_img = createBitmapByName('jump_png');
        this.jump_img.visible = false;
        this.addChild(this.jump_img);
        // 哎呦图片
        this.death_img = createBitmapByName('death_png');
        this.death_img.visible = false;
        this.addChild(this.death_img);
    };
    // 跳跃
    Player.prototype.jump = function () {
        var _this = this;
        if (!GameData.isAlive)
            return;
        this.acceleration = -GameData.jumpSpeed;
        this.jump_img.x = this._role.x - this._role.width / 2;
        this.jump_img.y = this._role.x + this._role.height + 10;
        this.jump_img.visible = true;
        egret.setTimeout(function () {
            _this.jump_img.visible = false;
        }, this, 100);
    };
    Player.prototype.death = function (isLanding) {
        var _this = this;
        if (isLanding === void 0) { isLanding = false; }
        GameData.isAlive = false;
        if (!isLanding) {
            this.death_img.x = this._role.x;
            this.death_img.y = this._role.y - this.death_img.height;
            this.death_img.visible = true;
            egret.setTimeout(function () {
                _this.death_img.visible = false;
            }, this, 500);
        }
    };
    // 行动中  
    Player.prototype.update = function (timeStamp) {
        this.y += this.acceleration;
        // 受重力加速的影响
        this.acceleration += GameData.gravity;
        if (this.y + this._role.height >= GameData.groundHeight) {
            console.log('游戏结束');
            this.death(true);
            SceneController.gameEnd();
            this.y = GameData.groundHeight - this._role.height;
        }
    };
    return Player;
}(GameObject));
__reflect(Player.prototype, "Player");
