const conn = require('../db/conn')

const {ObjectId} = require('mongodb')

class Product {
    constructor(name, image, price, description){
        this.name = name,
        this.image = image
        this.price = price,
        this.description = description
    }

    save(){
        const product = conn.db().collection('products').insertOne({
            name: this.name, 
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product
    }

    static async getProducts() {
       const products = await conn.db().collection('products').find().toArray()

        return products
    }

    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({_id: new ObjectId(id)})

        return product
    }

    static async removeProduct(id){
        await conn.db().collection('products').deleteOne({_id: new ObjectId(id)})

        return
    }
 /*
    Meu metodo
    static async editProductById(id, name, image, price, description){
        await conn.db().collection('products').updateOne({_id: new ObjectId(id)}, {$set: {name: name, image: image, price: price, description: description}})

        return
    }
*/
    // metodo recebendo objeto
    updateProduct(id){
        conn.db().collection('products').updateOne({_id: new ObjectId(id)}, {$set: this})

        return
    }    
}

module.exports = Product