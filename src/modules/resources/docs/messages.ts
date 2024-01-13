/**
 * Post track
 * @openapi
 * /resources/messages:
 *    get:
 *      tags:
 *        - Resources/Messages
 *      summary: "List messages"
 *      description: List messages
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
 * /resources/messages:
 *    post:
 *      tags:
 *        - Resources/Messages
 *      summary: "Create messages"
 *      description: Create messages
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
 *                $ref: "#/components/schemas/newMessage"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
