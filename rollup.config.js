import common from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [{ file: 'dist/system-server.js', format: 'cjs' }],
  external: Object.keys(pkg.dependencies),
  plugins: [
    common({
      includes: 'node_modules/**'
    })
  ]
}
