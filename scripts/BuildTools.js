import ejs from 'ejs'
import fs from 'fs-extra'
import {exec} from 'child_process'

export default class BuildTools {
  constructor(pagesDir, dataDir, buildDir, stylesDir, assetsDir, jsDir) {
    // TODO: simplify dirs
    this.pagesDir = pagesDir
    this.dataDir = dataDir
    this.buildDir = buildDir
    this.stylesDir = stylesDir
    this.assetsDir = assetsDir
    this.jsDir = jsDir
  }

  /**
   * Delete current build and create new build directory
   */
  clean() {
    fs.rmSync(this.buildDir, {recursive: true, force: true})
    fs.mkdirSync(this.buildDir, {recursive: true, force: true})
  }

  /**
   * Render all Sass files recursively
   */
  renderStyles() {
    console.log('Starting styles render...')
    exec(`sass ${this.stylesDir}:${this.buildDir}/css`, (err, stdout, stderr) => {
      if (err) throw err
      if (stderr) throw stderr
      console.log(stdout)
      console.log('Rendered all styles.')
    })
  }

  /**
   * Render all assets
   */
  renderAssets() {
    fs.copy(this.assetsDir, `${this.buildDir}/assets`)
      .then(() => console.log('All assets complete.'))
      .catch(err => console.error(err))
  }

  /**
   * Render all javascript
   */
  renderJS() {
    fs.copy(this.jsDir, `${this.buildDir}/js`)
      .then(() => console.log('All JS complete.'))
      .catch(err => console.error(err))
  }

  /**
   * Find data file based on name
   *
   * @param  {string} filename The name of the data file you want to find
   * @return {object}          Returns data object or empty object if no data found
   *
   */
  getData(filename) {
    let dataPath = `${this.dataDir}/${filename}.json`
    if (fs.existsSync(dataPath)) {
      let json = fs.readFileSync(dataPath, 'utf8')
      return JSON.parse(json)
    } else {
      return {}
    }
  }

  /**
   * Render an EJS file with data
   *
   * @param {string} filename EJS template file
   * @param {object} data     Data object or empty object for no data
   *
   */
  renderFile(filename, data) {
    // Render EJS template
    ejs.renderFile(`${this.pagesDir}/${filename}.ejs`, data, (err, html) => {
      if (err) throw err

      // Write HTML file
      fs.writeFile(`${this.buildDir}/${filename}.html`, html, err => {
        if (err) throw err
        console.log(`Rendered: ${filename}`)
      })
    })
  }

  /**
   * Render an EJS template for every item in JSON list
   *
   * @param {string} template EJS template filepath
   * @param {object} json     JSON filepath
   * @param {string} key      Which key to iterate over
   * @param {string} keyname  Which key has the item name
   *
   */
  renderList(template, json, key, keyname) {
    let data = JSON.parse(fs.readFileSync(json, 'utf8'))

    for (let item of data[key]) {
      ejs.renderFile(template, item, (err, html) => {
        if (err) throw err

        // Write HTML file
        fs.writeFile(`${this.buildDir}/${item[keyname]}.html`, html, err => {
          if (err) throw err
          console.log(`Rendered: ${item[keyname]}`)
        })
      })
    }
  }
}
