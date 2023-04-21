const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include:[{model: Product}]
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    console.log('Category Created')
    return res.json(newCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
