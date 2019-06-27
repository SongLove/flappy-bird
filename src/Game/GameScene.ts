class GameScene extends egret.DisplayObjectContainer {
  constructor() {
    super()
    // 初始化场景
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
    this.touchEnabled = true
    // 场景点击
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this)
  }
  // 游戏场景中包括 ui层 roler层 障碍物 背景层 开始游戏层
  private UIContainer: egret.DisplayObjectContainer // ui层
  private rolerContainer: egret.DisplayObjectContainer // 主角
  private barrierContainer: egret.DisplayObjectContainer // 障碍物
  private mileageContainer: egret.DisplayObjectContainer // 背景地砖层
  private startGameContainer: egret.DisplayObjectContainer // 开始游戏层

  // 越过障碍物的分数
  private barrierText: eui.Label
  // 吃到鸡蛋的计分
  private eggText: eui.Label
  // 小鸟站立的平台
  private platfrom_bird: egret.Bitmap
  // 存放
  private gameObjectList: GameObject[]
  // 删除元素
  private deleteObjectList: GameData[]

  // 初始化场景
  private initView() {
    let bg: egret.Bitmap = createBitmapByName('bg_png')
    bg.width = this.stage.stageWidth
    bg.height = this.stage.stageHeight
    this.addChild(bg)

    //初始化场景中每一层
    this.UIContainer = new egret.DisplayObjectContainer()
    this.rolerContainer = new egret.DisplayObjectContainer()
    this.barrierContainer = new egret.DisplayObjectContainer()
    this.mileageContainer = new egret.DisplayObjectContainer()
    this.startGameContainer = new egret.DisplayObjectContainer()

    this.addChild(this.barrierContainer)
    this.addChild(this.mileageContainer)
    this.addChild(this.rolerContainer)
    this.addChild(this.UIContainer)
    this.addChild(this.startGameContainer)

    this.gameObjectList = []
    this.deleteObjectList = []

    // 初始化UI层
    this.initUIContainer()
    // 创建初始化开始游戏层
    this.startContainer()
    // 创建人物
    this.initRolerContainer()
    // 创造里程碑
    this.createMileage()
  }

  private startContainer() {
    let setoutText: eui.Label = new eui.Label()
    setoutText.text = '准备'
    setoutText.size = 100
    setoutText.textColor = 0xffa500
    setoutText.stroke = 5 //描边
    setoutText.strokeColor = 0x000000 // 描边颜色
    setoutText.x = (this.stage.width - setoutText.width) / 2
    setoutText.y = this.stage.height / 5
    this.startGameContainer.addChild(setoutText)

    let handImg = createBitmapByName('hand_png')
    handImg.x = (this.stage.width - handImg.width) / 2
    handImg.y = this.stage.height / 2
    this.startGameContainer.addChild(handImg)

    let setoutMsgText: eui.Label = new eui.Label()
    setoutMsgText.text = '点击开始游戏'
    setoutMsgText.size = 90
    setoutMsgText.textColor = 0x000000
    setoutMsgText.stroke = 5 //描边
    setoutMsgText.strokeColor = 0xffffff // 描边颜色
    setoutMsgText.x = (this.stage.width - setoutMsgText.width) / 2
    setoutMsgText.y = this.stage.height - setoutMsgText.height * 4
    this.startGameContainer.addChild(setoutMsgText)
  }

  private initRolerContainer() {
    // 创建一个开始平台
    this.platfrom_bird = createBitmapByName('platform_png')
    this.platfrom_bird.x = 100
    this.platfrom_bird.y = this.stage.stageHeight / 2
    this.rolerContainer.addChild(this.platfrom_bird)

    GameData.player = new Player()
    GameData.player.x = this.platfrom_bird.x + GameData.player.width / 2
    GameData.player.y = this.stage.stageHeight / 2 - GameData.player.height
    this.rolerContainer.addChild(GameData.player)
  }

  private initUIContainer() {
    // 分数
    let tip1: eui.Label = new eui.Label()
    tip1.text = '分数：'
    tip1.textColor = 0xffffff
    tip1.size = 60
    tip1.x = 50
    tip1.y = 20
    this.UIContainer.addChild(tip1)

    // 分数计数
    this.barrierText = new eui.Label()
    this.barrierText.size = 60
    this.barrierText.x = tip1.x + tip1.width
    this.barrierText.y = 20
    this.UIContainer.addChild(this.barrierText)
    this.changeBarriersCount(0)

    // 鸡蛋计分
    let tip2: eui.Label = new eui.Label()
    tip2.text = '鸡蛋：'
    tip2.size = 60
    tip2.x = this.barrierText.x + this.barrierText.width + 50
    tip2.y = 20
    this.UIContainer.addChild(tip2)

    this.eggText = new eui.Label()
    this.eggText.size = 60
    this.eggText.x = tip2.x + tip2.width
    this.eggText.y = 20
    this.UIContainer.addChild(this.eggText)
    this.changeEggCount(0)
  }

  /**
   * 改变鸡蛋得分
   */
  private changeEggCount(cnt: number) {
    this.eggText.text = cnt.toString()
  }

  /**
   * 改变得分
   */
  private changeBarriersCount(cnt: number) {
    this.barrierText.text = cnt.toString()
  }

  /**
   * 点击界面
   * 第一次点击开始游戏
   * 后面点击就是跳跃
   */
  private onClickView() {

    // 当游戏开始中 人物死亡 点击将会重置开始场景
    if (!GameData.hasStart && !GameData.isAlive) {
      SceneController.startGameScene()
      return
    }

    // 直接开始游戏
    if (!GameData.hasStart) {
      SceneController.startGame()
      return
    }
    GameData.player.jump()
  }

  // 开始游戏
  public startGame() {
    console.log('开始游戏')
    this.startGameContainer.visible = false
    egret.Tween.get(this.platfrom_bird).to({ x: -this.platfrom_bird.width }, 300).call(() => {
      this.rolerContainer.removeChild(this.platfrom_bird)
    })
  }

  // 定时器
  public startTicker() {
    egret.ticker.$startTick(this.update, this)
  }
  public stopTicker() {
    egret.ticker.$stopTick(this.update, this)
  }

  // 两个底部石板连接
  private mileage1: egret.Bitmap
  private mileage2: egret.Bitmap

  private createMileage() {
    let mileage1 = createBitmapByName('floor_png')
    mileage1.y = this.stage.stageHeight - mileage1.height
    this.mileageContainer.addChild(mileage1)
    this.mileage1 = mileage1
    let mileage2 = createBitmapByName('floor_png')
    mileage2.y = this.stage.stageHeight - mileage2.height
    mileage2.x = mileage1.width
    this.mileageContainer.addChild(mileage2)
    this.mileage2 = mileage2

    GameData.groundHeight = mileage1.y
  }
  // tick
  private update(timeStap: number): boolean {
    if (!GameData.hasStart) return true

    // 当第一个地板走到底部 将接到第二个底部
    if (this.mileage1.x + this.mileage1.width <= 0) {
      this.mileage1.x = this.mileage2.x + this.mileage2.width
    }
    if (this.mileage2.x + this.mileage2.width <= 0) {
      this.mileage2.x = this.mileage1.x + this.mileage1.width
    }
    // 里程碑开始滚动
    this.mileage1.x -= GameData.speed
    this.mileage2.x -= GameData.speed

    // 走过的距离
    GameData.distance += GameData.speed / 2
    // 
    GameData.player.update(timeStap)

    for (let obj of this.gameObjectList) {
      obj.update(timeStap)
    }

    // 创建障碍物
    this.addElements()
    // 检测碰撞
    this.collision()

    return true
  }
  private collision() {
    let player: Player = GameData.player
    // 碰撞检测
    let player_rect = this.isRectangle(player)
    for (let barrier of this.gameObjectList) {
      if (barrier instanceof Barrier) {
        let up_rect: egret.Rectangle = this.rectangle(barrier.x, 0, barrier.barrier_up.width, barrier.barrier_down.y - GameData.barrierWidth)
        let down_rect: egret.Rectangle = this.rectangle(barrier.x, barrier.barrier_down.y, barrier.barrier_down.width, barrier.barrier_down.height)

        // 真正碰撞
        if (player_rect.intersects(up_rect) || player_rect.intersects(down_rect)) {
          console.log('碰到了')
          GameData.player.death()
          GameData.isAlive = false
          SceneController.gameEnd()
        }

        // 越过了 计分
        if (barrier.x + barrier.barrier_up.width + player.width / 2 < player.x + player.width / 2 && !barrier.isScroce) {
          barrier.isScroce = true
          GameData.barrierCount++
          this.changeBarriersCount(GameData.barrierCount)
        }
        if (barrier.x + barrier.barrier_up.width + 50 < 0) {
          this.deleteObjectList.push()
        }

      }

      if (barrier instanceof Egg) {
        let egg_rect: egret.Rectangle = new egret.Rectangle(barrier.x, barrier.y, barrier.width, barrier.height)
        console.log(barrier.x, barrier.y, barrier.width, barrier.height)
        if (player_rect.intersects(egg_rect) && !barrier.hasTrigger) {
          console.log('碰撞了蛋')
          barrier.hasTrigger = true
          GameData.eggCount++
          this.changeEggCount(GameData.eggCount)
          this.deleteObjectList.push(barrier)
        }
        if (barrier.x + barrier.width + 50 < 0) {
          this.deleteObjectList.push(barrier)
        }
      }

      for (let obj of this.deleteObjectList) {
        this.barrierContainer.removeChild(<GameObject>obj)
        this.gameObjectList.splice(this.gameObjectList.indexOf(<GameObject>obj), 1)
      }
      this.deleteObjectList.length = 0
    }
  }

  private rectangle(x, y, w, h): egret.Rectangle {
    return new egret.Rectangle(x, y, w, h)
  }
  private isRectangle(obj): egret.Rectangle {
    return new egret.Rectangle(obj.x, obj.y, obj.width, obj.height)
  }


  private addElements() {
    // 获取障碍物配置 永远是获取第一个，因为创建后会删除，所有第一个数据就是要下个要创建的数据
    let element: ElementData = GameData.elements[0]
    // 当你走过的距离达到障碍物坐标距离 将创建，通过第一轮，也就是走了5000米
    //console.log(GameData.distance, element.distance, GameData.rounds, GameData.maxMileage)
    if (element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage) {
      if (element.type === 'wall') {
        let barrier = new Barrier(element)
        barrier.x = this.stage.stageWidth
        this.barrierContainer.addChild(barrier)
        this.gameObjectList.push(barrier)
      }
      if (element.type === 'egg') {
        let egg = new Egg(element)
        // x 就是出现到页面的末端
        egg.x = this.stage.stageWidth
        egg.y = element.y
        this.barrierContainer.addChild(egg)
        this.gameObjectList.push(egg)
      }
      GameData.elements.splice(0, 1)
      // 表示已走完了一轮
      if (GameData.elements.length <= 0) {
        GameData.elements = GameData.elements.concat(RES.getRes('config_json').elements)
        GameData.rounds++
      }
    }
  }
}

interface ElementData {
  type: string,
  distance: number,
  y: number
}