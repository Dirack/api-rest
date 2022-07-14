import {Request, Response} from 'express';
import {sequelize} from '../instances/mysql';

export const home = async (req: Request, res: Response)=>{

	try{
		await sequelize.authenticate();
	}catch(err){
		console.log(err);
	}
};
