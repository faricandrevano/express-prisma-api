import express from 'express';
import * as KelasController from '../controllers/KelasController.js';
const router = express.Router();

router.get('/',KelasController.getKelas);
router.post('/',KelasController.postKelas);
router.patch('/',KelasController.updateKelas);
router.delete('/:id',KelasController.deleteKelas);

export default router;