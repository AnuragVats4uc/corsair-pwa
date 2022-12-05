/* eslint-disable */
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

try {
    if (fs.existsSync('./https_cert/localhost-key.pem') && fs.existsSync('./https_cert/localhost.pem')) {
        // You need to generate these files using this:
        // https://web.dev/how-to-use-local-https/#using-mkcert:-cheatsheet
        // Use `localhost` as the argument
        // After generating them, copy the files into ./https_cert (which is ignored by gitignore)
        const httpsOptions = {
            key: fs.readFileSync('./https_cert/localhost-key.pem'),
            cert: fs.readFileSync('./https_cert/localhost.pem')
        }

        app.prepare().then(() => {
            createServer(httpsOptions, (req, res) => {
                const parsedUrl = parse(req.url, true)
                handle(req, res, parsedUrl)
            }).listen(port, (err) => {
                if (err) throw err
                console.log(
                    'ready - started server on url: https://localhost:' + port
                )
            })
        })
    } else {
        console.log('\x1b[31m%s\x1b[0m', "You are missing the certification files for HTTPS. See https-server.js comments for more info.")
    }
} catch (err) {
    console.log("Check if you have created the certification files for HTTPS. See https-server.js comments for more info.")
    console.error(err)
}
