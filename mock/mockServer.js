// const modules: Record<string, any> = import.meta.glob('../mock/**/*.ts', { eager: true })

// const mockModules: any = []

// Object.keys(modules).forEach((key) => {
//   if (key.includes('/_')) {
//     return
//   }
//   if (modules[key].default) {
//     mockModules.push(...modules[key].default)
//   }
// })

// // 或者这样写
// // import sysUser from './system/user'
// // import auth from './auth'
// // const mockModules = [...auth, ...sysUser]

// export function setupMockServer() {
//   createProdMockServer(mockModules)
// }

import http from 'http'
import url from 'url'
import mock from './mock.js'
const mockMap = mock.reduce((p, v) => {
  p[v.method + ':' + v.url] = v
  return p
}, {})

const server = http.createServer((req, resp) => {
  try {
    const requestUrl = url.parse(req.url)
    const requestPath = requestUrl.path
    const requestMethod = req.method
    const mockData = mockMap[requestMethod.toLowerCase() + ':' + requestPath]
    resp.setHeader('Access-Control-Allow-Origin', '*')
    resp.setHeader('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, OPTIONS')
    resp.setHeader('Access-Control-Allow-Headers', '*')
    if (mockData) {
      resp.statusCode = 200
      resp.end(JSON.stringify(mockData.response()))
      console.log(
        `mock data for request: method is ${requestMethod}, request path is ${requestPath}`
      )
    } else {
      resp.statusCode = 200
      resp.end('404 not found')
      console.log(
        `connot found mock data for request: method is ${requestMethod}, request path is ${requestPath}`
      )
    }
  } catch (e) {
    resp.statusCode = 500
    resp.end(JSON.stringify(e))
  }
})
;(async () => {
  server.listen(9000, () => {
    console.log('mock server start up~')
  })
})()
