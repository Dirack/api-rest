import {Request, Response, NextFunction} from 'express';
import JWT from 'jsonwebtoken';
import {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
	private: async (req: Request, res: Response, next: NextFunction)=>{
		let success = false;
		if(req.headers.authorization){
			const [authType,token] = req.headers.authorization.split(' ');
			if(authType === 'Bearer'){
				var decoded;
				JWT.verify(
					token,
					process.env.JWT_SECRET_KEY as string,
					(err,user)=>{
						if(err) return res.status(403).json({error:'Token invalid'});
						decoded = user;
					}
				);
				success = true;
				req.body = decoded;
			}else{
				console.log('Not bearer');
			}
		}

		if(success){
			next();
		}else{
			res.status(403).json({error:'Not authorized'});
		}
	}
};
