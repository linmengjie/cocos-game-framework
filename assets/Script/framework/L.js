/**
 * 框架文件：本地数据存储类
 * - 注意key不能重复
 * - 注意get函数的返回值，由于游戏引擎原因，均返回string，这里不做类型转换，实际使用过程中需要注意
 */
export default class L {

    /** 封装设置item */
    static set_item(key, value) {
        cc.sys.localStorage.setItem(key, value)
    }

    /** 封装获取item */
    static get_item(key) {
        return cc.sys.localStorage.getItem(key)
    }

    /** 是否初始化 */
    static set is_init(value) { this.set_item("IsInit", value) }
    static get is_init() { return this.get_item("IsInit") }

    /** 音乐 */
    static set music(value) { this.set_item("Music", value) }
    static get music() { return this.get_item("Music") }

    /** 音效 */
    static set sound(value) { this.set_item("Sound", value) }
    static get sound() { return this.get_item("Sound") }

    /** 语言 */
    static set language(value) { this.set_item("Language", value) }
    static get language() { return this.get_item("Language") }

    //////////
    // 下面的内容需要添加每个游戏自身的本地存储；注意使用static方法
    //////////
}
