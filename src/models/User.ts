import {Model,DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';

export interface UserInstance extends Model{
	id: number,
	name: string,
	email: string,
	password: string
};

export const User = sequelize.define<UserInstance>("user",{
	id:{
		primaryKey:true,
		type: DataTypes.INTEGER
	},
	name:{
		type:DataTypes.STRING
	},
	email:{
		type:DataTypes.STRING
	},
	password:{
		type:DataTypes.STRING
	}},{
		tableName:"apirest",
		timestamps:false

});
