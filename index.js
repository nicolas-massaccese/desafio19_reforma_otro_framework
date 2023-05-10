const Koa = require('koa');
const { koaBody } = require('koa-body');
const productsRouter = require('./routes/productsRouter')

//  inizialization
const app = new Koa();
const { connectToDb } = require('./config/database.js');
require('./config/auth.js');

// middlewares
app.use(koaBody());

// routes
app.use(productsRouter.routes());

// starting server
connectToDb()
    .then(() => app.listen(3000, () => console.log('Ready!')))
    .catch((error) => console.error(error));