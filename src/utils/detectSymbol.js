import sketch2json from 'sketch2json';

function parseSketch(symbolName, result) {
  if (!result) {
    return false
  }

  let symbols;
  let detected = false

  for (var id in result.pages) {
    let page = result.pages[id]

    if (page.name === 'Symbols') {
      symbols = page
      break
    }
  }

  if (!symbols) {
    return false
  }

  for (var artboard of symbols.layers) {
    if (artboard.name === symbolName) {
      detected = true
    }
  }

  return detected
}

function detectSymbol(file, symbolName, callback) {
  if (typeof window.FileReader !== 'function') {
    throw new Error('The file API isn\'t supported on this browser yet.');
  }

  // Reuse for lots of files
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = reader.result
    console.log('found one');

    // sketch2json doesn't resolve/reject if old-school sketch file
    sketch2json(data)
      .then(data => {
        console.log('parsed one');
      })
      .then(parseSketch.bind(data, symbolName))
      .then(detected => {
        callback(file, detected)
      })
      .catch(err => {
        console.log(err)
      });
  }

  reader.readAsArrayBuffer(file)
}

export default detectSymbol;
