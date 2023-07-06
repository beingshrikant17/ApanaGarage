import mongoose from 'mongoose';

const apanaGarageSchema = new mongoose.Schema({
  garageName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  garageAddress: {
    type: String,
    required: true
  },
  garageEmail: {
    type: String,
    required: true
  },
  garageMobileNo: {
    type: String,
    required: true
  },
  aboutUs: {
    type: String,
    required: true
  },
  garageType: {
    type: String,
    required: true
  },
  operatingHours: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("ApanaGarage", apanaGarageSchema);
