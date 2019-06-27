class Egg extends GameObject{
  // 障碍物数据
  private _eggData: ElementData
  // 是否计分
  public isScroce: boolean
  public egg: egret.Bitmap

  constructor(enemyData: ElementData) {
    super()
    this._eggData = enemyData
    this.hasTrigger = false
    this.createEgg()
  }
  private createEgg() {
    this.egg = createBitmapByName('egg_png')
    this.addChild(this.egg)
  }
  
  update(timeStamp: number) {
    this.x -= GameData.speed
  }
}