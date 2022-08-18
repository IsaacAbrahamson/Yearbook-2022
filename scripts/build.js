import fs from 'fs-extra'
import path from 'path'
import {fileURLToPath} from 'url'
import {dirname} from 'path'
import BuildTools from './BuildTools.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pagesDir = path.join(__dirname, '../src/views/pages')
const subgroupsDir = path.join(__dirname, '../src/views/subgroups')
const dataDir = path.join(__dirname, '../src/data')
const buildDir = path.join(__dirname, '../public')
const stylesDir = path.join(__dirname, '../src/sass')
const assetsDir = path.join(__dirname, '../src/assets')
const jsDir = path.join(__dirname, '../src/js')

const builder = new BuildTools(pagesDir, dataDir, buildDir, stylesDir, assetsDir, jsDir)

// Renders Index, Events, Groups, Societies, and all other basic pages
function renderPages() {
  fs.readdir(pagesDir, (err, files) => {
    if (err) throw err
    for (let file of files) {
      let filename = path.basename(file, '.ejs')
      let data = builder.getData(filename)
      builder.renderFile(filename, data)
    }
  })
}

function renderSubgroups() {
  const template = `${subgroupsDir}/subgroups.ejs`
  const key = 'groups'
  const keyname = 'name'

  builder.renderList(template, `${dataDir}/groups.json`, key, keyname)
}

function renderSubsocieties() {
  const template = `${subgroupsDir}/subsocieties.ejs`
  const key = 'groups'
  const keyname = 'name'

  builder.renderList(template, `${dataDir}/societies.json`, key, keyname)
}

function renderGroupDetails() {
  const subgroupDir = `${dataDir}/subgroups`
  const template = `${subgroupsDir}/group-detail.ejs`
  const key = 'subgroups'
  const keyname = 'name'

  fs.readdir(subgroupDir, (err, files) => {
    if (err) throw err
    for (let file of files) {
      let filepath = `${subgroupDir}/${file}`
      builder.renderList(template, filepath, key, keyname)
    }
  })
}

function renderSocietyDetails() {
  const subgroupDir = `${dataDir}/subsocieties`
  const template = `${subgroupsDir}/society-detail.ejs`
  const key = 'subgroups'
  const keyname = 'name'

  fs.readdir(subgroupDir, (err, files) => {
    if (err) throw err
    for (let file of files) {
      let filepath = `${subgroupDir}/${file}`
      builder.renderList(template, filepath, key, keyname)
    }
  })
}

builder.clean()
renderPages()
renderSubgroups()
renderSubsocieties()
renderGroupDetails()
renderSocietyDetails()
builder.renderStyles()
builder.renderAssets()
builder.renderJS()
