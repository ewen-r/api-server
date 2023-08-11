/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import * as STRINGS from "../strings.js";
import testData from "./test_data.js";

const MODULE = 'TEST';

// Get router.
const router = express.Router();

// Use local copy of test data.
let myTestData = [...testData];

/**
  * @swagger
  *  components:
  *    schemas:
  *      Quote:
  *        type: object
  *        required:
  *          - author
  *          - quote
  *        properties:
  *          id:
  *            type: number
  *            description: Item UUID.
  *          author:
  *            type: string
  *            description: Item author.
  *          quote:
  *            type: string
  *            description: Item content.
  *        example:
  *          id: 1
  *          quote: "Strive not to be a success, but rather to be of value."
  *          author: "Albert Einstein"
 */

/**
  * @swagger
  *   tags:
  *     name: Quotes
  *     description: API for managing quotes.
 */

/** Handle GET requests to '/'
  * @swagger
  * /test:
  *   get:
  *     summary: Retrieve the list of all items.
  *     tags: [Quotes]
  *     responses:
  *       200:
  *         description: Successfully retrieved all items.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/Quote'
  *       500:
  *         description: General server error.
*/
router.get('/',
  (req, res) => {
    const METHOD = MODULE + ' GET: "/": ';
    console.log(METHOD, req.body);

    try {
      console.log(METHOD + STRINGS.SUCCESS, testData);

      return res.send(myTestData);
    } catch (err) {
      console.error(METHOD + ERROR, err);

      return res.status(500).send(err);
    }
  }
);


/** Handle POST requests to '/'
  * @swagger
  * /test/:
  *   post:
  *     summary: Create a new entry.
  *     tags: [Quotes]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#components/schemas/Quote'
  *     responses:
  *       200:
  *         description: Successfully added item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Quote'
  *       400:
  *         description: Bad request.
  *       500:
  *         description: General server error.
*/
router.post('/',
  (req, res) => {
    const METHOD = MODULE + ' POST: "/": ';
    console.log(METHOD, req.body);

    try {
      const insertedRecord = insertRecord(req.body);
      if (insertedRecord) {
        console.log(METHOD + STRINGS.SUCCESS, insertedRecord);

        return res.send(insertedRecord);
      }
      else {
        console.error(METHOD + STRINGS.ERROR_BAD_REQUEST, req.body);

        return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
      }
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);

      return res.status(500).send(err);
    }
  }
);



/** Handle GET requests to '/:id'
  * @swagger
  * /test/{id}:
  *   get:
  *     summary: Retrieve a specific entry.
  *     tags: [Quotes]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: number
  *         required: true
  *         description: UUID for the required item.
  *     responses:
  *       200:
  *         description: Successfully retrieved item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Quote'
  *       404:
  *         description: Item not found.
  *       500:
  *         description: General server error.
*/
router.get('/:id',
  (req, res) => {
    const METHOD = MODULE + ` GET: "/${req.params.id}": `;
    console.log(METHOD);

    try {
      const foundRecord = myTestData.find(
        r => r.id == req.params.id
      );
      if (foundRecord) {
        console.log(METHOD + STRINGS.SUCCESS, foundRecord);
        return res.send(foundRecord);
      }
      console.error(METHOD + STRINGS.ERROR_NOT_FOUND);

      return res.status(404).send(STRINGS.ERROR_NOT_FOUND);
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);

      return res.status(500).send(err);
    }
  }
);



/* Handle DELETE requests to '/:id'
*/
router.delete('/:id',
  (req, res) => {
    const METHOD = MODULE + ` DELETE: "/${req.params.id}": `;
    console.log(METHOD);

    try {
      const foundRecord = myTestData.find(
        r => r.id == req.params.id
      );
      if (!foundRecord) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND);

        return res.status(500).send(STRINGS.ERROR_NOT_FOUND);
      }

      const records = myTestData.filter(
        r => r.id != req.params.id
      );
      myTestData = records;
      console.log(METHOD + STRINGS.SUCCESS);

      return res.status(200).send();
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);

      return res.status(500).send(err);
    }
  }
);



/** Insert a new record..
 */
function insertRecord(record) {
  const METHOD = MODULE + ' insertRecord(): ';
  console.debug(METHOD, record);

  const { author, quote } = record;
  const newRecord = {
    id: myTestData.length + 1,
    author: author,
    quote: quote
  };

  if (newRecord.author && newRecord.quote) {
    myTestData.push(newRecord);

    return newRecord;
  }

  return null;
}


// Export this router.
export default router;
