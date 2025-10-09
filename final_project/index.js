const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
//Final tasks solved with Promise's; it is valuable doing them with Async/Await + Axios (remember: Express do not async tasks implicitly)
//Code works great; maybe a cleaning is needed
//Add more functionalities, and improve the existing ones

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){ //pending for test

	if (req.session.authorization){
		let token=req.session.authorization['accessToken'];

		jwt.verify(token, "access", (err,user)=>{
			if (!err){
				req.user=user;
				next();
			} else {
				return res.status(403).json({message: "User not authenticated!"});
			}
		});
	} else {
		return res.status(403).json({message: "User not logged in!"});
	}
});

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

//flag for commit amend