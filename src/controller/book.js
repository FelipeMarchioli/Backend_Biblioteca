const env = require('dotenv')
const azure = require('azure-storage');
const guid = require('guid')

const Book = require('../model/book')

class ControllerBook {
    constructor () {
        env.config()
    }

    async getBook (req, res) {
        headquarter = req.params("headquarters");

        let books  = await Book.find();
        
        if (books) {
            return res.status(200).json({
              books
            })
        } else {
            return res.status(500).json({
              success: false,
              message: 'Error ao search book!'
            })
        }
    }

    async createBook(req, res) {
        const data = req.body;

        data.created = new Date();
        data.updated = new Date();
        data._id = new mongoose.Types.ObjectId();

        //Upload imagem Azure
        //Create blob service
        const blobSrv = azure.createBlobService(config.azureConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawData = req.body.cover;
        let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //Save cover on azure
        await blobSrv.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type
        }, function (err, result, response) {
            if (err) {
                filename = 'default-product.png';
            }
        });

        // Save a file name from azure
        data.cover = process.env.AZURE_CONNECTION + filename;

        //Create a new register - BD
        let response  = await Book.create(data);
    
        if (response) {
            return res.status(200).json({
              response
            })
        } else {
            return res.status(500).json({
              success: false,
              message: 'Error search a book!'
            })
        }
    }

    async updateBook(req, res) {
        const data = req.body;

        data.updated = new Date();
        
        let dataBook  = await Book.findOneAndUpdate({'_id': data._id}, data, {
            new: true,
            upsert: true
        });
    
        if (dataBook) {
            return res.status(200).json({
                dataBook
            })
        } else {
            return res.status(500).json({
              success: false,
              message: 'Error update a book!'
            })
        } 
    }

    // Book deleted logically on DB
    async deleteBook(req, res) {
        const data = req.body;

        data.updated = new Date();
        data.deleted = true;
        
        let dataBook  = await Book.findOneAndUpdate({'_id': data._id}, data, {
            new: true,
            upsert: true
        });
    
        if (dataBook) {
            return res.status(200).json({
                dataBook
            })
        } else {
            return res.status(500).json({
              success: false,
              message: 'Error delete a book!'
            })
        } 
    }
}

module.exports = new ControllerBook()