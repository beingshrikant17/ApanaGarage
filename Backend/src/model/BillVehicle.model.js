import mongoose from "mongoose";

const billVehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  billNo: {
    type: String,
    required: true
  },
  modeOfPayment: {
    type: String,
    required: true
  },
  rows: [{
    srNo: {
      type: Number,
      required: true
    },
    serviceType: {
      type: String,
      required: true
    },
    charges: {
      type: Number,
      required: true
    }
  }],
  garageName: {
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
  garageOwnerName: {
    type: String,
    required: true
  },
  vehicleOwnerMobileNo: {
    type: String,
    required: true
  },
  vehicleOwnerName: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleOwnerAddress: {
    type: String,
    required: true
  }
  ,
  totalCharges: {
    type: String,
    required: true
  }
});

export default mongoose.model("billVehicleSchema", billVehicleSchema);
