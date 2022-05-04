const URL = require('../models/url.js');
const helper = require('../helper/helper.js');
const config = require('../config/config.json');
const httpStatus = require('http-status-codes').StatusCodes;
const global = require('../resources/lang/en/global.json');

module.exports.createShortUrl = async(req,res)=>{
	try{
		let isUrlExist = URL.findOne({long_url:req.body.url});
		if(isUrlExist){
			return res.send({"status":true,"message":global.url_exist,"statusCode":httpStatus.OK,"data":isUrlExist});
		} else {
			// create url
			let randomString = helper.createRandomString();
			let isUniqueUrl;
			isUniqueUrl = await Url.findOne({short_url:randomString});
			while(isUniqueUrl){
				randomString = helper.createRandomString();
				isUniqueUrl = await Url.findOne({short_url:randomString});
			}
			let newUrl = await new Url({long_url:req.body.url,short_url:randomString});
			return res.send({"status":true,"message":global.url_created,"statusCode":httpStatus.OK,"data":isUrlExist});
		}
	} catch (err){
		console.error(err);
		return res.send({"status":false,"message":global.internal_server_error,"statusCode":httpStatus.INTERNAL_SERVER_ERROR});
	}
}