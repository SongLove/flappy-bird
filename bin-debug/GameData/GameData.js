var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 储蓄游戏中的数值
var GameData = (function () {
    function GameData() {
    }
    /**
     * 穿越的障碍数
     */
    GameData.barrierCount = 0;
    /**
     * 鸡蛋计数
     */
    GameData.eggCount = 0;
    /**
     * 存放配置文件中读取的障碍物数据
     */
    GameData.elements = [];
    /**
     * 障碍物产生的轮数
     */
    GameData.rounds = 0;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
