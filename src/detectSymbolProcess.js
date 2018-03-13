const detectSymbolInPath = require('symbolocator-cli')


process.on('message', args => {

  const dir = args[0]
  const symbolName = args[1]
  const deep = args[2]

  const progressCb = results => {
    process.send(results)
  }

  detectSymbolInPath(dir, symbolName, deep, progressCb)
    .then(results => {
      process.send(results)
    })
    .catch(err => { throw err })
})
