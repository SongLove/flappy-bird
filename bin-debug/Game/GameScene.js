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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        // 初始化场景
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        // 场景点击
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickView, _this);
        return _this;
    }
    // 初始化场景
    GameScene.prototype.initView = function () {
        var bg = createBitmapByName('bg_png');
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        //初始化场景中每一层
        this.UIContainer = new egret.DisplayObjectContainer();
        this.rolerContainer = new egret.DisplayObjectContainer();
        this.barrierContainer = new egret.DisplayObjectContainer();
        this.mileageContainer = new egret.DisplayObjectContainer();
        this.startGameContainer = new egret.DisplayObjectContainer();
        this.addChild(this.barrierContainer);
        this.addChild(this.mileageContainer);
        this.addChild(this.rolerContainer);
        this.addChild(this.UIContainer);
        this.addChild(this.startGameContainer);
        this.gameObjectList = [];
        this.deleteObjectList = [];
        // 初始化UI层
        this.initUIContainer();
        // 创建初始化开始游戏层
        this.startContainer();
        // 创建人物
        this.initRolerContainer();
        // 创造里程碑
        this.createMileage();
    };
    GameScene.prototype.startContainer = function () {
        var setoutText = new eui.Label();
        setoutText.text = '准备';
        setoutText.size = 100;
        setoutText.textColor = 0xffa500;
        setoutText.stroke = 5; //描边
        setoutText.strokeColor = 0x000000; // 描边颜色
        setoutText.x = (this.stage.width - setoutText.width) / 2;
        setoutText.y = this.stage.height / 5;
        this.startGameContainer.addChild(setoutText);
        var handImg = createBitmapByName('hand_png');
        handImg.x = (this.stage.width - handImg.width) / 2;
        handImg.y = this.stage.height / 2;
        this.startGameContainer.addChild(handImg);
        var setoutMsgText = new eui.Label();
        setoutMsgText.text = '点击开始游戏';
        setoutMsgText.size = 90;
        setoutMsgText.textColor = 0x000000;
        setoutMsgText.stroke = 5; //描边
        setoutMsgText.strokeColor = 0xffffff; // 描边颜色
        setoutMsgText.x = (this.stage.width - setoutMsgText.width) / 2;
        setoutMsgText.y = this.stage.height - setoutMsgText.height * 4;
        this.startGameContainer.addChild(setoutMsgText);
    };
    GameScene.prototype.initRolerContainer = function () {
        // 创建一个开始平台
        this.platfrom_bird = createBitmapByName('platform_png');
        this.platfrom_bird.x = 100;
        this.platfrom_bird.y = this.stage.stageHeight / 2;
        this.rolerContainer.addChild(this.platfrom_bird);
        GameData.player = new Player();
        GameData.player.x = this.platfrom_bird.x + GameData.player.width / 2;
        GameData.player.y = this.stage.stageHeight / 2 - GameData.player.height;
        this.rolerContainer.addChild(GameData.player);
    };
    GameScene.prototype.initUIContainer = function () {
        // 分数
        var tip1 = new eui.Label();
        tip1.text = '分数：';
        tip1.textColor = 0xffffff;
        tip1.size = 60;
        tip1.x = 50;
        tip1.y = 20;
        this.UIContainer.addChild(tip1);
        // 分数计数
        this.barrierText = new eui.Label();
        this.barrierText.size = 60;
        this.barrierText.x = tip1.x + tip1.width;
        this.barrierText.y = 20;
        this.UIContainer.addChild(this.barrierText);
        this.changeBarriersCount(0);
        // 鸡蛋计分
        var tip2 = new eui.Label();
        tip2.text = '鸡蛋：';
        tip2.size = 60;
        tip2.x = this.barrierText.x + this.barrierText.width + 50;
        tip2.y = 20;
        this.UIContainer.addChild(tip2);
        this.eggText = new eui.Label();
        this.eggText.size = 60;
        this.eggText.x = tip2.x + tip2.width;
        this.eggText.y = 20;
        this.UIContainer.addChild(this.eggText);
        this.changeEggCount(0);
    };
    /**
     * 改变鸡蛋得分
     */
    GameScene.prototype.changeEggCount = function (cnt) {
        this.eggText.text = cnt.toString();
    };
    /**
     * 改变得分
     */
    GameScene.prototype.changeBarriersCount = function (cnt) {
        this.barrierText.text = cnt.toString();
    };
    /**
     * 点击界面
     * 第一次点击开始游戏
     * 后面点击就是跳跃
     */
    GameScene.prototype.onClickView = function () {
        // 当游戏开始中 人物死亡 点击将会重置开始场景
        if (!GameData.hasStart && !GameData.isAlive) {
            SceneController.startGameScene();
            return;
        }
        // 直接开始游戏
        if (!GameData.hasStart) {
            SceneController.startGame();
            return;
        }
        GameData.player.jump();
    };
    // 开始游戏
    GameScene.prototype.startGame = function () {
        var _this = this;
        console.log('开始游戏');
        this.startGameContainer.visible = false;
        egret.Tween.get(this.platfrom_bird).to({ x: -this.platfrom_bird.width }, 300).call(function () {
            _this.rolerContainer.removeChild(_this.platfrom_bird);
        });
    };
    // 定时器
    GameScene.prototype.startTicker = function () {
        egret.ticker.$startTick(this.update, this);
    };
    GameScene.prototype.stopTicker = function () {
        egret.ticker.$stopTick(this.update, this);
    };
    GameScene.prototype.createMileage = function () {
        var mileage1 = createBitmapByName('floor_png');
        mileage1.y = this.stage.stageHeight - mileage1.height;
        this.mileageContainer.addChild(mileage1);
        this.mileage1 = mileage1;
        var mileage2 = createBitmapByName('floor_png');
        mileage2.y = this.stage.stageHeight - mileage2.height;
        mileage2.x = mileage1.width;
        this.mileageContainer.addChild(mileage2);
        this.mileage2 = mileage2;
        GameData.groundHeight = mileage1.y;
    };
    // tick
    GameScene.prototype.update = function (timeStap) {
        if (!GameData.hasStart)
            return true;
        // 当第一个地板走到底部 将接到第二个底部
        if (this.mileage1.x + this.mileage1.width <= 0) {
            this.mileage1.x = this.mileage2.x + this.mileage2.width;
        }
        if (this.mileage2.x + this.mileage2.width <= 0) {
            this.mileage2.x = this.mileage1.x + this.mileage1.width;
        }
        // 里程碑开始滚动
        this.mileage1.x -= GameData.speed;
        this.mileage2.x -= GameData.speed;
        // 走过的距离
        GameData.distance += GameData.speed / 2;
        // 
        GameData.player.update(timeStap);
        for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.update(timeStap);
        }
        // 创建障碍物
        this.addElements();
        // 检测碰撞
        this.collision();
        return true;
    };
    GameScene.prototype.collision = function () {
        var player = GameData.player;
        // 碰撞检测
        var player_rect = this.isRectangle(player);
        for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
            var barrier = _a[_i];
            if (barrier instanceof Barrier) {
                var up_rect = this.rectangle(barrier.x, 0, barrier.barrier_up.width, barrier.barrier_down.y - GameData.barrierWidth);
                var down_rect = this.rectangle(barrier.x, barrier.barrier_down.y, barrier.barrier_down.width, barrier.barrier_down.height);
                // 真正碰撞
                if (player_rect.intersects(up_rect) || player_rect.intersects(down_rect)) {
                    console.log('碰到了');
                    GameData.player.death();
                    GameData.isAlive = false;
                    SceneController.gameEnd();
                }
                // 越过了 计分
                if (barrier.x + barrier.barrier_up.width + player.width / 2 < player.x + player.width / 2 && !barrier.isScroce) {
                    barrier.isScroce = true;
                    GameData.barrierCount++;
                    this.changeBarriersCount(GameData.barrierCount);
                }
                if (barrier.x + barrier.barrier_up.width + 50 < 0) {
                    this.deleteObjectList.push();
                }
            }
            if (barrier instanceof Egg) {
                var egg_rect = new egret.Rectangle(barrier.x, barrier.y, barrier.width, barrier.height);
                console.log(barrier.x, barrier.y, barrier.width, barrier.height);
                if (player_rect.intersects(egg_rect) && !barrier.hasTrigger) {
                    console.log('碰撞了蛋');
                    barrier.hasTrigger = true;
                    GameData.eggCount++;
                    this.changeEggCount(GameData.eggCount);
                    this.deleteObjectList.push(barrier);
                }
                if (barrier.x + barrier.width + 50 < 0) {
                    this.deleteObjectList.push(barrier);
                }
            }
            for (var _b = 0, _c = this.deleteObjectList; _b < _c.length; _b++) {
                var obj = _c[_b];
                this.barrierContainer.removeChild(obj);
                this.gameObjectList.splice(this.gameObjectList.indexOf(obj), 1);
            }
            this.deleteObjectList.length = 0;
        }
    };
    GameScene.prototype.rectangle = function (x, y, w, h) {
        return new egret.Rectangle(x, y, w, h);
    };
    GameScene.prototype.isRectangle = function (obj) {
        return new egret.Rectangle(obj.x, obj.y, obj.width, obj.height);
    };
    GameScene.prototype.addElements = function () {
        // 获取障碍物配置 永远是获取第一个，因为创建后会删除，所有第一个数据就是要下个要创建的数据
        var element = GameData.elements[0];
        // 当你走过的距离达到障碍物坐标距离 将创建，通过第一轮，也就是走了5000米
        //console.log(GameData.distance, element.distance, GameData.rounds, GameData.maxMileage)
        if (element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage) {
            if (element.type === 'wall') {
                var barrier = new Barrier(element);
                barrier.x = this.stage.stageWidth;
                this.barrierContainer.addChild(barrier);
                this.gameObjectList.push(barrier);
            }
            if (element.type === 'egg') {
                var egg = new Egg(element);
                // x 就是出现到页面的末端
                egg.x = this.stage.stageWidth;
                egg.y = element.y;
                this.barrierContainer.addChild(egg);
                this.gameObjectList.push(egg);
            }
            GameData.elements.splice(0, 1);
            // 表示已走完了一轮
            if (GameData.elements.length <= 0) {
                GameData.elements = GameData.elements.concat(RES.getRes('config_json').elements);
                GameData.rounds++;
            }
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
