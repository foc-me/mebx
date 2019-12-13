function parseJson(str: string, def?: object): any {
  let res: any
  try {
    res = JSON.parse(str)
  } catch {
    res = def
  } finally {
    return res
  }
}

function debounce(fn: () => any, delay: number): () => any {
  if (delay <= 0) return fn
  let statu = false
  return function() {
    if (!statu) {
      fn()
      statu = true
      window.setTimeout(() => {
        statu = false
      }, delay)
    }
  }
}

function throttle(fn: () => any, delay: number): () => any {
  if (delay <= 0) return fn
  let t: number
  return function() {
    if (t) clearTimeout(t)
    t = window.setTimeout(() => {
      fn()
    }, delay)
  }
}

export { parseJson, debounce, throttle }