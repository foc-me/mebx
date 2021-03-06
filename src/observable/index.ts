import KeyMap from '../keyMap/index'
import common from '../common/index'
import { runAction } from '../autoRun/index'

type targetKeyType = string | number | symbol

class Observer<T extends object> {
  // private autoRuns: KeyMap<() => void>
  private indexMap: KeyMap<string[]>
  public target: T
  constructor(target: T) {
    this.target = new Proxy(target, {
      set: this.handler_set.bind(this),
      get: this.handler_get.bind(this)
    })
    // this.autoRuns = new KeyMap()
    this.indexMap = new KeyMap()
  }

  private handler_set(target: any, name: targetKeyType, value: any): boolean {
    if (common.autoRunKey) throw new Error('do not set value to a observable object in autoRun functions')
    const key = name.toString()
    target[name] = value
    if (this.indexMap.has(key)) {
      this.indexMap.get(key).forEach(runAction)
    }
    return true
  }
  private handler_get(target: any, name: targetKeyType): any {
    const key = name.toString()
    if (common.autoRunKey) {
      if (this.indexMap.has(key)) {
        const keys = this.indexMap.get(key)
        if (!keys.includes(common.autoRunKey)) keys.push(common.autoRunKey)
      }
      else this.indexMap.add([common.autoRunKey], key)
    }
    return target[name]
  }
}

// object observable
function observable<T extends object>(target: T): T {
  let observer = new Observer(target)
  return observer.target
}

export { Observer }
export default observable