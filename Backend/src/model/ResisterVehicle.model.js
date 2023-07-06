import mongoose from "mongoose";

const garageOwnerSchema = new mongoose.Schema({
  vehicleOwnerName: {
    type: String,
    required: true
  },
  vehicleOwnerMobileNo: {
    type: String,
    required: true
  },
  vehicleOwnerAddress: {
    type: String,
    required: true
  },
  vehicleNo: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  }
});

export default mongoose.model("VehicleRegister", garageOwnerSchema);
