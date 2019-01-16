import express from "express";
import { createServer } from "http";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

//Import Passport Config
import passportConfig from "../api/config/passport";

const app = express();
const server = createServer(app);

//Setup Http-Logger Middleare
app.use(logger('dev'));

//Setup CORS Error Handler
app.use(cors());

//Import Routes
import userRoute from "../api/routes/user";
import dashboardRoute from "../api/routes/dashboard";

//Setup Body-Parser & Cookie-Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

//Import MongoDB Connection
import "../api/config/database";

//Route for User
app.use('/user', userRoute);

//Route for DashBoard
app.use('/user', dashboardRoute);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server started running on port ${port}!!`));