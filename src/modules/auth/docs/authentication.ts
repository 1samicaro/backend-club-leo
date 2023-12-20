/**
 * Post track
 * @openapi
 * /auth/authentication/login:
 *    post:
 *      tags:
 *        - Auth/Authentication
 *      summary: "Login"
 *      description: Login
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
 *                $ref: "#/components/schemas/login"
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
 * /auth/authentication/refresh:
 *    post:
 *      tags:
 *        - Auth/Authentication
 *      summary: "Refresh token"
 *      description: Refresh token
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: header
 *         name: refreshtoken
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
 * /auth/authentication/logout:
 *    post:
 *      tags:
 *        - Auth/Authentication
 *      summary: "Logout"
 *      description: Logout
 *      security:
 *        - bearerAuth: []
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
