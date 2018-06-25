const tmp = require('tmp')
const fs = require('fs')
const path = require('path')
const request = require('supertest')
const app = require('./app')

let tmpFile

beforeEach(() => {
  tmpFile = tmp.fileSync({ postfix: '.txt' })
  fs.writeSync(tmpFile.fd, 'Hello World')
})

afterEach(() => {
  tmpFile.removeCallback()
})

describe('/', () => {
  test('Should return with 404', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(404)
  })
})

describe('/files', () => {
  test('Should return the list of files', async () => {
    await request(app)
      .post('/upload')
      .attach('upload', tmpFile.name)
    const response = await request(app).get('/files')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
  })
})

describe('/files/:filename', () => {
  test('Should return the file by filename param', async () => {
    const upload = await request(app)
      .post('/upload')
      .attach('upload', tmpFile.name)
    const { size } = fs.fstatSync(tmpFile.fd)
    const response = await request(app).get(`/files/${upload.body.filename}`)
    expect(response.statusCode).toBe(200)
    expect(response.get('Content-Type')).toBe('text/plain; charset=UTF-8')
    expect(response.get('Content-Length')).toBe(size.toString())
  })
})

describe('/upload', () => {
  test('Should upload the file', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('upload', tmpFile.name)
    expect(response.statusCode).toBe(200)
    expect(response.body.originalName).toBe(path.basename(tmpFile.name))
  })

  test('Should throw an error (400) if no file', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('upload', '')
    expect(response.statusCode).toBe(400)
  })

  test('Should throw an error if file size > 5MB', async () => {
    fs.writeSync(tmpFile.fd, Buffer.alloc(6 * 1024 * 1024))

    const response = await request(app)
      .post('/upload')
      .attach('upload', tmpFile.name)
    expect(response.statusCode).toBe(413)
  })
})
