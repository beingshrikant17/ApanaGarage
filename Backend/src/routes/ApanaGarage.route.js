import express, { Router } from 'express'
import register, { login } from '../controller/ApanaGarage.controller.js';

const router = Router();
router.post('/createAccount', register);
router.get('/login', login);
export default router;

