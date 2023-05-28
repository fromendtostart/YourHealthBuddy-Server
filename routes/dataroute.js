import Express from "express";
import { getData, addData, updateData } from "../controllers/dataController.js";

const router = Express.Router()

router.get('/', getData);

router.post('/', addData);

router.put('/:id', updateData);



export default router;