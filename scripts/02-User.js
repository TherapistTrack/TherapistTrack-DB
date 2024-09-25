db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('User')

db.runCommand({
  collMod: 'User',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'names',
        'lastNames',
        'mails',
        'phones',
        'rol',
        'isActive'
      ],
      properties: {
        names: {
          bsonType: 'string',
          description: 'User names'
        },
        lastNames: {
          bsonType: 'string',
          description: 'User lastnames'
        },
        mails: {
          bsonType: 'array',
          description: 'Mails to contact this user',
          items: {
            bsonType: 'string'
          }
        },
        phones: {
          bsonType: 'array',
          description: 'Phones to contact this user',
          items: {
            bsonType: 'string'
          }
        },
        rol: {
          bsonType: 'string',
          description: "User's Rol on app"
        },
        roleDependentInfo : {
          bsonType: 'objectId',
          description: 'id of rol data info'
        },
        isActive: {
          bsonType: 'bool',
          description: "Is the user still usable?"
        }
      }
    }
  },
  validationLevel: 'moderate'
})
