import Sesion from '../models/Sesion';
export const verifyToken=async (email,token)=>{
    const userFound = await Sesion.findOne({  email: email })	   
	const tokens=userFound.tokens;
    const indexOfToken=tokens.indexOf(token);
    if (indexOfToken===-1){ 
          //return res.status(400).json({ message: "Token does not exist" });
        throw "Token does not exist";
    }else{
	    console.log(tokens[indexOfToken]);
	return tokens[indexOfToken];
    }
}

export const removeToken=async (email,token)=>{
    const userFound = await Sesion.findOne({ email: email })
    const tokens=userFound.tokens.filter(item => item!== token);
	console.log(userFound);
	console.log(tokens);
   
    Sesion.updateOne({ _id: userFound._id, tokens: tokens });

}

export const addToken=async (email,token)=>{
	const userFound = await Sesion.findOne({ email: email })
	    if(!userFound){
	    
	const sesion=new Sesion({email:email,tokens:[token]});	    
	await sesion.save(); 
    	
	 return;
    }

const tokens=userFound.tokens;
	console.log(userFound);
	console.log(tokens);
	tokens.push(token);
    await Sesion.updateOne({ _id: userFound._id, tokens: tokens });
}

export const removeAllTokens=async (email)=>{
	
    const userFound = await Sesion.findOne({ email: email });
    sesion.updateOne({ _id: userFound._id, tokens: [] });
}
