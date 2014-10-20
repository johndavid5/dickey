use playground

db.users.insert({name: 'Moe', description: 'Big Boss', line: "I'll put off murdering you til you collect your paychecks!", email: 'moe@yahoo.com',  roles: ['admin', 'operations']});
db.users.insert({name: 'Larry', description: 'Meaningless Goof', line: "No, Moe!", email: 'larry@yahoo.com', roles: ['operations']});
db.users.insert({name: 'Shemp', description: 'Possum Puss', line: "Meep!  Meep!  Meep", email: 'shemp@yahoo.com', roles: ['operations']});
