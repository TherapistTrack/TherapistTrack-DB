db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('File')

db.runCommand({
  collMod: 'File',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'record',
        'template',
        'name',
        'category',
        'location',
        'pages',
        'created_at',
        'metadata'
      ],
      properties: {
        record: {
          bsonType: 'objectId',
          description: 'Reference to the record this file belongs to'
        },
        template: {
          bsonType: 'objectId',
          description: 'Reference the template this file follows'
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        category: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        location: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        pages: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        created_at: {
          bsonType: 'date',
          description: 'must be a string and is required'
        },
        metadata: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['name', 'type', 'value', 'required'],
            properties: {
              name: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              type: {
                bsonType: 'string',
                enum: ['SHORT_TEXT', 'TEXT', 'DATE', 'NUMBER', 'FLOAT', 'CHOICE'],
                description:
                  'Type of data that will be stored on this property (string, date...)'
              },
              options: {
                bsonType: 'array',
                items: {
                  bsonType: 'string'
                }
              },
              value: {},
              required: {
                bsonType: 'bool',
                description: 'Orders if this field is required or not'
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'moderate'
})
