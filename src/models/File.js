import {Schema, model} from 'mongoose';

const productSchema= new Schema({
	name: String,
	description:String,
	owner:String,
	canRead:[String]

},{
	timestamps:true,
	versionKey:false
})
