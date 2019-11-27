import common from '../common/index'

function autoRun(fn: () => void): () => boolean {
  if (common.autoRunKey) throw new Error('another autoRun is running ?')
  common.autoRunKey = common.autoRuns.add(fn)
  let key = common.autoRunKey
  fn()
  common.clearAutoRunKey()
  return function() {
    let res = false
    if (key) res = common.autoRuns.delete(key)
    return res
  }
}

export default autoRun