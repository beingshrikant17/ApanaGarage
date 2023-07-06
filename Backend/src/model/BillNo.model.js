import mongoose from "mongoose";

const billNumberSchema = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("BillNumber", billNumberSchema);