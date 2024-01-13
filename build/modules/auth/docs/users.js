"use strict";
/**
 * Post track
 * @openapi
 * /auth/users:
 *    get:
 *      tags:
 *        - Auth/Users
 *      summary: "List users"
 *      description: List users
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
 * /auth/users:
 *    post:
 *      tags:
 *        - Auth/Users
 *      summary: "Create users"
 *      description: Create users
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
 *                $ref: "#/components/schemas/newUser"
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
 * /auth/users/{id}:
 *    get:
 *      tags:
 *        - Auth/Users
 *      summary: "User info"
 *      description: User info
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
/**
 * Post track
 * @openapi
 * /auth/users:
 *    patch:
 *      tags:
 *        - Auth/Users
 *      summary: "Edit users"
 *      description: Edit users
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/patchUser"

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
 * /auth/users/descendants:
 *    get:
 *      tags:
 *        - Auth/Users
 *      summary: "User descendants"
 *      description: User descendants
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
 * /auth/users/search:
 *    post:
 *      tags:
 *        - Auth/Users
 *      summary: "Search users"
 *      description: Search users
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
 *                $ref: "#/components/schemas/searchUsers"
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
 * /auth/users/ban/{id}:
 *    patch:
 *      tags:
 *        - Auth/Users
 *      summary: "Ban user"
 *      description: Ban user
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
/**
 * Post track
 * @openapi
 * /auth/users/verify/{id}:
 *    patch:
 *      tags:
 *        - Auth/Users
 *      summary: "Verify user"
 *      description: Verify user
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
/**
 * Post track
 * @openapi
 * /auth/users/:
 *    delete:
 *      tags:
 *        - Auth/Users
 *      summary: "Delete user"
 *      description: Delete user
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
 * /auth/users/reset/{username}:
 *    get:
 *      tags:
 *        - Auth/Users/Reset
 *      summary: "Reset user password"
 *      description: Reset user password
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
 * /auth/users/resetVerify/{username}/{id}:
 *    get:
 *      tags:
 *        - Auth/Users/Reset
 *      summary: "Reset user password"
 *      description: Reset user password
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
 *       - in: path
 *         name: id
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
