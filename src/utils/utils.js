import sketch2json from 'sketch2json'

// hack for electron fs & path
const {remote} = window.require('electron')
const fs = remote.require('fs')
const path = remote.require('path')

export function isElectron() {
  const userAgent = navigator.userAgent.toLowerCase()
  return (userAgent.indexOf(' electron/') > -1)
}

export function isSketchFile(path) {
  const extension = path.split('.').pop()
  return (extension === 'sketch')
}

// Recursively get the path of all the files in a folder
export function getSketchFilesFromDir(dir) {
  return fs.readdirSync(dir).reduce((files, file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      return files.concat(getSketchFilesFromDir(path.join(dir, file)))
    }
    else if (isSketchFile(file)) {
      return files.concat(path.join(dir, file))
    }
    else {
      return files
    }
  }, [])
}

export function detectSymbolInFiles(symbolName, files, callback) {
  files.map(path => {
    return fs.readFile(path, (error, sketch) => {
      if (error) {
        console.log(error)
      }

      sketch2json(sketch)
        .then(detectSymbol.bind(sketch, symbolName))
        .then(detected => {
          callback(path, detected)
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
}

function detectSymbol(symbolName, sketch) {
  if (!sketch) {
    return false
  }

  let symbols;
  let detected = false

  for (var id in sketch.pages) {
    let page = sketch.pages[id]

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
