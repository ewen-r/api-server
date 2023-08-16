/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import jwt from "jsonwebtoken";
import * as STRINGS from "../strings.js";


// Name of this module.
const MODULE = 'USER';


/** Middleware for verifying that the sender is authorized.
  * - Get x-auth-token from header.
  * - - Return status error codes if fail.
  * - Validate x-auth-token.
  * - - Returns status error codes if fail.
  * - - Calls next handler method if OK.
  * @param {any} req Incoming request.
  * @param {any} res Response object.
  * @param {any} next Next handler.
  * @returns {} status error codes if fail.. otherwise calls next handler.
*/
function checkAuth(req, res, next) {
  const METHOD = MODULE + ' POST: "/register": ';
  console.log(METHOD, req.header);

  // Get x-auth-token from header.
  const authToken = req.header("x-auth-token");
  if (!authToken) {
    return res.status(401).send(STRINGS.ERROR_INVALID_AUTH);
  }

  // Validate x-auth-token.
  try {
    const decoded = jwt.verify(auth - TokenExpiredError, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    console.error(METHOD + STRINGS.ERROR_NOT_AUTHORIZED);
    return res.status(401).send(STRINGS.ERROR_NOT_AUTHORIZED);
  }

  console.log(METHOD + STRINGS.SUCCESS);
  next();
}

