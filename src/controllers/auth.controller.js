import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import {verifyToken,addToken,removeAllTokens,removeToken} from '../middleware/tokenHandler';
export const register=async (req,res)=>{
    try {
        // Getting the Request Body
        const { username, email, password } = req.body;
        // Creating a new User Object
        const newUser = new User({
          username,
          email,
          password: await User.encryptPassword(password),
        });
        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();
        // Create a token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
          expiresIn: 86400, // 24 hours
        });
        await addToken(email,token);
        return res.status(200).json({ token });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
}

export const login=async (req,res)=>{
    try {
        // Request body email can be an email or username
	const email=req.body.email;
        const userFound = await User.findOne({ email: email })
        if (!userFound){ return res.status(400).json({ message: "User Not Found" });}
        const matchPassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );
        if (!matchPassword){
          return res.status(401).json({
            token: null,
            message: "Invalid Password",
          });}

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
          expiresIn: 86400, // 24 hours
        });
	    console.log(email)
        await addToken(email,token);
        res.json({ token });
      } catch (error) {
        console.log(error);
      }
}
export const removeSesions=async (req,res)=>{
  try {
    const token=req.headers.authorization;
    const email=req.body.email;
    await verifyToken(email,token);
    await removeAllTokens(email);
    res.status(200).json({message:"Done"});
  }catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
}

export const logout=async (req,res)=>{
  try {
    const token=req.headers.authorization;
    const email=req.body.email;
    await removeToken(email,token);
    res.status(200).json({message:"Done"});
  }catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
