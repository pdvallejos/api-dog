const { Router } = require('express');
const { v4: uuidv4 } = require("uuid")
const { Dog } = require('../db')
const router = Router()



router.post('/',  async (req, res) => {
   const { name, height, weight, life_span, temperament, image } = req.body
try {
  let newDog = await Dog.create({
    id: uuidv4(),
    name,
    height,
    weight,
    life_span,
    image
   })
//    console.log(newDog)
   let idDog= newDog.id
   let dog = await Dog.findByPk(idDog)
   let apiTemp = await dog.addTemperaments(temperament)
   
  
   res.json('Your Dog has been created successfully')

} catch (error) {
  console.log(error)
}
   
})


module.exports = router;