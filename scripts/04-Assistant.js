db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('Assistant')

db.runCommand({
  collMod: 'Assistant',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['user', 'startDate', 'DPI'],
      properties: {
        user: {
          bsonType: 'objectId',
          description:
            'Reference to User collection this doctor has credential into'
        },
        startDate: {
          bsonType: 'date',
          description: 'Date in which Assistant started to work'
        },
        endDate: {
          bsonType: 'date',
          description: 'Date in which Assistant end to work'
        },
        DPI: {
          bsonType: 'string',
          description: 'Assistant DPI'
        }
      }
    }
  },
  validationLevel: 'moderate'
})
