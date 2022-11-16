const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//Load models
const Menu = require("./models/Menu");
const User = require("./models/User");

//Load sample data
const menus = require("./data/menus");
const users = require("./data/users");

//Connect to DB
const connectDB = require("./config/db");
connectDB();

const user = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

//Import into DB
const importDB = async () => {
  try {
    await Menu.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleMenus = menus.map((menu) => {
      return { ...menu, user: adminUser };
    });

    await Menu.insertMany(sampleMenus);

    console.log("Database succsessfully imported!");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

//Delete data
const deleteDB = async () => {
  try {
    await Menu.deleteMany();
    await User.deleteMany();
    console.log("Database destroyed.".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }

};

//Apabila mengetik node seeder -i untuk mengimport data dan node seeder -d untuk menghapus semua data
if (process.argv[2] === "-i") {
  importDB();
} else if (process.argv[2] === "-d") {
  deleteDB();
}
