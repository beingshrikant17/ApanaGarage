import ApanaGarage from'../model/ApanaGarageCreateAccount.model.js';

// Controller function to register a new ApanaGarage account
async function register (req, res) {
  try {
    const {
      garageName,
      ownerName,
      garageAddress,
      garageEmail,
      garageMobileNo,
      aboutUs,
      garageType,
      operatingHours,
      password
    } = req.body;

    // Create a new ApanaGarage object
    const newApanaGarage = new ApanaGarage({
      garageName,
      ownerName,
      garageAddress,
      garageEmail,
      garageMobileNo,
      aboutUs,
      garageType,
      operatingHours,
      password
    });

    console.log(newApanaGarage);
    const response = await ApanaGarage.create(newApanaGarage);
    return res.status(200).json({message: "Account Created Successfully", data: response});
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating ApanaGarage entry' });
  }
};

// Controller function to login with email and password
export async function login (req, res) 
{
  try {
    const { garageEmail, password } = req.query;

    const responce = await ApanaGarage.find({ garageEmail,password });
      let message = " Login successfull";
        if(responce.length === 0)
        {
            message = "invalid data";
        }
        return res.status(200).json({message});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

export default register;