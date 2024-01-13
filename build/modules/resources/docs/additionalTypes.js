"use strict";
/**
 * Post track
 * @openapi
 * /resources/additionalTypes:
 *    get:
 *      tags:
 *        - Resources/AdditionalTypes
 *      summary: "List additional types"
 *      description: List additional types
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: PersonTypeId
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
 * /resources/additionalTypes:
 *    post:
 *      tags:
 *        - Resources/AdditionalTypes
 *      summary: "Create additional types"
 *      description: Create additional types
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
 *                $ref: "#/components/schemas/newAdditionalType"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
