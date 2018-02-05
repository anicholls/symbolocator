
import async from 'async'
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
  // Parse 20 files at once
  async.mapLimit(files, 20, async (path, done) => {
    let chunk
    let chunks = []
    const readStream = fs.createReadStream(path)
    readStream
      .on('readable', () => {
        while ((chunk = readStream.read()) != null) {
          chunks.push(chunk)
        }
      })
      .on('error', err => {
        throw err
      })
      .on('end', () => {
        const data = window.Buffer.concat(chunks)
        sketch2json(data)
          .then(detectSymbol.bind(data, symbolName))
          .then(detected => {
            callback(path, detected)
            done()
          })
          .catch(err => {
            if (err.message.startsWith(
              'Can\'t find end of central directory : is this a zip file')) {
              // TODO: Callback that this is an invalid sketch file (pre 43)
            } else {
              console.log(err)
            }
            callback(path, false)
            done()
          })
      })
    }
  )
}

function detectSymbol(symbolName, sketch) {
  if (!sketch) {
    return false
  }

  let symbols;

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
      return true
    }
  }

  return false
}
