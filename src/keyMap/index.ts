type keyMapList<T> = { [index: string]: T }

class KeyMap<T> {
  private list: keyMapList<T>
  public length: number
  constructor() {
    this.list = {}
    this.length = 0
  }

  private getLenth() {
    this.length = Object.keys(this.list || {}).length
  }
  public has(key: string): boolean {
    return key in (this.list || {})
  }
  public add(target: T, key?: string): string {
    if (!target) return ''
    key = key || `${this.length}_fun_key`
    if (this.list) this.list[key] = target
    else this.list = { [key]: target }
    this.getLenth()
    return key
  }
  public get(key: string): T {
    return this.list[key]
  }
  public delete(key: string): boolean {
    if (this.list && this.has(key)) delete this.list[key]
    this.getLenth()
    return true
  }
}

export default KeyMap