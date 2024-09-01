db = db.getSiblingDB(process.env.DB_NAME)

db.createCollection('Record')

db.runCommand({
  collMod: 'Record',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['patient', 'doctor', 'createdAt'],
      properties: {
        doctor: {
          bsonType: 'objectId',
          description: 'Reference to the doctor this record belongs to'
        },
        template: {
          bsonType: 'objectId',
          description: 'Reference the template this record follows'
        },
        createdAt: {
          bsonType: 'date',
          description: 'must be a string and is required'
        },
        patient : {
          bsonType: 'object',
          required: ['names', 'lastNames', 'fields'],
          properties: {
            names: {
              bsonType: 'string',
              description: "Patient's names"
            },
            lastNames: {
              bsonType: 'string',
              description: "Patient's lastNames"
            },
            fields: {
              bsonType: 'array',
              description: 'Collection of fields, of a patient.',
              items: {
                bsonType: 'object',
                required: ['name', 'type', 'value', 'required'],
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
                  // OPTIONAL
                  options: {
                    bsonType: 'array',
                    description:
                      "if type propertie's = CHOICE, this field provides options that can be choosen",
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
      }
    }
  },
  validationLevel: 'moderate'
})
