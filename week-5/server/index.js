const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Mongo_URI = process.env.Mongo_URI;
const PORT = process.env.PORT;
// const corsOption = {
//   origin: "http://localhost:5173/",
// };

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const con = await mongoose.connect(Mongo_URI);
  console.log(con);

  const businessCardSchema = new mongoose.Schema({
    name: String,
    description: String,
    interests: [String],
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },
  });

  const BusinessCardModel = mongoose.model("businessCard", businessCardSchema);

  app.post('/postCard', async (req, res) => {
    const businessCardJson = req.body;
    console.log(businessCardJson)
    const businessCard = new BusinessCardModel(businessCardJson);
    await businessCard.save();
    res.status(200).json({message: "Added a new business card"});
  });

  app.get('/getCards', async (req, res) => {
    const businessCardJson = await BusinessCardModel.find();
    res.status(200).json(businessCardJson);
  });

  app.listen(PORT, () => {
    console.log("connected on PORT:" + PORT);
  });
}

main();
