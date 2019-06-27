class Barrier extends GameObject {
  // 障碍物数据
  private _barrierData: ElementData
  // 障碍物下
  public barrier_down: egret.Bitmap
  // 障碍物上
  public barrier_up: egret.Bitmap
  // 是否计分
  public isScroce: boolean

  constructor(enemyData: ElementData) {
    super()
    this._barrierData = enemyData
    this.isScroce = false
    this.hasTrigger = false
    this.createBarrier()
  }
  private createBarrier() {
    let data: ElementData = this._barrierData
    this.barrier_down = createBitmapByName('polebot_png')
    this.barrier_down.anchorOffsetX = this.barrier_down.width / 2
    this.barrier_down.y = data.y
    this.addChild(this.barrier_down)

    this.barrier_up = createBitmapByName('polebot_png')
    this.barrier_up.anchorOffsetX = this.barrier_up.width / 2
    this.barrier_up.y = this.barrier_down.y - GameData.barrierWidth
    this.barrier_up.rotation = 180
    this.addChild(this.barrier_up)
  }
  update(timeStamp: number) {
    this.x -= GameData.speed
  }
}