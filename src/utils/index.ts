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

export { parseJson }