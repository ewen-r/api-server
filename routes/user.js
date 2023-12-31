/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import * as STRINGS from "../strings.js";
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";


// Name of this module.
const MODULE = 'USER';

// Get router.
const router = express.Router();

// Use local copy of test data.
let myTestData = [
  {
    username: 'feeb',
    password: 'wibble',
    refreshToken: ''
  }
];


/** Access token expire time in seconds (1 hour). */
const ACCESS_TOKEN_EXPIRE = (60 * 60);
/** Refresh token expire time in seconds (should be longer than access token expire time). */
const REFRESH_TOKEN_EXPIRE = (ACCESS_TOKEN_EXPIRE + (5 * 60));


/**
  * @swagger
  *   tags:
  *     name: User
  *     description: User API end-point.
 */


/** Handle POST requests to '/register'
  * @swagger
  * /user/register:
  *   post:
  *     summary: Register a new user.
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *                 example: feeb
  *               password:
  *                 type: string
  *                 example: wibble
  *     responses:
  *       200:
  *         description: Successful registration.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 accessToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNjczOX0.wzIcgryuFwsM4YafOswkJ_gNrpcKC1RAmePTyBghgok
  *                 refreshToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNzAzOX0.UshglaCpw-HVoX5OswtXEvFYih5_snzcZXCQ1i7gJcg
  *       400:
  *         description: Bad request.
  *       500:
  *         description: General server error.
*/
router.post('/register',
  async function (req, res) {
    const METHOD = MODULE + ' POST: "/register": ';
    console.log(METHOD, req.body);

    try {
      // Return error if username and password were not supplied.
      const { username, password } = req.body;
      if (!(password && username)) {
        console.error(METHOD + STRINGS.ERROR_INVALID_INPUT);
        return res.status(400).send();
      }

      // Return error if user already exists.
      const user = recordFindByUsername(username);
      if (user) {
        console.error(METHOD + STRINGS.ERROR_USER_EXISTS, username);
        return res.status(400).send(STRINGS.ERROR_USER_EXISTS);
      }

      // Generate new user.
      const encryptedPassword = await bcrypt.hash(password, 10);
      const accessToken = generateAccessToken(username);
      const refreshToken = generateRefreshToken(username);
      if (!(encryptedPassword && accessToken && refreshToken)) {
        console.error(METHOD + STRINGS.ERROR_TOKEN_CREATE);
        return res.status(500).send(STRINGS.ERROR_GENERAL);
      }
      const newUser = {
        username: _.lowerCase(username),
        password: encryptedPassword,
        refreshToken: refreshToken
      };

      // Return error if record could not be inserted.
      const insertedRecord = await insertRecord(newUser);
      if (!insertedRecord) {
        console.error(METHOD + STRINGS.ERROR_GENERAL, username);
        return res.status(500).send(STRINGS.ERROR_GENERAL);
      }

      // All OK... return tokens.
      const ret = {
        accessToken: accessToken,
        refreshToken: refreshToken
      };

      console.log(METHOD + STRINGS.SUCCESS, username);
      return res.send(ret);
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(err);
    }
  }
);


/** Handle POST requests to '/login'
  * @swagger
  * /user/login:
  *   post:
  *     summary: Log-in and retrieve auth tokens.
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *                 example: feeb
  *               password:
  *                 type: string
  *                 example: wibble
  *     responses:
  *       200:
  *         description: Successful login.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 accessToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNjczOX0.wzIcgryuFwsM4YafOswkJ_gNrpcKC1RAmePTyBghgok
  *                 refreshToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNzAzOX0.UshglaCpw-HVoX5OswtXEvFYih5_snzcZXCQ1i7gJcg
  *       400:
  *         description: Bad request.
  *       404:
  *         description: User not found.
  *       500:
  *         description: General server error.
*/
router.post('/login',
  async function (req, res) {
    const METHOD = MODULE + ' POST: "/login": ';
    console.log(METHOD, req.body);

    try {
      // Return error if username and password were not supplied.
      const { username, password } = req.body;
      if (!(password && username)) {
        console.error(METHOD + STRINGS.ERROR_INVALID_INPUT);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if user doesn't exist.
      const user = recordFindByUsername(username);
      if (!user) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND, username);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if password is incorrect.
      if (!await passwordIsValid(password, user.password)) {
        console.error(METHOD + STRINGS.ERROR_BAD_PASSWORD);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Generate access and refresh tokens.
      const accessToken = generateAccessToken(username);
      const refreshToken = generateRefreshToken(username);
      if (!(accessToken && refreshToken)) {
        console.error(METHOD + STRINGS.ERROR_TOKEN_CREATE);
        return res.status(500).send(STRINGS.ERROR_TOKEN_CREATE);
      }

      // Update user's refresh token.
      user.refreshToken = refreshToken;
      updateRecord(user);

      // All OK... return tokens.
      console.log(METHOD + STRINGS.SUCCESS, username);
      return res.send(
        {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      );
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(STRINGS.ERROR_GENERAL);
    }
  }
);



/** Handle DELETE requests to '/login'
  * @swagger
  * /user/login:
  *   delete:
  *     summary: Log-out.
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *                 example: feeb
  *     responses:
  *       204:
  *         description: Successful log-out.
  *       400:
  *         description: Bad request.
  *       500:
  *         description: General server error.
*/
router.delete('/login',
  async function (req, res) {
    const METHOD = MODULE + ' DELETE: "/login": ';
    console.log(METHOD, req.body);

    try {
      // Return error if username not supplied.
      const { username } = req.body;
      if (!username) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND, username);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if user doesn't exist.
      const user = recordFindByUsername(username);
      if (!user) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND, username);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if user is already logged out.
      if (!user.refreshToken) {
        console.error(METHOD + STRINGS.USER_LOGGED_OUT, username);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Delete user's refresh token.
      user.refreshToken = null;
      updateRecord(user);

      // Return status.
      console.log(METHOD + STRINGS.SUCCESS, username);
      return res.status(204).send();
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(STRINGS.ERROR_GENERAL);
    }
  }
);


/** Handle GET requests to '/refresh'
  * @swagger
  * /user/refresh:
  *   post:
  *     summary: Retrieve refreshed auth tokens.
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *                 example: feeb
  *               refreshToken:
  *                 type: string
  *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNzAzOX0.UshglaCpw-HVoX5OswtXEvFYih5_snzcZXCQ1i7gJcg
  *     responses:
  *       200:
  *         description: Successful login.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 accessToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNjczOX0.wzIcgryuFwsM4YafOswkJ_gNrpcKC1RAmePTyBghgok
  *                 refreshToken:
  *                   type: string
  *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImQiLCJpYXQiOjE2OTIwMDU4MzksImV4cCI6MTY5MjAwNzAzOX0.UshglaCpw-HVoX5OswtXEvFYih5_snzcZXCQ1i7gJcg
  *       400:
  *         description: Bad request.
  *       404:
  *         description: Refresh token not found.
  *       500:
  *         description: General server error.
*/
router.post('/refresh',
  async function (req, res) {
    const METHOD = MODULE + ' POST: "/refresh": ';
    console.log(METHOD, req.body);

    try {
      // Return error if username or refresh token was not supplied.
      const { username, refreshToken } = req.body;
      if (!(refreshToken && username)) {
        console.error(METHOD + STRINGS.ERROR_INVALID_INPUT);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if user doesn't exist.
      const user = recordFindByUsername(username);
      if (!user) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND, username);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if refresh token doesn't match.
      if (user.refreshToken !== refreshToken) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND + " refresh token");
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Generate access and refresh tokens.
      const newAccessToken = generateAccessToken(username);
      const newRefreshToken = generateRefreshToken(username);
      if (!(newAccessToken && newRefreshToken)) {
        console.error(METHOD + STRINGS.ERROR_TOKEN_CREATE);
        return res.status(500).send(STRINGS.ERROR_TOKEN_CREATE);
      }

      // Update stored refresh token.
      user.refreshToken = newRefreshToken;
      updateRecord(user);

      // All OK... return tokens.
      console.log(METHOD + STRINGS.SUCCESS, username);
      return res.send(
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        }
      );
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(STRINGS.ERROR_GENERAL);
    }
  }
);


/** Find a user by username.
  * @param {string} username Username.
  * @returns {record} Record or undefined if not found.
*/
function recordFindByUsername(username) {
  const METHOD = MODULE + ' recordFindByUsername(): ';
  console.debug(METHOD, username);

  return myTestData.find(
    r => r.username == _.lowerCase(username)
  );
}


/** Check user password.
  * @param {string} password Input password.
  * @param {string} expectedPassword expected password.
  * @returns {record} Record or undefined if not found.
*/
async function passwordIsValid(password, expectedPassword) {
  const METHOD = MODULE + ' passwordIsValid(): ';
  console.debug(METHOD);
  return (await bcrypt.compare(password, expectedPassword));
}


/** Insert a new record..
  * @param {record} record Record to insert.
  * @returns {record | null} If success returns record else null.
*/
async function insertRecord(record) {
  const METHOD = MODULE + ' insertRecord(): ';
  console.debug(METHOD, record);
  myTestData.push(record);
  return record;
}


/** Generate an access token.
  * @param {string} username Username.
  * @returns {string | undefined} Returns token or undefined if error.
 */
function generateAccessToken(username) {
  const METHOD = MODULE + ' generateAccessToken(): ';
  console.debug(METHOD, username);

  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
  console.debug(METHOD + " accessToken", accessToken);

  return accessToken;
}


/** Generate a refresh token.
  * - Save refresh token to local array.
  * @param {string} username Username.
  * @returns {string | undefined} Returns token or undefined if error.
 */
function generateRefreshToken(username) {
  const METHOD = MODULE + ' generateRefreshToken(): ';
  console.debug(METHOD, username);

  const refreshToken = jwt.sign(
    { username: username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRE }
  );
  console.debug(METHOD + " refreshToken", refreshToken);

  return refreshToken;
}


/** Update a record
  * NOTE: The only param that can be modified is refreshToken.
  * @param {record} record New record values.
  * @returns {record | null} If success returns record else null.
*/
function updateRecord(record) {
  const METHOD = MODULE + ' updateRecord(): ';
  console.debug(METHOD, record);

  const { username, refreshToken } = record;
  const index = myTestData.findIndex(
    u => u.username == username
  );

  if (index < 0) {
    console.error(METHOD + STRINGS.ERROR_NOT_FOUND, username);
    return null;
  }

  // The only param that can be modified is refreshToken.
  refreshToken && (myTestData[index].refreshToken = refreshToken);
  return myTestData[index];
}



// Export this router.
export default router;
