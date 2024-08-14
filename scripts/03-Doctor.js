db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('Doctor')

db.runCommand({
  collMod: 'Doctor',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'user',
        'collegiateNumber',
        'specialty',
      ],
      properties: {
        user: {
          bsonType: 'objectId',
          description:
            'Reference to User collection this doctor has credential into'
        },
        collegiateNumber: {
          bsonType: 'string'
        },
        specialty: {
          bsonType: 'string'
        },
      }
    }
  },
  validationLevel: 'moderate'
})
