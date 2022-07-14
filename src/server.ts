import express,{Request,Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();

const server = express();

server.listen(process.env.PORT,()=>{
	console.log("Server started on port",process.env.PORT);
});