import KeyMap from '../keyMap/index'
import common from '../common/index'

type targetKeyType = string | number | symbol

class Observer {
  // private autoRuns: KeyMap<() => void>
  private indexMap: KeyMap<string[]>
  public target: object
  constructor(target: object) {
    this.target = new Proxy(target, {
      set: this.handler_set.bind(this),
      get: this.handler_get.bind(this)
    })
    // this.autoRuns = new KeyMap()
    this.indexMap = new KeyMap()
  }

  private handler_set(target: any, name: targetKeyType, value: any): boolean {
    const key = name.toString()
    target[name] = value
    if (this.indexMap.has(key)) {
      this.indexMap.get(key).forEach(index => {
        const fn = common.autoRuns.get(index)
        if (fn) fn()
      })
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
function observable(target: object): object {
  let observer = new Observer(target)
  return observer.target
}

export { Observer }
export default observable