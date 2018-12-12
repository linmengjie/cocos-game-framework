import { L } from "./L";
import { MRes } from "./MRes";

const { ccclass, property } = cc._decorator;

/** 声音类别：音乐/音效 */
enum TYPE { MUSIC, EFFECT }
/** 声音具体区分名称 */
enum SOUND { test_music, test_effect }
const C = {
    PATH: 'sound',
}

/**
 * [framework-M] 声音管理
 * - 保存已经载入的声音，cc.AudioClip
 * - 保存已经播放的声音id
 * - 实现对音乐（唯一、循环）和音效（多个、单次）的统一API（play、stop）的播放管理
 */
@ccclass
export class MSound extends cc.Component {

    static ins: MSound

    onLoad() {
        MSound.ins = this

        this.init_data()
    }

    /** 与SOUND一一对应的具体声音信息 */
    array_sound_info: SoundInfo[] = []

    /** 初始化声音数据 */
    init_data() {
        this.array_sound_info[SOUND.test_music] = new SoundInfo('test', TYPE.MUSIC, 1)
        this.array_sound_info[SOUND.test_effect] = new SoundInfo('test', TYPE.EFFECT, 1)
    }

    /** 初始化本地存储 */
    static init_l() { L.sound = true }

    /** 获取声音开关 */
    static get_sound_switch() { return L.sound === `${true}` }

    /** 设置声音开关（直接反向） */
    static set_sound_switch() { L.sound = L.sound === `${true}` ? false : true }

    /** 声音的具体区分名称 */
    static get SOUND() { return SOUND }

    /** 播放某一个声音：play/resume */
    static play(sound: SOUND) {
        if (!MSound.get_sound_switch()) { return }
        MSound.ins.array_sound_info[sound].play()
    }

    /** 停止某一个声音：stop/pause */
    static stop(sound: SOUND) {
        MSound.ins.array_sound_info[sound].stop()
    }

    /** 暂停所有声音（现有），主要用于关闭声音，引导界面等 */
    static pause_all() {
        cc.audioEngine.pauseAll()
    }

    /** 继续所有声音 */
    static resume_all() {
        cc.audioEngine.resumeAll()
    }

}

/** 声音信息类 */
class SoundInfo {

    /** 对应的资源url */
    url: string

    /** 声音类型 */
    type: TYPE

    /** 声音音量大小 */
    volume: number

    /** 声音的cc.AudioClip资源 */
    audio_clip: cc.AudioClip

    /** 如果声音播放了，其id */
    id: number

    constructor(url: string, type: TYPE, volume: number, audio_clip: cc.AudioClip = undefined, id: number = undefined) {
        this.url = url
        this.type = type
        this.volume = volume
        this.audio_clip = audio_clip
        this.id = id
    }

    /** 播放 */
    async play() {
        if (this.audio_clip === undefined) {
            this.audio_clip = await MRes.load_res(`${C.PATH}/${this.url}`, cc.AudioClip)
        }
        switch (this.type) {
            case TYPE.MUSIC:
                if (this.id === undefined) {
                    this.id = cc.audioEngine.play(this.audio_clip, true, this.volume)
                } else {
                    cc.audioEngine.resume(this.id)
                }
                break;
            case TYPE.EFFECT:
                cc.audioEngine.play(this.audio_clip, false, this.volume)
                break;
            default: break;
        }
    }

    /** 停止 */
    stop() {
        switch (this.type) {
            case TYPE.MUSIC:
                if (this.id === undefined) { return }
                cc.audioEngine.pause(this.id)
                break;
            case TYPE.EFFECT:
                break;
            default: break;
        }
    }
}