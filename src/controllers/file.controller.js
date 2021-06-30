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
    const file = await File.find();
    return res.json(file);
}
export const createFile=async (req,res)=>{
    const file = req.file
	  const result = await uploadFile(file)
    await unlinkFile(file.path)  
    const description = req.body.description
    //Mongodb insert
    const {name,description,owner,canRead} = req.body;
    console.log(req.body)
  try {
    const newFile= new File({
      name,
      description,
      owner,
      canRead,
    });
    const fileSaved = await newFile.save();
    res.status(201).json(fileSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
    
}
export const updateFile=async(req,res)=>{
    const updatedFile = await File.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
          new: true,
        }
      );
      res.status(204).json(updatedFile);
}
export const deleteFile=async(req,res)=>{
    const { fileId } = req.params;

    await File.findByIdAndDelete(fileId);
  
    // code 200 is ok too
    res.status(204).json();
}
