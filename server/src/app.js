const express = require('express')
const helmet = require('helmet')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
const Datastore = require('nedb')

// Using an in-memory db to store file references
const db = new Datastore()
const app = express()

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || '../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

app.use(helmet())
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // max-size 5MB
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true
  })
)

app.get('/files/:filename?', (req, res) => {
  if (req.params.filename) {
    return db.findOne({ filename: req.params.filename }, (err, doc) => {
      if (err) return res.status(500).send(err)
      if (!doc) return res.status(404).send('Not found')
      res.sendFile(path.join(uploadDir, doc.filename))
    })
  }

  db.find({}, (err, docs) => {
    if (err) return res.status(500).send(err)
    res.json(docs)
  })
})

app.delete('/files/:filename', (req, res) => {
  db.remove({ filename: req.params.filename }, {}, err => {
    if (err) return res.status(500).send(err)
    res.sendStatus(204)
  })
})

app.post('/upload', (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.')

  const file = req.files.upload
  const filename = `${uuidv4()}${path.extname(file.name)}`

  file.mv(path.join(uploadDir, filename), err => {
    if (err) return res.status(500).send(err)

    const doc = {
      filename,
      originalName: file.name,
      size: file.data.byteLength / 1024 // size in kb
    }

    db.insert(doc, (err, newDoc) => {
      if (err) return res.status(500).send(err)
      res.json(newDoc)
    })
  })
})

module.exports = app
