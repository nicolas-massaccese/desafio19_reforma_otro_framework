# DESAFIO 19 REFORMAR CON OTRO FRAMEWORK
=============

## Iniciación

Iniciamos la app con el siguiente comando:

 `node index.js` 


## Funcionamiento

Elegi **KOA** como framework en reemplazo de **EXPRESS**
dentro de  **index.js** esta instanciado  **KOA** importado productsRouter y la conección a nuestra base de Datos en Mongo Atlas. 

```
const Koa = require('koa');
const { koaBody } = require('koa-body');
const productsRouter = require('./routes/productsRouter')

//  inizialization
const app = new Koa();
const { connectToDb } = require('./config/database.js');
require('./config/auth.js');

// const {createProduct} = require('./controller/create')

// middlewares
app.use(koaBody());

// routes
app.use(productsRouter.routes());

// starting server
connectToDb()
    .then(() => app.listen(3000, () => console.log('Ready!')))
    .catch((error) => console.error(error));
```

Al iniciar nuestra app e ingresar a la ruta http://localhost:3000/products recibiras el listado completo de productos almacenados en Mongo Atlas llamando ala funcion **productRead()** ubicada en el archivo **read.js**, dentrod ela carpeta **controller**

```
const { Product } = require("../models/product");
const User  = require("../models/user");

// Products Methods
const productRead = async () => {
    const sortedProducts = await Product.find({})
    return sortedProducts;
};
const productReadById = async () => {
    const sortedProducts = await Product.findById({id})
    return sortedProducts;
};
```

Dentro de la carpeta **routes** encontraraás los enpoints requeridos para este desafio.

```
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
```



A esta misma ruta http://localhost:3000/products con postamn mediante el método **POST** se podran guardar nuevos productos en la DB de mongo Atlas ya que en alli llamamos a la funcion **createProduct()** para crear nuevos productos que se encuentra en el archivo **create.js** dentro de la carpeta **controller**

```
const { Product } = require("../models/product");

const createProduct = async(product) => Product.create(product);

module.exports = { createProduct };
```

El schema de productos de referencia lo podrás encontrar en el archivo **product.js** dentro de la carpeta **models**

```
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productsSchema = new Schema( {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    stock: { type: Number, required: true },
})

const Product = model('Product', productsSchema);

module.exports = {Product};
```

También podrás encontrar un producto ingresando por parametros su ID a travez del metodo GET en la ruta
http://localhost:3000/products/:id. Allí ejecutamos la función **productReadById()** ubicada en el archivo **read.js**,
dentro de la carpeta **controller**.