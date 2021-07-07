import {Schema, model} from 'mongoose';

const fileSchema= new Schema({
	name: String,
	description:String,
	createdBy:String,
	resourceAwsPath:String,
	typeOwnership:String,
	emailAuthorization:String
},{
	timestamps:true,
	versionKey:false
})
 export default model('File',fileSchema);