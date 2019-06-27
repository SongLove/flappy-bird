class OverScene extends egret.DisplayObjectContainer {
  constructor() {
    super()
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
  }
  private initView() {
    console.log('创建')

    // 菜单
    let menu = GameUtil.createButton('菜单')
    menu.x = this.stage.stageWidth / 2
    menu.y = this.stage.stageHeight / 4
    menu.touchEnabled = true
    menu.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      SceneController.initGame()
    }, this)
    this.addChild(menu)

    // 分享
    let share = GameUtil.createButton('分享')
    share.x = this.stage.stageWidth / 2
    share.y = menu.y + menu.height * 1.5
    this.addChild(share)

    // 手指
    let hand = createBitmapByName('hand_png')
    hand.anchorOffsetX = hand.width / 2
    hand.anchorOffsetY = hand.height / 2
    hand.x = this.stage.stageWidth / 2
    hand.y = share.y + share.height * 1.5
    this.addChild(hand)

    // 提示
    let msgText: eui.Label = new eui.Label()
    msgText.text = '点击重新开始'
    msgText.size = 80
    msgText.stroke = 5
    msgText.textColor = 0x000000
    msgText.strokeColor = 0xffffff
    msgText.x = (this.stage.stageWidth - msgText.width) / 2
    msgText.y = hand.y + hand.height * 1.5
    this.addChild(msgText)
  }
}