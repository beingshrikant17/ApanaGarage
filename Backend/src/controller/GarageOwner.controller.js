import VehicleRegister from '../model/ResisterVehicle.model.js';
import billVehicleSchema from '../model/BillVehicle.model.js'
import AllVehicleDetailSchema from '../model/AllVehicleData.model.js'
import billNumberSchema from '../model/BillNo.model.js'
import ApanaGarage from '../model/ApanaGarageCreateAccount.model.js'
import ApanaGarageCreateAccountModel from '../model/ApanaGarageCreateAccount.model.js';

export async function getGarageDetails(req, res) {
    try {
      const { garageEmail } = req.query;
  
      // Retrieve the garage details
      const garageDetails = await ApanaGarage.findOne({ garageEmail});
  
      if (!garageDetails) {
        return res.status(404).json({ error: 'Garage details not found' });
      }
      res.status(200).json(garageDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving garage details' });
    }
  }

export async function generateBillNumber(req, res) 
{
    try 
    {
      const lastBillNumber = await billNumberSchema.findOne().sort({ billNo: -1 });

      const newBillNumber = lastBillNumber ? lastBillNumber.billNo + 1 : 1;

      res.json({ newBillNumber: newBillNumber });

    //   console.log(billNo);
      console.log(newBillNumber);
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating bill number' });
    }
  }

  async function saveBillNumber() 
  {

    try {
        const lastBillNumber = await billNumberSchema.findOne().sort({ billNo: -1 });

        const newBillNumber = lastBillNumber ? lastBillNumber.billNo + 1 : 1;

        const billNumber = new billNumberSchema({ billNo: newBillNumber });
    
        await billNumber.save();
    
        return newBillNumber;
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving bill number' });
      }
  }

  async function registerVehicle(req, res) {
    try {
      const { vehicleOwnerName, vehicleOwnerMobileNo, vehicleOwnerAddress, vehicleNo, vehicleType } = req.body;
      const existingVehicle = await VehicleRegister.findOne({ vehicleNo });
  
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle already exists' });
      }
  
      const newVehicleRegister = new VehicleRegister({
        vehicleOwnerName,
        vehicleOwnerMobileNo,
        vehicleOwnerAddress,
        vehicleNo,
        vehicleType
      });
  
      const response = await VehicleRegister.create(newVehicleRegister);
  
      return res.status(200).json({ message: 'Vehicle Registered Successfully', data: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating Garage Owner entry' });
    }
  }
  
export async function registerBillVehicle (req, res) 
{
    try 
    {
        const{vehicleNo,date,billNo,modeOfPayment,rows,totalCharges,garageEmail} = req.body;
        try
        {
            const vehicle = await VehicleRegister.findOne({ vehicleNo });
            if (!vehicle) 
            {
                return res.status(404).json({ message: 'Vehicle not found' });
            }
            else
            {
                const garageDetails = await ApanaGarageCreateAccountModel.find({ garageEmail });
                if (!garageDetails || garageDetails.length === 0) 
                {
                    return res.status(404).json({ message: 'Vehicle not found' });
                } 
                else 
                {
                    const firstGarage = garageDetails[0];
                    const {garageName,ownerName,garageAddress,garageMobileNo,} = firstGarage;
                    const {vehicleType,vehicleOwnerMobileNo,vehicleOwnerName,vehicleOwnerAddress} = vehicle;
                    const alldata = new AllVehicleDetailSchema({vehicleNo,date,billNo,modeOfPayment,rows,      garageName,garageAddress,garageEmail,garageMobileNo,garageOwnerName:ownerName,vehicleOwnerMobileNo:vehicleOwnerMobileNo,vehicleOwnerName:vehicleOwnerName,vehicleType,totalCharges,vehicleOwnerAddress,vehicleType,ownerName}); 
                    const newresponse = await AllVehicleDetailSchema.create(alldata);
                    if (newresponse) 
                    {
                        const newresponse = await AllVehicleDetailSchema.findOne({billNo});
                        const {garageName,garageAddress,garageMobileNo,garageOwnerName,vehicleOwnerMobileNo,vehicleOwnerName,vehicleType,vehicleOwnerAddress} = newresponse;

                        const newBillVehicle = new billVehicleSchema({vehicleNo,date,billNo,modeOfPayment,rows,garageName,garageAddress,garageEmail,totalCharges,garageMobileNo,garageOwnerName,vehicleOwnerMobileNo,vehicleOwnerName,vehicleType,vehicleOwnerAddress});

                        const response = await billVehicleSchema.create(newBillVehicle);
                        const response1 = await saveBillNumber();
                        return res.status(200).json({message: "Account Created Successfully", data: response});
                    }
                    else
                    {
                        console.log('Failed to create data in AllVehicleDetailSchema');
                    }
                }
            }
        } 
        catch (error) 
        {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while registering the bill vehicle' });
    }
};

  export async function showvehicles(req, res) 
  {
    try 
    {
    const{garageEmail} = req.query;
    console.log(garageEmail);
      const billVehicles = await billVehicleSchema.find({garageEmail});
      const data = billVehicles.map((billVehicle) => {
        return {
          billNo: billVehicle.billNo,
          vehicleNo: billVehicle.vehicleNo,
          ownerName: billVehicle.vehicleOwnerName,
          mobileNo: billVehicle.vehicleOwnerMobileNo,
          vehicleType:billVehicle.vehicleType,
          modeOfPayment:billVehicle.modeOfPayment,
          date:billVehicle.date,
          totalCharges:billVehicle.totalCharges,
          vehicleOwnerAddress:billVehicle.vehicleOwnerAddress
        };
      });
      return res.status(200).json({ data });
    }
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  export async function searchVehicles(req, res) 
  {
    const { searchBy, searchQuery } = req.query;
    try 
    {
      let query = {};
       switch (searchBy) 
       {
        case "mobile-no":
          query = { vehicleOwnerMobileNo: searchQuery };
          break;
        case "vehicle-no":
          query = { vehicleNo: searchQuery };
          break;
        case "owner-name":
          query = { vehicleOwnerName: searchQuery };
          break;
        case "bill-no":
          query = { billNo: searchQuery };
          break;
        default:
          return res.status(400).json({ message: "Invalid searchBy parameter" });
      }
  
      const vehicles = await AllVehicleDetailSchema.find(query);
  
      if (vehicles.length === 0)
      {
        return res.status(404).json({ message: "No matching vehicles found" });
      }
      console.log("query="+vehicles[0].billNo)
      console.log(searchBy,searchQuery)
      console.log(vehicles[0].billNo);
      return res.status(200).json({ data: vehicles });
    } 
    catch (error) 
    {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  export async function displayBill(req, res) {
    try {
      const { billNo } = req.query;
  
      const vehicles = await AllVehicleDetailSchema.find({ billNo });
      if (vehicles.length > 0) 
      {
        console.log('Vehicle Details:', vehicles);
        res.status(200).json(vehicles);
      } 
      else 
      {
        console.log('No vehicles found');
        res.status(404).json({ message: 'No vehicles found' });
      }
    } 
    catch (error) 
    {
      console.error('Error searching vehicles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export default registerVehicle;