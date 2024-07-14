db = db.getSiblingDB(process.env.DB_NAME)

db.createUser({
  user: process.env.DB_USER,
  pwd: process.env.DB_USER_PASSWORD,
  roles: [{
    role: 'dbOwner',
    db: process.env.DB_NAME
  }]
})