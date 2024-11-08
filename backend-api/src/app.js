const express = require('express');
const cors = require('cors');
const session = require('express-session');

const JSend = require('./jsend');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/error-controller');
const { specs, swaggerUi } = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'B2111933-B2111952',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

app.get('/api/v1', (req, res) => {
    const cartId = req.session.cartId;
    res.json(JSend.success({ cartId }));
});

app.get('/api/v1/clear', (req, res) => {
    req.session.cartId = 0;
    const cartId = req.session.cartId;
    res.json(JSend.success({ cartId }));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/public', express.static('public'));

productRouter.setup(app);
cartRouter.setup(app);
//404 res
app.use(resourceNotFound);
// Define error-handling middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;