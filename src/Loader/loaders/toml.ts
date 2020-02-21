import { readFile, readFileSync } from 'fs'
import { promisify } from 'util'

import Loader, { LoaderDescription } from '../Loader'

interface Toml {
  parse(input: string): any
}

/**
 * Loader implementation.
 */
class LoaderImplementation implements Loader {
  public constructor(private readonly toml: Toml) {}

  public load(fileName: string) {
    return this.toml.parse(readFileSync(fileName, { encoding: 'utf8' }))
  }

  public async asyncLoad(fileName: string) {
    const content = await promisify(readFile)(fileName, { encoding: 'utf8' })
    return this.toml.parse(content)
  }
}

/**
 * Loader description.
 */
const description: LoaderDescription = {
  filetypes: 'toml',
  Loader: LoaderImplementation,
  module: 'toml',
}
export default description
