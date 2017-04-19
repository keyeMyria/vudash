'use strict'

const WidgetBuilder = require('./widget.builder')

class DashboardBuilder {

  constructor () {
    this.overrides = {
      widgets: []
    }
  }

  withName (name = 'Some Dashboard') {
    this.overrides.name = name
    return this
  }

  addPlugin (moduleName, options) {
    this.overrides.plugins = this.plugins || {}
    this.overrides.plugins[moduleName] = {
      module: moduleName,
      options
    }
    return this
  }

  addWidget (widget = WidgetBuilder.create().build()) {
    this.overrides.widgets.push(widget)
    return this
  }

  addAsset (kind, url) {
    this.overrides.assets = this.overrides.assets || {}
    this.overrides.assets[kind] = this.overrides.assets[kind] || []
    this.overrides.assets[kind].push(url)
    return this
  }

  addJsAsset (url) {
    return this.addAsset('js', url)
  }

  addCssAsset (url) {
    return this.addAsset('css', url)
  }

  build () {
    return Object.assign({}, {
      layout: {
        rows: 4,
        columns: 5
      }
    }, this.overrides)
  }
}

module.exports = {
  create: () => { return new DashboardBuilder() }
}