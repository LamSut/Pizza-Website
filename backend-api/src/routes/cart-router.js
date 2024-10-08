const express = require('express');
const multer = require('multer');
const cartController = require('../controllers/cart-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    /**
     * @swagger
     * /api/v1/cart:
     *   post:
     *     summary: Create a new cart
     *     description: Create a new cart
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: cart name
     *               phone:
     *                 type: string
     *                 description: phone number
     *               address:
     *                 type: string
     *                 description: address
     *     tags:
     *       - cart
     *     responses:
     *       201:
     *         description: A new cart
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: The response status
     *                   enum: [success]
     *                 data:
     *                   type: object
     *                   properties:
     *                     cart:
     *                       $ref: '#/components/schemas/Cart'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.post('/', upload.none(), cartController.createCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   get:
     *     summary: Get cart by ID
     *     description: Get cart by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - cart
     *     responses:
     *       200:
     *         description: A cart
     *         $ref: '#/components/responses/200Cart'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/:cartId', cartController.getCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   put:
     *     summary: Update cart by ID
     *     description: Update cart by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: cart name
     *               phone:
     *                 type: string
     *                 description: phone number
     *               address:
     *                 type: string
     *                 description: address
     *     tags:
     *       - cart
     *     responses:
     *       200:
     *         description: An updated cart
     *         $ref: '#/components/responses/200Cart'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.put('/:cartId', upload.none(), cartController.updateCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   delete:
     *     summary: Delete cart by ID
     *     description: Delete cart by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - cart
     *     responses:
     *       200:
     *         description: Cart deleted
     *         $ref: '#/components/responses/200NoData'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.delete('/:cartId', cartController.deleteCart);

    router.all('/', methodNotAllowed);
    router.all('/:cartId', methodNotAllowed);
}