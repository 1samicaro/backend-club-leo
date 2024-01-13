"use strict";
/**
 * Post track
 * @openapi
 * /resources/categories:
 *    get:
 *      tags:
 *        - Resources/Categories
 *      summary: "List categories"
 *      description: List categories
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
 * /resources/categories:
 *    post:
 *      tags:
 *        - Resources/Categories
 *      summary: "Create categories"
 *      description: Create categories
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
 *                $ref: "#/components/schemas/newCategory"
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
/**
 * Post track
 * @openapi
 * /resources/categories/list/{categoryId}/{cityId}:
 *    get:
 *      tags:
 *        - Resources/Categories
 *      summary: "List users by category and city"
 *      description: List users by category and city
 *      parameters:
 *        - in: header
 *          name: Version
 *          schema:
 *          type: string
 *          required: true
 *        - in: path
 *          name: categoryId
 *          schema:
 *          type: string
 *          required: true
 *        - in: path
 *          name: cityId
 *          schema:
 *          type: string
 *          required: true
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
