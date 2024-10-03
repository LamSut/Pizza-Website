const knex = require('../database/knex');
function productRepository() {
    return knex('product');
}
function readProduct(payload) {
    return {
        name: payload.name,
        type: payload.type,
        description: payload.description,
        price: payload.price,
        image: payload.image,
    };
}

const Paginator = require('./paginator');
async function getProducts(query) {
    const { name, type, page = 1, limit = 6 } = query;
    const paginator = new Paginator(page, limit);
    let results = await productRepository()
        .where((builder) => {
            if (name) {
                builder.where('name', 'like', `%${name}%`);
            }
            if (type && type !== '0' && type !== 'false') {
                builder.where('type', 'in', [type]);
            }
        })
        .select(
            knex.raw('count(product_id) OVER() AS recordCount'),
            'product_id',
            'name',
            'type',
            'description',
            'price',
            'image'
        )
        .limit(paginator.limit)
        .offset(paginator.offset);
    let totalRecords = 0;
    results = results.map((result) => {
        totalRecords = result.recordCount;
        delete result.recordCount;
        return result;
    });
    return {
        metadata: paginator.getMetadata(totalRecords),
        products: results,
    };
}

// Define functions for accessing the database
module.exports = {
    getProducts
}