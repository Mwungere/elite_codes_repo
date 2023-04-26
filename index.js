// const { TIMESTAMP } = require('mysql/lib/protocol/constants/types');
const Sequelize = require('sequelize');
// const User = require('./models/user')

const { DataTypes } = Sequelize

const sequelize = new Sequelize('sequelize', 'root', '', {
    dialect: 'mysql'
});


sequelize.authenticate().then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.log('Error connecting to the db');

})

// sequelize.sync({alter: true})  // this is to sync all the models at once

// sequelize.drop({match: /_test$/}).then(() => {
//     console.log('deleted');
// }).catch((err) => {
//     console.log('not deleted');
// })

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 18
    },
    wittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    freezeTableName: true, // disable modification of table names like pluralisation
    timestamps: false
})

// regular expressions eg: /wittcode/i ;look for all witcode instances in a case insensitive
// eg2: /[h]/g ; look for all occurrences of letter h
// eg3: /[h]/ ; look for the 1st occurrency of letter h and stop
// eg4: /\d/g ; find all occurrences of digits 
//eg5: /_test$/ ;all tables that end in test

// console.log(sequelize.models.user);


///////!!!!!!! Adding data to the database

User.sync({alter: true}).then(() => {
//    const user =  User.build({username: 'Eli Lay', password: 'elilay@12345', age: 16, wittCodeRocks: true})
//    if (user.age > 18) {
//     user.old = true 
    
//    }
   return User.bulkCreate([{
    username: 'Mwungere Elite',
    password: 'elite@12345',
    age: 25,
    wittCodeRocks: false
   },
   {
    username: 'Arakaza Elyse',
    password: 'elyse@12345',
    age: 20,
    wittCodeRocks: false
   }
])
}).then((data) => {
    // data.decrement({age: 2}) // or increment
    data.forEach((data) => {
        const json = data.toJSON()
        console.log(json);

    })
   

}).catch((err) => {
    console.log(err);
})

// / finished adding data to the databasse


