// 保存游戏场景中的对象

class GameObject extends egret.DisplayObjectContainer {
  constructor() {
    super()
  }
  public hasTrigger: boolean // 是否碰撞
  update(timeStamp: number) {}
}