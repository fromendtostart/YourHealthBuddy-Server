import Express from "express";
import { getData, addData, updateData, addPlan, fetchPlans, fetchInsights } from "../controllers/dataController.js";
import protect from "../middlewares/authMiddleware.js"


const router = Express.Router()

router.get('/fetchplans', protect, fetchPlans);

router.get('/fetchinsights', protect, fetchInsights);

router.get('/fetchdata', protect, getData);

router.post('/add', protect, addData);

router.post('/addPlan', protect, addPlan)

router.put('/update', protect, updateData);



export default router;