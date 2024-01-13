"use strict";
/**
 * Post track
 * @openapi
 * /resources/cities:
 *    get:
 *      tags:
 *        - Resources/Cities
 *      summary: "List cities by country"
 *      description: List cities by country
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: query
 *         name: CountryId
 *         schema:
 *         type: number
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
 * /resources/cities:
 *    post:
 *      tags:
 *        - Resources/Cities
 *      summary: "Create cities"
 *      description: Create cities
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
 *                $ref: "#/components/schemas/newCity"
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
