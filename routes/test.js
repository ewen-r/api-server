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


/* Handle GET requests to '/'
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


/* Handle POST requests to '/'
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

        return res.status(500).send(STRINGS.ERROR_BAD_REQUEST);
      }
    } catch (err) {
      console.error(METHOD + STRINGS.ERROR_CATCH, err);

      return res.status(500).send(err);
    }
  }
);



/* Handle GET requests to '/:id'
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

      return res.status(500).send(STRINGS.ERROR_NOT_FOUND);
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
