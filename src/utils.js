export function isElectron() {
  const userAgent = navigator.userAgent.toLowerCase()
  return (userAgent.indexOf(' electron/') > -1)
}

export function getSketchFilesElectron(path) {
  if (!isElectron()) {
    return
  }

  // window.require is only defined for electron
  const {remote} = window.require('electron')
  const electronFs = remote.require('fs')
  const sketchFiles = {}

  const files = electronFs.readdirSync(path)

  files.forEach(file => {
    debugger
    const extension = file.split('.').pop()

    if (extension === 'sketch') {
      const filePath = path + '/' + file
      sketchFiles[filePath] = file
    }
  }, this)

  return sketchFiles
}

export function getSketchFiles(files) {
  const sketchFiles = {}

  files.forEach(file => {
    const extension = file.name.split('.').pop()

    if (extension === 'sketch') {
      sketchFiles[file.webkitRelativePath] = file
    }
  }, this)

  return sketchFiles
}
