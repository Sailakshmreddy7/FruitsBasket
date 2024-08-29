const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URL;
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected");
      const fetched_data = mongoose.connection.db.collection("fruitsData");
      fetched_data.find({}).toArray(async function (err, data) {
        const fruitsCategory = await mongoose.connection.db.collection(
          "fruitsCategory"
        );

        fruitsCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.fruitsData = data;
            global.fruitsCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
