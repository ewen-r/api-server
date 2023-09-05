/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import * as STRINGS from "./strings.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import testRouter from "./routes/test.js";
import testAuthRouter from "./routes/test_auth.js";
import userRouter from "./routes/user.js";
import quizRouter from './routes/quiz.js';
import cors from 'cors';


/* Set dirname prefix for the current root so that files can be served.
 * e.g res.sendFile(_dirname + '/web/index.html'); */
const _dirname = dirname(fileURLToPath(import.meta.url));


const PROJECT = "api-server";
const MODULE = 'APP';

// Load and check env.
loadEnv();

// Set port from env or use default 4000.
const PORT = process.env.port || 4000;

// Create swagger-jsdoc options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api-server',
      version: '1.0.0',
      description: 'server-api test by E Reynolds.'
    },
    servers: [
      { url: `http://localhost:${PORT}` },
      { url: 'https://api-server-j2h3.onrender.com' }
    ]
  },
  // files containing annotations
  apis: [
    './routes/*.js'
  ]
};

// Initialize swagger-jsdoc
const specs = swaggerJSDoc(options);


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));


// Use routers.
app.use('/test', testRouter);
app.use('/user/', userRouter);
app.use('/test_auth', testAuthRouter);
app.use('/quiz', quizRouter);



//////////////////////////////////////////////////////////////////////////////////////////////
//

/* Handle GET requests to '/'
 * - Redirect to api-docs
*/
app.get('/',
  (req, res) => {
    console.log('GET: "/"', req.body);
    res.redirect("api-docs");
  }
);



/** Load and check env.
  * - If vars are not set...
  * - - Assume we are in dev mode and try to load vars from .env file
  * - Check for required env variables and exit if not found.
*/
function loadEnv() {
  const METHOD = MODULE + ' loadEnv(): ';
  console.log(METHOD);

  console.log(STRINGS.SPACER);

  // If vars are not set...
  if (!checkVars()) {
    // Assume we are in dev mode and try to load vars from .env file
    console.log('= RUNNING ' + PROJECT + ' LOCALLY');
    dotenv.config();
  } else {
    console.log('= RUNNING PRODUCTION');
  }

  console.log(STRINGS.SPACER);

  // Check for required env constants and exit if not found.
  if (!checkVars()) {
    console.error(METHOD + STRINGS.ERROR + ' Unable to load all required env values.');
    process.exit(5);
  }
}


function checkVars() {
  // return true if all required vars are loaded.
  return (
    process.env.MONGO_URI
    && process.env.ACCESS_TOKEN_SECRET
    && process.env.REFRESH_TOKEN_SECRET
  );

}


//
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
//


// Start the app, listening on PORT "PORT".
app.listen(PORT,
  () => {
    console.log(MODULE + ' Server is running on port ' + PORT);
  }
);
