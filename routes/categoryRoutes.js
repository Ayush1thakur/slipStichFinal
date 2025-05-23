const express= require('express');
const { isUser, isAdmin } = require('../middleware/authM');
const { createCategory,updateCategory, getAllCategory,getCategory, deleteCategory } = require('../controllers/categoryC');
const router= express.Router();

// routes

// creating category
router.post('/create-category',isUser,isAdmin,createCategory);

// updating category
router.put('/update-category/:id',isUser,isAdmin,updateCategory);

// get category
router.get('/get-all-category',getAllCategory);

router.get('/get-category/:slug',getCategory)

// delete category
router.delete('/delete-category/:id',isUser,isAdmin,deleteCategory);

module.exports = router;