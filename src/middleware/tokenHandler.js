import Sesion from '../models/Sesion';
export const verifyToken=async (email,token)=>{
    const userFound = await Sesion.findOne({ email: email })
    const tokens=userFound.tokens;
    const tokenFound=tokens.find(item=>{item===token});
    if (!tokenFound){ 
          //return res.status(400).json({ message: "Token does not exist" });
        throw "Token does not exist";
    }else{
        return "correct token";
    }
}

export const removeToken=async (email,token)=>{
    const userFound = await Sesion.findOne({ email: email })
    const tokens=userFound.tokens;
    tokens=tokens.filter(item => item!== token);
    Sesion.updateOne({ _id: userFound._id, tokens: tokens });
}

export const addToken=async (email,token)=>{
    const userFound = await Sesion.findOne({ email: email })
    const tokens=userFound.tokens;
    tokens.push(token);
    Sesion.updateOne({ _id: userFound._id, tokens: tokens });
}

export const removeAllTokens=async (email)=>{
    const userFound = await Sesion.findOne({ email: email });
    Sesion.updateOne({ _id: userFound._id, tokens: [] });
}