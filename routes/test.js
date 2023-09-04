/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import * as STRINGS from "../strings.js";
import { quotesTestData } from "./test_data.js";

/** Name of this module. */
const MODULE = 'TEST';

// Get router.
const router = express.Router();

// Use local copy of test data.
let myTestData = [...quotesTestData];


/**
  * @swagger
  *   tags:
  *     name: Test
  *     description: Test API end-point.
 */


/**
  * @swagger
  *   components:
  *     schemas:
  *       TestData_Quotes:
  *         type: object
  *         required:
  *           - author
  *           - quote
  *         properties:
  *           id:
  *             type: number
  *             description: Item UUID.
  *           author:
  *             type: string
  *             description: Item author.
  *           quote:
  *             type: string
  *             description: Item content.
  *         example:
  *           id: 1
  *           quote: "Hello World."
  *           author: "Anon programmer"
*/


/** Handle GET requests to '/'
  * @swagger
  * /test:
  *   get:
  *     summary: Retrieve the list of all items.
  *     tags: [Test]
  *     responses:
  *       200:
  *         description: Successfully retrieved all items.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/TestData_Quotes'
  *       500:
  *         description: General server error.
*/
router.get('/',
  (req, res) => {
    const METHOD = MODULE + ' GET: "/": ';
    console.log(METHOD, req.body);

    try {
      console.log(METHOD + STRINGS.SUCCESS, quotesTestData);
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
  *     summary: Create a new item.
  *     tags: [Test]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#components/schemas/TestData_Quotes'
  *     responses:
  *       200:
  *         description: Successfully added item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/TestData_Quotes'
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

      console.error(METHOD + STRINGS.ERROR_BAD_REQUEST, req.body);
      return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
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
  *     summary: Retrieve a specific item.
  *     tags: [Test]
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
  *               $ref: '#components/schemas/TestData_Quotes'
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


/** Handle PATCH requests to '/'
  * @swagger
  * /test/{id}:
  *   patch:
  *     summary: Update a specific item.
  *     tags: [Test]
  *     parameters:
  *       - in: path
  *         name: id
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#components/schemas/TestData_Quotes'
  *     responses:
  *       200:
  *         description: Successfully updated item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/TestData_Quotes'
  *       400:
  *         description: Bad request.
  *       404:
  *         description: Item not found.
  *       500:
  *         description: General server error.
*/
router.patch('/:id',
  (req, res) => {
    const METHOD = MODULE + ' PATCH: "/": ';
    console.log(METHOD, req.body);

    try {
      if (recordFindById(req.params.id) < 0) {
        console.error(METHOD + STRINGS.ERROR_NOT_FOUND);
        return res.status(500).send(STRINGS.ERROR_NOT_FOUND);
      }

      const updatedRecord = updateRecord(req.params.id, req.body);
      if (updatedRecord) {
        console.log(METHOD + STRINGS.SUCCESS, updatedRecord);
        return res.send(updatedRecord);
      }

      console.error(METHOD + STRINGS.ERROR_BAD_REQUEST, req.body);
      return res.status(400).send(STRINGS.ERROR_BAD_REQUEST);
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);
      return res.status(500).send(err);
    }
  }
);


/** Handle DELETE requests to '/:id'
  * @swagger
  * /test/{id}:
  *   delete:
  *     summary: Delete a specific item.
  *     tags: [Test]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: number
  *         required: true
  *         description: UUID for the required item.
  *     responses:
  *       200:
  *         description: Successfully deleted item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/TestData_Quotes'
  *       404:
  *         description: Item not found.
  *       500:
  *         description: General server error.
*/
router.delete('/:id',
  (req, res) => {
    const METHOD = MODULE + ` DELETE: "/${req.params.id}": `;
    console.log(METHOD);

    try {
      if (recordFindById(req.params.id) < 0) {
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


/** Find a record by ID.
  * @param {number} id Record ID.
  * @returns {number} Record index or -1 if not found.
*/
function recordFindById(id) {
  const METHOD = MODULE + ' recordFindById(): ';
  console.debug(METHOD, id);

  return myTestData.findIndex(
    r => r.id == id
  );
}


/** Insert a new record..
  * @param {record} record Record to insert.
  * @returns {record | null} If success returns record else null.
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


/** Update a record..
  * @param {number} id ID of record to update.
  * @param {record} record New record values.
  * @returns {record | null} If success returns record else null.
*/
function updateRecord(id, record) {
  const METHOD = MODULE + ' updateRecord(): ';
  console.debug(METHOD, record);

  const index = recordFindById(id);
  if (index < 0) {
    return null;
  }

  // NOTE: Do not update id.
  record.author && (myTestData[index].author = record.author);
  record.quote && (myTestData[index].quote = record.quote);

  return myTestData[index];
}


// Export this router.
export default router;
