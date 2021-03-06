import { readFile, readFileSync } from 'fs'
import { promisify } from 'util'
import { parse } from 'yaml'

import Loader, { LoaderDescription } from '../Loader'

/**
 * Loader implementation.
 */
class LoaderImplementation implements Loader {
  public load(fileName: string) {
    return parse(readFileSync(fileName, { encoding: 'utf8' }))
  }

  public async asyncLoad(fileName: string) {
    const content = await promisify(readFile)(fileName, { encoding: 'utf8' })
    return parse(content)
  }
}

/**
 * Loader description.
 */
const description: LoaderDescription = {
  filetypes: ['yml', 'yaml'],
  Loader: LoaderImplementation,
}
export default description
