const router = require('koa-router')()
const os = require('os')
const ejs = require('ejs')
const readline = require('readline')
const fs = require('fs')

router.prefix('/node')

router.post('/getjson', async (ctx, next) => {
  let content = ctx.request.body.content
  const i = content.indexOf('{')
  const j = content.indexOf('}')
  content = content.substring(i + 1, j)
  content = content.replace(/<\/?.+?>/g, "");
  content = content.replace(/[\r\n]/g, "");
  let arr = content.split(',')
  let c = []
  arr.forEach((v) => {
    if (v.split(':').length === 2) {
      let value = ''
      let k = {}
      if (v.split(':')[1] === '\'\'' || v.split(':')[1] === '\"\"') {
        value = ''
      } else {
        value = v.split(':')[1].replace(/'/g, '').replace(/"/g, '')
      }
      k.name = v.split(':')[0].trim()
      k.value = value.trim()
      c.push(k)
    }
  })
  ctx.body = {
    content: c,
    status: 200
  }
})


router.post('/generate', async (ctx, next) => {
  let a;
  ejs.renderFile('views/template.ejs', {datas: ctx.request.body}, (err, str) => {
    a = str;
  })

  let b;
  ejs.renderFile('views/es.ejs', {datas: ctx.request.body}, (err, str) => {
    b = str;
  })
  ctx.body = {
    template: a,
    es: b,
    status: 200
  }
})

router.post('/generateTable', async (ctx, next) => {

})


router.post('/resolve', async (ctx, next) => {
  let fieldArr = await resolveFile(ctx)
  ctx.body = {
    data: fieldArr,
    status: 200
  }
})

function resolveFile(ctx) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(ctx.request.files.file.path),
      crlfDelay: Infinity
    });

    const fieldArr = [];
    rl.on('line', (line) => {
      if (line.indexOf('private') !== -1 && line.indexOf('=') === -1) {
        const arr = line.trim().split(' ')
        arr.forEach((v, i) => {
          if (!v || v === ';') {
            arr.splice(i, 1)
          }
        })
        let str = arr[arr.length - 1]
        if (str.indexOf(';') && str.length > 1) {
          str = str.substring(0, str.length - 1)
        }
        fieldArr.push(str)
      }
    });

    rl.on('close', () => {
      resolve(fieldArr)
    })
  })
}

module.exports = router
