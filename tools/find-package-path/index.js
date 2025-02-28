const fs = require('fs')
const path = require('path')

function findPackagePath(name) {
  if (!name) {
    throw new Error('параметр name обязательный: name' )
  }

  const rootPath = path.resolve(__dirname, '../..')

  let modulePath = null

  const packageJson = fs.readFileSync(path.join(rootPath, 'package.json'))
  JSON.parse(packageJson).workspaces.forEach((p) => {
    const dirPath = path.join(rootPath, p.replace('*', ''))
    const dirNames = fs.readdirSync(dirPath)
    for (dir of dirNames) {
      try {
        if (fs.statSync(path.join(dirPath, dir)).isDirectory()) {
          const packageJson = fs.readFileSync(path.join(dirPath, dir, 'package.json'))

          if (JSON.parse(packageJson).name === name) {
            modulePath = path.join(dirPath, dir)
          }
        }
      } catch (e) {
      }
    }
  })

  return modulePath
}

module.exports = findPackagePath
