'use strinct';

const aplication = require('../Models/aplications');
const authorization = require('../Models/authorizations');
const logs = require('../Models/logs');

const Joi = require('joi'); 
const jwt = require('jsonwebtoken');
const moment = require('moment')

class MainController {

	async all(req, res, next) {
		
		const authHeader = req.headers["authorization"];
   		const token = authHeader && authHeader.split(" ")[1];
		if (token == null) res.json({ message: 'inautorizado' }, 401);
		 
		jwt.verify(token, 'secret_key', (err) => {
			if(err)	res.send(err.message)			
		})
		
		let data = await logs.find();
		res.json({ message: "All data", data: data });

	}


	create(req, res, next) {
		const authHeader = req.headers["authorization"];
   		const token = authHeader && authHeader.split(" ")[1];
		if (token == null) res.json({ message: 'inautorizado' }, 401);
		 
		jwt.verify(token, 'secret_key', (err) => {
			if(err)	res.send(err.message)			
		})

		const data = req.body
		
		const validObject = Joi.object({			
			type: Joi.string()
				.required(),
			priority: Joi.string()
				.required(),
			path: Joi.string()
				.required(),
			message: Joi.string()
				.required(),
			request: Joi.string()
				.required(),
			response: Joi.string().
				required(),
		});
		
		let temp = validObject.validate(data);
		
		if(temp.error){
			res.json({ message: temp.error.details });
		}
		else{
			const log = new logs(data)
			log.save()
			res.json({ message: 'Create log', data: log });
		}
	}

	async info(req, res, next) {

		let id = req.params.id;
		
		if(id){
			let data = await logs.find({ _id: id });
			res.json({ message: 'info', data: data });

		}else{
			res.json({ message: 'id required' }, 400);
		}

	}	

	async update(req, res, next) {
		const data = req.body
		let id = req.params.id;
		
		let tempLog = await logs.findById(id);

		if(tempLog){
			data.updated_at = new Date().getTime();

			let dataResp = await logs.findByIdAndUpdate(id, data, { new: true } )

			res.json({ message: 'update', data: dataResp});
		}else{
			res.json({ message: 'ID does not exist'},400);
		}
		
	}

	async delete(req, res, next) {
		
		let id = req.params.id;

		if (!id)
			res.json({ message: 'id required' }, 400);
		
			let data = await logs.findByIdAndDelete(id);

		res.json({ message: 'delete', data: data });
	}
	
	/* 
	
	 */
	createAplication(req, res, next) {
		
		const data = req.body
		 
		const validObject = Joi.object({
			name: Joi.string() 
		}); 
		
		let temp = validObject.validate(data);
		
		if(temp.error){
			res.json({ message: temp.error.details });
		}
		else{
			const apt = new aplication(data)		
			apt.save()					
			res.json({ message: 'createAplication' });
		}
	}
	
	/*

	 */
	async createAuthorizations(req, res, next) {
		const data = req.body

		const validObject = Joi.object({
			token: Joi.string()
				.alphanum()		
				.min(5)
				.max(10)
		});
		
		let temp = validObject.validate(data);
		
		if(temp.error){
			res.json({ message: temp.error.details });
		}
		else{

			let tempToken = await jwt.sign(data.token,'secret_key' , (err,token) => {				
				data.token = token
			})
			console.log(tempToken)		
			const auth = new authorization(data)    	
			auth.save()                
			res.json({ message: 'createAuthorizations',data: auth});
		}
	}
}

module.exports = new MainController();
