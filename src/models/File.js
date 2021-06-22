import {Schema, model} from 'mongoose';

const fileSchema= new Schema({
	name: String,
	description:String,
	owner:String,
	canRead:[String]

},{
	timestamps:true,
	versionKey:false
})
 export default model('File',fileSchema);