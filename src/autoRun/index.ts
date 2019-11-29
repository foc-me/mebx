import common from '../common/index'
import { debounce, throttle } from '../utils/index'

enum OptionType {
  debounce,
  throttle
}
type autoRunOptionType = {
  delay: number,
  type?: OptionType
}
type autoRunType = [() => any, autoRunOptionType]

const defaultAutoRunOption = { delay: 0, type: OptionType.debounce }

function autoRun(fn: () => any, opt: autoRunOptionType = defaultAutoRunOption): () => boolean {
  if (common.autoRunKey) throw new Error('another autoRun is running ?')
  common.autoRunKey = common.autoRuns.add([actionCover(fn, opt), opt])
  let key = common.autoRunKey
  fn()
  common.clearAutoRunKey()
  return function() {
    let res = false
    if (key) res = common.autoRuns.delete(key)
    return res
  }
}
autoRun.OptionType = OptionType

function getAction(type?: OptionType): (...p: any) => any {
  console.log('~~~~~~~~~~~', type == OptionType.throttle)
  switch (type) {
    case OptionType.throttle: return throttle
    default: return debounce
  }
}
function actionCover(fn: () => any, opt: autoRunOptionType): () => any {
  const { delay, type } = opt
  let action = getAction(type)
  return action(fn, delay)
}

function runAction(key: string): void {
  if (!common.autoRuns.has(key)) return
  const [fn] = common.autoRuns.get(key)
  if (!fn) return
  fn()
}

export { autoRunType, OptionType, runAction }
export default autoRun