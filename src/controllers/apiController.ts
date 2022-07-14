import {Request,Response} from 'express';
import {User} from '../models/User';

export const register = async (req: Request, res: Response)=>{
	let name = req.body.name as string;
	let email = req.body.email as string;
	let password = req.body.password as string;
	try{
		let hasUser = await User.findOne({where:{email}});
		if(hasUser)
			return res.status(400).json({error:"User already exists"});
		const user = await User.create({name,email,password});
		return res.json({user});
	}catch(err){
		return res.status(400).json({error:"Registration failed"});
	}
};
