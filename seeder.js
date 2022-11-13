const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv')

dotenv.config({ path:'./config/config.env'});

//Load models
const Menu = require('./models/Menu');
const User = require('./models/User');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

//Read JSON files
const menus = JSON.parse(fs.readFileSync(`${__dirname}/_data/menu.json`,`utf-8`)
);

const user = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

//Import into DB
const importDB = async() => {
    try{
        await Menu.create(menus);
        await User.create(users);
        console.log('Database succsessfully imported..'.green.inverse);
        process.exit();
    }
    catch(err){
        console.error(err);
    }
}

//Delete data
const deleteDB = async() => {
    try{
        await Menu.deleteMany();
        await User.deleteMany();
        console.log('Database destroyed..'.red.inverse);
        process.exit();
    }
    catch(err){
        console.error(err);
    }
};

//Apabila mengetik node seeder -i untuk mengimport data dan node seeder -d untuk menghapus semua data
if(process.argv[2] === '-i'){
    importDB();
}
else if(process.argv[2] === '-d'){
    deleteDB();
}
