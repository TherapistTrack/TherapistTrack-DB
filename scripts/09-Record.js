db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('Record')

db.runCommand({
  collMod: 'Record',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['patient', 'doctor', 'createdAt'],
      properties: {
        patient: {
          bsonType: 'objectId',
          description: 'must be a string and is required'
        },
        doctor: {
          bsonType: 'objectId',
          description: 'must be a string and is required'
        },
        createdAt: {
          bsonType: 'date',
          description: 'must be a string and is required'
        }
      }
    }
  },
  validationLevel: 'moderate'
})
