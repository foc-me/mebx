import KeyMap from '../keyMap/index'
import { Observer } from '../observable/index'
import { autoRunType } from '../autoRun/index'

class Common {
  private _AUTORUN_KEY_: string = ''
  public autoRuns: KeyMap<autoRunType>
  public observers: KeyMap<Observer<any>>
  constructor() {
    this.autoRuns = new KeyMap()
    this.observers = new KeyMap()
  }

  set autoRunKey(value: string) {
    this._AUTORUN_KEY_ = value
  }
  get autoRunKey(): string {
    return this._AUTORUN_KEY_
  }
  public clearAutoRunKey(): void {
    this._AUTORUN_KEY_ = ''
  }
}

export default new Common()