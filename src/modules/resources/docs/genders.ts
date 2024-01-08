/**
 * Post track
 * @openapi
 * /resources/genders:
 *    get:
 *      tags:
 *        - Resources/Genders
 *      summary: "List genders"
 *      description: List genders
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
 * /resources/genders:
 *    post:
 *      tags:
 *        - Resources/Genders
 *      summary: "Create genders"
 *      description: Create genders
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
 *                $ref: "#/components/schemas/newGender"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
