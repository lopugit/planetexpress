// when using Vue Router "history" mode
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = 7788+1


const app = express()

app.use(history())
app.use(serveStatic('./dist/spa-mat'))
console.log(`Listening on http://localhost:${port}`)
app.listen(port)
