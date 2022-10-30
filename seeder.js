const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv')

dotenv.config({ path:'./config/config.env'});

const Menu = require('./models/Menu');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const menus = JSON.parse(fs.readFileSync(`${__dirname}/_data/menu.json`,`utf-8`)
);

const importDB = async() => {
    try{
        await Menu.create(menus);

        console.log('Database succsessfully imported..'.green.inverse);
        process.exit();
    }
    catch(err){
        console.error(err);
    }
}

const deleteDB = async() => {
    try{
        await Menu.deleteMany();

        console.log('Database destroyed..'.red.inverse);
        process.exit();
    }
    catch(err){
        console.error(err);
    }
};

if(process.argv[2] === '-i'){
    importDB();
}
else if(process.argv[2] === '-d'){
    deleteDB();
}
