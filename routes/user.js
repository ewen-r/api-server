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


// Name of this module.
const MODULE = 'USER';

// Get router.
const router = express.Router();

// Use local copy of test data.
let myTestData = [
  {
    username: 'feeb',
    password: 'wibble',
    token: 'myDummyToken'
  }
];


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
  *     summary: Attempt to register a new user.
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
  *                 token:
  *                   type: string
  *                   example: 1234567890abcdefghijklm0987654321
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
        console.error(METHOD + STRINGS.ERROR_USER_EXISTS, req.body);
        return res.status(400).send(STRINGS.ERROR_USER_EXISTS);
      }

      // Return error if record could not be inserted.
      const insertedRecord = await insertRecord(req.body);
      if (!insertedRecord) {
        console.error(METHOD + STRINGS.ERROR_GENERAL, req.body);
        return res.status(500).send(STRINGS.ERROR_GENERAL);
      }

      // All OK... return token.
      console.log(METHOD + STRINGS.SUCCESS, insertedRecord);
      return res.send({ token: insertedRecord.token });
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
  *     summary: Attempt login and retrieve auth token.
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
  *                 token:
  *                   type: string
  *                   example: 1234567890abcdefghijklm0987654321
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
        return res.status(400).send();
      }

      // Return error if user doesn't exist.
      const user = recordFindByUsername(req.body.username);
      if (!user) {
        console.error(METHOD + STRINGS.ERROR_BAD_REQUEST, req.body);
        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }

      // Return error if password is incorrect.
      if (!await passwordIsValid(req.body.password, user.password)) {
        console.error(METHOD + STRINGS.ERROR_BAD_PASSWORD);
        return res.status(400).send();
      }

      // All OK... return token.
      console.log(METHOD + STRINGS.SUCCESS, user);
      return res.send({ token: user.token });
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(err);
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

  // Return error if username and password were not supplied.
  const { username, password } = record;
  if (!(password && username)) {
    console.error(METHOD + STRINGS.ERROR_INVALID_INPUT);
    return res.status(400).send();
  }

  // CReate password hash.
  const encryptedPassword = await bcrypt.hash(password, 10);
  // Create new record.
  const newRecord = {
    username: _.lowerCase(username),
    password: encryptedPassword,
    token: `${Math.floor(Math.random() * 1000000)}`
  };

  // Store new record.
  if (newRecord.username && newRecord.password) {
    myTestData.push(newRecord);
    return newRecord;
  }

  return null;
}


// Export this router.
export default router;