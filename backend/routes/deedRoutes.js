// backend/routes/deedRoutes.js
const express = require('express');
const multer = require('multer');
const deedController = require('../controllers/deedController');

const router = express.Router();
const upload = multer(); // Use multer for file handling

// Upload route
router.post('/upload/:id', upload.single('file'), deedController.uploadDeed);

// Download route (uses deedId, not fileId)
router.get('/download/:id', deedController.downloadDeed);

module.exports = router;
