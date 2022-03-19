function exportJson(el, obj: object, filename: string) {
  console.log(el)
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj))
  // what to return in order to show download window?

  el.setAttribute("href", "data:" + data)
  el.setAttribute("download", `${filename}.json`)
}

export default exportJson
