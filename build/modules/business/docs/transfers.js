"use strict";
/**
 * Post track
 * @openapi
 * /business/transfers:
 *    put:
 *      tags:
 *        - Business/Transfers
 *      summary: "Transfer"
 *      description: Transfer
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: username
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: amountMoney
 *         schema:
 *         type: number
 *         required: true
 *       - in: query
 *         name: amountPoints
 *         schema:
 *         type: number
 *         required: true
 *       - in: query
 *         name: categoryId
 *         schema:
 *         type: number
 *         required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
/**
 * Post track
 * @openapi
 * /business/transfers/send:
 *    put:
 *      tags:
 *        - Business/Send
 *      summary: "Send points"
 *      description: Send points
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: username
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: amount
 *         schema:
 *         type: number
 *         required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
/**
 * Post track
 * @openapi
 * /business/transfers/transactions:
 *    get:
 *      tags:
 *        - Business/Transfers
 *      summary: "Get my transactions"
 *      description: Get my transactions
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
/**
 * Post track
 * @openapi
 * /business/transfers/verify/{username}:
 *    get:
 *      tags:
 *        - Business/Transfers
 *      summary: "Verify username"
 *      description: Verify username
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: path
 *         name: username
 *         schema:
 *         type: string
 *         required: true
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
/**
 * Post track
 * @openapi
 * /business/transfers/transactions/{id}:
 *    get:
 *      tags:
 *        - Business/Transfers
 *      summary: "Get transactions by id"
 *      description: Get transactions by id
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
