class StartScene extends egret.DisplayObjectContainer {
  constructor() {
    super()
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
  }
  private initView() {
    // 背景
    let bg: egret.Bitmap = createBitmapByName('bg_png')
    this.addChild(bg)
    bg.width = this.stage.stageWidth
    bg.height = this.stage.stageHeight

    // 开始按钮
    let startBtn = GameUtil.createButton('开始游戏')
    this.addChild(startBtn)
    startBtn.x = (this.stage.stageWidth - startBtn.width)
    startBtn.y = (this.stage.stageHeight - startBtn.height) / 2
    startBtn.touchEnabled = true
    startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      SceneController.startGameScene()
    }, this)
  }
}