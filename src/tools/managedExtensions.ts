import { writeFileSync } from 'fs'
import { resolve } from 'path'

// eslint-disable-next-line import/no-internal-modules
import { extensionsLoaders, loaderDescriptions } from '../Loader/loaders'

if (process.argv.length !== 3) {
  throw new Error('Incorrect argument count — expected only the target file')
}
const fileName = resolve(process.argv[2])

function formatModuleName(module: string | undefined): string {
  let moduleItems = (module ?? '').split('/')
  moduleItems = moduleItems.slice(0, moduleItems[0].startsWith('@') ? 2 : 1)
  return moduleItems.join('/')
}

const extensions = Object.keys(extensionsLoaders).sort()
const descriptionNames = Object.keys(loaderDescriptions)
const rowSeparator = '\n    </tr>\n    <tr>\n      '
const text =
  `# Extensions

This file is automatically generated. Do not edit.

<table>
  <thead>
    <tr>
      <th>Extension</th>
      <th>Loader</th>
      <th>Module</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      ` +
  extensions
    .map(
      key =>
        `<td rowspan=${extensionsLoaders[key].length}>.${key}</td>` +
        [...extensionsLoaders[key]]
          .sort()
          .map(name => `<td>${name}</td><td>${formatModuleName(loaderDescriptions[name].module)}</td>`)
          .join(rowSeparator)
    )
    .join(rowSeparator) +
  `
    </tr>
  </tbody>
</table>`

writeFileSync(fileName, text)
// eslint-disable-next-line no-console
console.log(`Written ${extensions.length} extensions for ${descriptionNames.length} loaders to ${fileName}`)
