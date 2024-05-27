const Product = require('../models/Product')

module.exports = class ProductsController {
    static showProducts(req, res){
        res.render('products/all')
    }
}

