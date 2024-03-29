// 小鸟的行为动作：跳 死亡

class Player extends GameObject {
  constructor() {
    super()
    this.init()
  }
  // 人物
  private _role: egret.Bitmap
  // 放屁图片
  private jump_img: egret.Bitmap
  // 碰撞死亡哎呦图片
  private death_img: egret.Bitmap
  // 速度
  private acceleration: number = 0


  // 计算人物宽高
  get width() {
    return this._role.width
  }
  get height() {
    return this._role.height
  }

  private init() {
    // 人物
    this._role = createBitmapByName('player_png')
    this.addChild(this._role)

    // 跳跃效果图
    this.jump_img = createBitmapByName('jump_png')
    this.jump_img.visible = false
    this.addChild(this.jump_img)

    // 哎呦图片
    this.death_img = createBitmapByName('death_png')
    this.death_img.visible = false
    this.addChild(this.death_img)
  }
  // 跳跃
  public jump() {
    if (!GameData.isAlive) return
    this.acceleration = -GameData.jumpSpeed
    this.jump_img.x = this._role.x - this._role.width / 2
    this.jump_img.y = this._role.x + this._role.height + 10
    this.jump_img.visible = true
    egret.setTimeout(() => {
      this.jump_img.visible = false
    }, this, 100)
  }

  public death(isLanding: boolean = false) {
    GameData.isAlive = false
    if (!isLanding) {
      this.death_img.x = this._role.x
      this.death_img.y = this._role.y - this.death_img.height
      this.death_img.visible = true
      egret.setTimeout(() => {
        this.death_img.visible = false
      }, this, 500)
    }
  }

  // 行动中  
  update(timeStamp: number) {
    this.y += this.acceleration
    // 受重力加速的影响
    this.acceleration += GameData.gravity

    if (this.y + this._role.height >= GameData.groundHeight) {
      console.log('游戏结束')
      this.death(true)
      SceneController.gameEnd()
      this.y = GameData.groundHeight - this._role.height
    }
  }
}