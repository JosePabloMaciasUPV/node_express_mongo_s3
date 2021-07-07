import File from '../models/File';
import { uploadFile, getFileStream } from '../middleware/s3';
import {verifyToken} from '../middleware/tokenHandler';
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)




export const getFile=async (req,res)=>{
  try{
    const authorization =req.headers.authorization;
    const email=req.body.email;
    await verifyToken(email,authorization);  
    //s3 service
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
    res.send("correcto!");
    }catch(error){
      console.log(error);
      return res.status(400).json({message:error})
  }
}
export const getFiles=async (req,res)=>{
  try{
  const authorization =req.headers.authorization;
  const email=req.body.email;
  await verifyToken(email,authorization);
  const file = await File.find({emailAuthorization:email});
  
	 res.status(200).json(file)
  }catch(error){
    console.log(error);
    return res.status(400).json({message:error})
  }
}
export const createFile=async (req,res)=>{
  try {
    const authorization =req.headers.authorization;
    const email=req.body.email;
    await verifyToken(email,authorization);
    const file = req.file
	  const result = await uploadFile(file)
    await unlinkFile(file.path)  
    //Mongodb insert
    const {name,description,owner,canRead} = req.body;
    console.log(req.body);
    const arrayOfAuthorzation=canRead.map(item=>{
      if(item===email){
        return {
          name:name,
          description:description,
          resourceAwsPath:result,
          createdBy:email,
          emailAuthorization:owner,
          typeOwnership:"Admin"
        }
      }else{
        return {
          name:name,
          description:description,
          resourceAwsPath:result,
          createdBy:email,
          emailAuthorization:item,
          typeOwnership:"Read"
        }
      }
      
    });
    const newFile=new File();
    const fileSaved = await newFile.insertMany(arrayOfAuthorzation);
    res.status(201).json(fileSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
    
}
export const updateFile=async(req,res)=>{
    try{
      const authorization =req.headers.authorization;
      const email=req.body.email;
      await verifyToken(email,authorization);
      /*const updatedFile = await File.updateMany(
  	    {resourceAwsPath: req.body},
        {req.body},
        {
          new: true,
        }
      );*/
      res.status(204).json(//updatedFile);
      {});
      }catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}
export const deleteFile=async(req,res)=>{
  try{
    const authorization =req.headers.authorization;
    const email=req.body.email;
    await verifyToken(email,authorization);
    const { fileId } = req.params;

    await File.findByIdAndDelete(fileId);
  
    // code 200 is ok too
    res.status(204).json();
  }catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } 
}
