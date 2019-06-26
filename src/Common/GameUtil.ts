class GameUtil {

  static createButton(text: string): egret.DisplayObjectContainer {
    let button = new egret.DisplayObjectContainer()
    let button_bg = createBitmapByName('button_png')
    let textField = this.createText(text)
    button.addChild(button_bg)
    button.addChild(textField)
    textField.x = button_bg.width / 2
    textField.y = button_bg.height / 2
    button.touchEnabled = true
    button.touchChildren = false
    button.anchorOffsetX = button_bg.width / 2
    button.anchorOffsetY = button_bg.height / 2
    return button
  }

  static createText(text: string): eui.Label {
    let textField = new eui.Label()
    textField.text = text
    textField.size = 50
    textField.anchorOffsetX = textField.width / 2;
    textField.anchorOffsetY = textField.height / 2;
    return textField
  }
}
