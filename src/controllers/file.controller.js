import File from '../models/File';
import { uploadFile, getFileStream } from '../middleware/s3';
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)




export const getFile=async (req,res)=>{s
    //s3 service
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
    res.send("correcto!");
}
export const getFiles=async (req,res)=>{
    const products = await Product.find();
    return res.json(products);
}
export const createFile=async (req,res)=>{
    const file = req.file
	const result = await uploadFile(file)
    await unlinkFile(file.path)  
    const description = req.body.description


    //Mongodb insert
    const { name, category, price, imgURL } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      imgURL,
    });

    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
    
}
export const updateFile=async(req,res)=>{
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
        }
      );
      res.status(204).json(updatedProduct);
}
export const deleteFile=async(req,res)=>{
    const { productId } = req.params;

    await Product.findByIdAndDelete(productId);
  
    // code 200 is ok too
    res.status(204).json();
}
