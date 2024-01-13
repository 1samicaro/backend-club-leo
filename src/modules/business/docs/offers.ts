/**
 * Post track
 * @openapi
 * /business/offers:
 *    get:
 *      tags:
 *        - Business/Offers
 *      summary: "Get offers"
 *      description: Get offers
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
 * /business/offers:
 *    post:
 *      tags:
 *        - Business/Offers
 *      summary: "Create offers"
 *      description: Create offers
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
 *                $ref: "#/components/schemas/newOffer"
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
 * /business/offers/byCity/{CityId}:
 *    get:
 *      tags:
 *        - Business/Offers
 *      summary: "Get offers by city"
 *      description: Get offers by city
 *      parameters:
 *       - in: header
 *         name: Version
 *         schema:
 *         type: string
 *         required: true
 *       - in: path
 *         name: CityId
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
