"use strict";
/**
 * Post track
 * @openapi
 * /resources/personTypes:
 *    get:
 *      tags:
 *        - Resources/PersonTypes
 *      summary: "List person types"
 *      description: List person types
 *      parameters:
 *       - in: header
 *         name: Version
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
 * /resources/personTypes:
 *    post:
 *      tags:
 *        - Resources/PersonTypes
 *      summary: "Create person types"
 *      description: Create person types
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/newPersonType"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
