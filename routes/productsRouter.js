const Router = require('@koa/router');
const { productReadById, productRead } = require('../controller/read');
const { createProduct } = require('../controller/create');

const productsRouter = new Router({prefix: '/products'});



productsRouter.get('/', async (ctx) => {
    ctx.body = await productRead();
});

productsRouter.get('/:id', async (ctx) => {
    const product = await productReadById(ctx.params.id);
    if (product){
        ctx.body = product;
    } else {
        ctx.status = 404;
    }
});

productsRouter.post('/', async (ctx) => {
    const productData = ctx.request.body;
    const product = await createProduct(productData);
    ctx.body = product;

});

module.exports = productsRouter;

