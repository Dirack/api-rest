import {Request,Response} from 'express';
import {User} from '../models/User';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function generateToken(params = {}){
	return JWT.sign(
		params,
		process.env.JWT_SECRET_KEY as string,
		{expiresIn:'2h'});

}

export const register = async (req: Request, res: Response)=>{
	let name = req.body.name as string;
	let email = req.body.email as string;
	let stringPassword = req.body.password as string;
	try{
		let hasUser = await User.findOne({where:{email}});
		if(hasUser)
			return res.status(400).json({error:"User already exists"});
		let password = await bcrypt.hash(stringPassword,10);
		const user = await User.create({name,email,password});
		user.password = '';
		return res.json({user,token:generateToken({id:user.id})});
	}catch(err){
		return res.status(400).json({error:"Registration failed"});
	}
};

export const authenticate = async (req: Request, res: Response)=>{
	const {email, password} = req.body;
	const user = await User.findOne({where:{email}});
	if(user){
		if(await bcrypt.compare(password,user.password)){
			let token = generateToken({id: user.id});
			return res.status(200).json({auth:true,token});
		}else{
			return res.status(400).json({auth:false,msg:'Invalid password'});
		}
	}else{
		return res.status(400).json({auth:false,msg:'User not found'});
	}
};


export const project = (req: Request, res: Response)=>{
	return res.status(200).json({ok:true,userId:req.body.id});
};
