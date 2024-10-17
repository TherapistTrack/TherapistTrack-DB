db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('FileTemplate')

db.runCommand({
  collMod: 'FileTemplate',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['doctor', 'lastUpdate', 'name', 'fields'],
      properties: {
        doctor: {
          bsonType: 'objectId',
          description: 'Doctor that owns the template'
        },
        lastUpdate: {
          bsonType: 'date',
          description: 'Last time the doctor updated the template'
        },
        name: {
          bsonType: 'string',
          description: 'Template name'
        },
        fields: {
          bsonType: 'array',
          description: 'Fields that a patient most have.',
          items: {
            bsonType: 'object',
            required: ['name', 'type', 'required'],
            properties: {
              name: {
                bsonType: 'string',
                description: 'Name of the field property'
              },
              type: {
                bsonType: 'string',
                enum: [
                  'SHORT_TEXT',
                  'TEXT',
                  'DATE',
                  'NUMBER',
                  'FLOAT',
                  'CHOICE'
                ],
                description:
                  'Type of data that will be stored on this property (string, date...)'
              },
              options: {
                bsonType: 'array',
                description:
                  "if type propertie's = CHOICE, this field provides options that can be choosen",
                items: {
                  bsonType: 'string'
                }
              },
              required: {
                bsonType: 'bool',
                description: 'Orders if this field is required or not'
              },
              description: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'moderate'
})
