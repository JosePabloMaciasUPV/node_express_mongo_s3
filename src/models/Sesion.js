import {Schema, model} from 'mongoose';

const SesionSchema= new Schema({
	email: String,
	tokens:[String]
},{
	timestamps:true,
	versionKey:false
})
 export default model('Sesion',SesionSchema);