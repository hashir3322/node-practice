/**
 * @swagger
 * components:
 *  schemas:
 *      LoginDTO:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *          example: 
 *              username: "string"
 *              password: "pass"
 *  
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginResponseDTO:
 *          type: object
 *          required:
 *              - accessToken
 *          properties:
 *              accessToken:
 *                  type: string
 *          example: 
 *              accessToken: "string"
 *
 */


/**
 * @swagger
 * components:
 *  schemas:
 *      UserDTO:
 *          type: object
 *          required:
 *              - _id
 *              - username
 *              - roles
 *              - active
 *          properties:
 *              _id:
 *                  type: string
 *              username:
 *                  type: string
 *              roles:
 *                  type: array
 *                  items:
 *                      type: string 
 *              active:
 *                  type: boolean
 *          example: 
 *              _id: "string"
 *              username: "string"
 *              roles: ["string"]
 *              active: "true"
 *  
 */