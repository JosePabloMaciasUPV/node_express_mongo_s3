import File from '../models/File';
import { uploadFile, getFileStream } from '../middleware/s3';
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
//Handle multer file uploader middleware
const multer = require('multer');
const upload = multer({ dest: 'fileTemp/' });


export const getFile=async (req,res)=>{
    /*
    //s3 service
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)*/
    res.send("correcto!");
}
export const getFiles=async (req,res)=>{
    res.send("correcto!");
}
export const createFile=async (req,res)=>{
    upload.single('file')
    const file = req.file
    const result = await uploadFile(file).then(successfull=>{console.log(successfull)})
    await unlinkFile(file.path)  
    const description = req.body.description
    res.send({imagePath: `/file/${result.Key}`}) ;
    
}
export const updateFile=async(req,res)=>{

}
export const deleteFile=async(req,res)=>{

}
