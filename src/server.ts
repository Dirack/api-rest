import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import * as homeController from './controllers/homeController';
import * as apiController from './controllers/apiController';
import {Auth} from './middlewares/auth';

dotenv.config();

const server = express();

server.use(express.urlencoded({extended:true}));

server.get('/',homeController.home);

server.post('/register',apiController.register);

server.post('/authenticate',apiController.authenticate);

server.get('/project',apiController.project);

server.get('/auth',Auth.private,apiController.project);

server.listen(process.env.PORT,()=>{
	console.log("Server started on port",process.env.PORT);
});
