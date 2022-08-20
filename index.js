const puppeteer = require('puppeteer');
const fs = require('fs');




// URL for data
const URL = "https://canmypeteatthis.com/what-can-hamsters-eat-your-ultimate-list/"

// const URL = "";


const getFoodName = (title) => {

   const begin = title.indexOf("Eat") + 4;

   const end = title.indexOf("?"); 

   const newStr =title.slice(begin, end); 

   return newStr; 


}

async function scrapeData() {
   
   try{
      const browser = await puppeteer.launch(); 

      const page = await browser.newPage();
      await page.goto(URL); 

      //59 list items 
      // fs.openSync('results.json', 'a'); 

      let results = "";
     

      const json = ""; 
      
      for (id = 1; id < 60; id++ ){
         const [title] = await page.$x(`//*[@id="lcp_instance_0"]/li[${id}]/a[1]`);

         const  srcTitle = await title.getProperty('textContent');
         const titleTxt = await srcTitle.jsonValue(); 
   
         const foodName = getFoodName(titleTxt); 

         const [el] = await page.$x(`//*[@id="lcp_instance_0"]/li[${id}]/div[1]`);

         const src = await el.getProperty('textContent');

         const srcTxt = await src.jsonValue(); 
   
         const object = {id, foodName, srcTxt}; 
         
         const jsonString = JSON.stringify(object);
         let final = results.concat(jsonString, ' , ' , '\n'); 
         
         // console.log(final);  
         fs.appendFile('results.json', final , function (err) {
            if (err) throw err;
            console.log('Saved!');
          }); 
      }



     browser.close(); 

   }

   catch (err){

      console.log(err);

   }
}


scrapeData();
