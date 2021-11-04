//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');
const {apikey} = process.env
const temperament = require('./src/models/Temperament.js');
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

 const api = await axios.get(`https://api.thedogapi.com/v1/breeds?${apikey}`) //de esta manera al iniciar trae todos los generos
 const temArray = []
 api.data.map( (e) => {
   if(e.temperament){
     temArray.push( e.temperament.split(','))
   }
})
// console.log(temArray)
let apiRes = []
for ( let i = 0; i < temArray.length; i++){
  apiRes = apiRes.concat(temArray[i])
}
let result = apiRes.filter((item,index)=>{
  return apiRes.indexOf(item.trim()) === index;
})
result = result.sort().map(e => {
  return {
    name: e
  }
})
  

await Temperament.bulkCreate(result)

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
