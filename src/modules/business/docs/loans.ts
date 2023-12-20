/**
 * Post track
 * @openapi
 * /business/loans/maxLoan:
 *    get:
 *      tags:
 *        - Business/Loans
 *      summary: "Get max loan by user"
 *      description: Get max loan by user
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      security:
 *       - bearerAuth: []
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
 * /business/loans/:
 *    get:
 *      tags:
 *        - Business/Loans
 *      summary: "Get loans by user"
 *      description: Get loans by user
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *      security:
 *       - bearerAuth: []
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
 * /business/loans/:
 *    post:
 *      tags:
 *        - Business/Loans
 *      summary: "Post new loan "
 *      description: Post new loan
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
 *                $ref: "#/components/schemas/newLoan"
 *      security:
 *       - bearerAuth: []
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
 * /business/loans/{id}:
 *    patch:
 *      tags:
 *        - Business/Loans
 *      summary: "Approves user to take loans"
 *      description: Approves user to take loans
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
 *       - bearerAuth: []
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
 * /business/loans/payLoan/{id}:
 *    patch:
 *      tags:
 *        - Business/Loans
 *      summary: "Pay loan"
 *      description: Pay loan
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
 *       - bearerAuth: []
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/200"
 *        '400':
 *          $ref: "#/components/responses/400"
 *        '422':
 *          $ref: "#/components/responses/422"
 */
