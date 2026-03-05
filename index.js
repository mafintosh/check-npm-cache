#!/usr/bin/env node

const Localdrive = require('localdrive')
const fs = require('fs')
const os = require('os')

const home = os.homedir()

check(process.argv.slice(2))

async function check(names) {
  const d = new Localdrive(`${home}/.npm`)

  for await (const data of d.list()) {
    if (data.key.indexOf('content') === -1) continue
    const buf = await d.get(data.key)
    try {
      const pkg = JSON.parse(buf)
      if (names.includes(pkg.name) && pkg.version) {
        console.log(pkg.name, pkg.version, new Date(data.mtime), data.key)
      }
    } catch {}
  }
}
