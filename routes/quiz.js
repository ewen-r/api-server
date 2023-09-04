/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/

import express from "express";
import * as STRINGS from "../strings.js";
import { quizTestData } from "./test_data.js";

/** Name of this module. */
const MODULE = 'QUIZ';

// Get router.
const router = express.Router();

// Use local copy of data.
let myTestData = [...quizTestData];


/**
  * @swagger
  *   tags:
  *     name: Quiz
  *     description: Quiz API end-point.
 */


/**
  * @swagger
  *   definitions:
  *     OriginatorInfo:
  *       type: object
  *       required:
  *         - username
  *         - createDate
  *         - modifyDate
  *       properties:
  *         userId:
  *           type: string
  *           description: ID of creator.
  *         username:
  *           type: string
  *           description: Username of creator.
  *         createDate:
  *           type: string
  *           description: Date this item was created.
  *         modifyDate:
  *           type: string
  *           description: Date this item was last modified.
  *     QDifficulty:
  *       type: string
  *       enum:
  *         - Easy
  *         - Medium
  *         - Difficult
  *         - Impossible
  *       description: Quiz/question difficulty.
  *     QType:
  *       type: string
  *       enum:
  *         - True or False
  *         - Multiple Choice
  *       description: Quiz/Question type.
  *     Question:
  *       type: object
  *       required:
  *         - uuid
  *         - originatorInfo
  *         - topic
  *         - questionType
  *         - difficulty
  *         - statement
  *         - answer
  *         - multiChoiceOptions
  *       properties:
  *         uuid:
  *           type: string
  *           description: Unique ID for item.
  *         originatorInfo:
  *           $ref: '#/definitions/OriginatorInfo'
  *         topic:
  *           type: string
  *           description: Question topic.
  *         questionType:
  *           $ref: '#/definitions/QType'
  *           type: string
  *         difficulty:
  *           $ref: '#/definitions/QDifficulty'
  *         statement:
  *           type: string
  *           description: Text body of this question.
  *         answer:
  *           type: string
  *           description: The answer to this question.
  *         multiChoiceOptions:
  *           type: array
  *           items:
  *             type: string
  *             description: Multiple choice options.
*/


/**
  * @swagger
  *   components:
  *     schemas:
  *       QuizSummary:
  *         type: object
  *         required:
  *           - uuid
  *           - title
  *           - originatorInfo
  *           - tags
  *           - difficulty
  *           - questionTypes
  *         properties:
  *           uuid:
  *             type: string
  *             description: Unique ID for item.
  *           title:
  *             type: string
  *             description: Quiz title.
  *           originatorInfo:
  *               $ref: '#/definitions/OriginatorInfo'
  *           tags:
  *             type: array
  *             items:
  *               type: string
  *               description: e.g 'Sport', 'General Knowledge', 'History' etc.
  *           difficulty:
  *               $ref: '#/definitions/QDifficulty'
  *           questionTypes:
  *               $ref: '#/definitions/QType'
  *       Quiz:
  *         type: object
  *         required:
  *           - uuid
  *           - title
  *           - originatorInfo
  *           - tags
  *           - difficulty
  *           - questions
  *           - questionTypes
  *         properties:
  *           uuid:
  *             type: string
  *             description: Unique ID for item.
  *           title:
  *             type: string
  *             description: Quiz title.
  *           originatorInfo:
  *               $ref: '#/definitions/OriginatorInfo'
  *           tags:
  *             type: array
  *             items:
  *               type: string
  *               description: e.g 'Sport', 'General Knowledge', 'History' etc.
  *           difficulty:
  *               $ref: '#/definitions/QDifficulty'
  *           questions:
  *             type: array
  *             items:
  *               $ref: '#/definitions/Question'
  *           questionTypes:
  *               $ref: '#/definitions/QType'

*/


/**
  * @swagger
  *   tags:
  *     name: Quiz
  *     description: Quiz API end-point.
*/


/** Handle GET requests to '/'
  * @swagger
  * /quiz:
  *   get:
  *     summary: Retrieve the summary list of all Quiz items.
  *     tags: [Quiz]
  *     responses:
  *       200:
  *         description: Successfully retrieved all items.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#components/schemas/QuizSummary'
  *       500:
  *         description: General server error.
*/
router.get('/',
  (req, res) => {
    const METHOD = MODULE + ' GET: "/": ';
    console.log(METHOD, req.body);

    try {

      const retData = myTestData.map(
        quiz => {
          return {
            uuid: quiz.uuid,
            title: quiz.title,
            originatorInfo: quiz.originatorInfo,
            tags: quiz.tags,
            difficulty: quiz.difficulty,
            questionTypes: quiz.questionTypes
          };
        }
      );

      console.log(METHOD + STRINGS.SUCCESS, retData);
      return res.send(retData);
    } catch (err) {
      console.error(METHOD + ERROR, err);
      return res.status(500).send(err);
    }
  }
);


/** Handle GET requests to '/:id'
  * @swagger
  * /quiz/{id}:
  *   get:
  *     summary: Retrieve a specific Quiz item.
  *     tags: [Quiz]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: UUID for the required item.
  *     responses:
  *       200:
  *         description: Successfully retrieved item.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#components/schemas/Quiz'
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
        r => r.uuid == req.params.id
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


// Export this router.
export default router;
