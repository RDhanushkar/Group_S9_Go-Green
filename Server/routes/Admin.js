const express = require('express');
var router = express.Router();
var TipController = require('../Controllers/Tip');
var diseaseController = require('../Controllers/Disease');
var fileUpload = require('../Middleware/file-upload');

router.get('/cropTips/:tipId', TipController.getTip);
router.get('/getTips/:cropName', TipController.getTipsByCropName);

router.post('/createTip', TipController.createTip);
router.patch('/cropTips/update/:tipId', TipController.updateTipsByCropName);
router.delete('/cropTips/delete/:tipId', TipController.deleteTipByCropName);

router.post('/createDisease',fileUpload.single('image') ,diseaseController.createDisease);
router.get('/cropDisease/:diseaseId', diseaseController.getDisease);
router.get('/getDiseases/:cropName', diseaseController.getDiseasesByCropName);
router.delete(
	'/CropDiseases/delete/:diseaseId',
	diseaseController.deleteDiseaseByCropName
);
router.patch(
	'/CropDiseases/update/:diseaseId',
	diseaseController.updateDiseaseByCropName
);

module.exports = router;
