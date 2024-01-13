"use strict";
/**
 * Post track
 * @openapi
 * /resources/documentTypes:
 *    get:
 *      tags:
 *        - Resources/DocumentTypes
 *      summary: "List document types by country and person type"
 *      description: List document types by country and person type
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
 *       - in: query
 *         name: PersonTypeId
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
 * /resources/documentTypes:
 *    post:
 *      tags:
 *        - Resources/DocumentTypes
 *      summary: "Create document types"
 *      description: Create document types
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
 *                $ref: "#/components/schemas/newDocumentType"
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
