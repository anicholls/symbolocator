import sketch2json from 'sketch2json';

function parseSketch(symbolName, result) {
  let symbols;
  let detected = false

  for (var id in result.pages) {
    let page = result.pages[id]

    if (page.name === 'Symbols') {
      symbols = page
      break
    }
  }

  for (var artboard of symbols.layers) {
    if (artboard.name === symbolName) {
      detected = true
    }
  }

  if (detected) {
    return true
  }

  return false
}

function detectSymbol(file, symbolName, detectedCb) {

  if (typeof window.FileReader !== 'function') {
    throw new Error('The file API isn\'t supported on this browser yet.');
  }

  var reader = new FileReader();

  reader.onload = function(e) {
    const data = reader.result

    sketch2json(data)
      .then(parseSketch.bind(data, symbolName))
      .then(detected => {
        if (detected && detectedCb) {
          detectedCb(file)
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  reader.readAsArrayBuffer(file)
}

export default detectSymbol;
