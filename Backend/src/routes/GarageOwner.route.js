import express, { Router } from 'express'
import registerVehicle ,{registerBillVehicle,searchVehicles,showvehicles,generateBillNumber,getGarageDetails,displayBill}from '../controller/GarageOwner.controller.js';

const router = Router();
router.post('/registerVehicle', registerVehicle);
router.post('/billVehicle', registerBillVehicle);
router.get('/showVehicles',showvehicles);
router.get('/searchVehicles',searchVehicles);
router.get('/generateBillNumber',generateBillNumber);
router.get('/getGarageDetails',getGarageDetails);
router.get('/displayBill',displayBill);

export default router;

