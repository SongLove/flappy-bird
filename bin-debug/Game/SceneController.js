// 场景管理
// 管理所有层级页面， 开始游戏 游戏中，游戏结束之间切换
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        this.gameScene = new GameScene();
        this.overScene = new OverScene();
    }
    Object.defineProperty(SceneController, "instance", {
        // 获得当前实例
        get: function () {
            if (!this.SceneController) {
                this.SceneController = new SceneController;
            }
            return this.SceneController;
        },
        enumerable: true,
        configurable: true
    });
    // 在main 设置 DisplayObjectContainer 初始化
    SceneController.prototype.setStage = function (s) {
        this._stage = s;
    };
    /**
     * 游戏初始化（进入开始游戏场景）
     */
    SceneController.initGame = function () {
        var stage = this.instance._stage;
        //加入游戏场景
        stage.addChild(this.instance.startScene);
    };
    /**
     * 游戏开始（进入游戏场景）
     */
    SceneController.startGameScene = function () {
        var stage = this.instance._stage;
        // 移除原来的开始场景
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene);
            this.instance.startScene = new StartScene();
        }
        if (this.instance.gameScene.parent) {
            stage.removeChild(this.instance.gameScene);
            this.instance.gameScene = new GameScene();
        }
        // 初始化游戏配置
        GameData.barrierWidth = 0;
        GameData.distance = 0;
        GameData.eggCount = 0;
        GameData.barrierCount = 0;
        GameData.eggCount = 0;
        GameData.isAlive = true;
        // 读取配置文件
        this.loadLevelData();
        //障碍物的位置
        GameData.elements = GameData.elements.concat();
        stage.addChild(this.instance.gameScene);
    };
    /**
     * 游戏开始（开始游戏）
     */
    SceneController.startGame = function () {
        GameData.hasStart = true;
        this.instance.gameScene.startGame();
        // 定时器开始
        this.instance.gameScene.startTicker();
    };
    SceneController.loadLevelData = function () {
        var levelData = RES.getRes('config_json');
        GameData.elements = levelData.elements;
        //按照比例计算
        GameData.speed = (levelData.properties.speed / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.gravity = (levelData.properties.gravity / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.jumpSpeed = (levelData.properties.jumpSpeed / 1920) * egret.MainContext.instance.stage.stageHeight;
        GameData.barrierWidth = levelData.properties.barrierWidth;
        GameData.maxMileage = levelData.properties.maxMileage;
    };
    /**
     * 游戏结束
     */
    SceneController.gameEnd = function () {
        GameData.hasStart = false;
        this.instance.gameScene.stopTicker();
        var stage = this.instance._stage;
        stage.addChild(this.instance.overScene);
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");
