const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
  const tagData= await Tag.findAll({
    include: [{model:Product}]
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try{
  const tagData =await Tag.findByPk({
    include: [{model: Product}]
  });
  if(!tagData){
  res.status(400).json({message: 'Not tag found by that id'})
  return
} res.status(200).json(tagData);
}catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    console.log("Tag Created")
    return res.json(newTag);
  } catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    Tag.update(
      {
        id:req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
