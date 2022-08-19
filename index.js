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
      fs.openSync('results.json', 'w'); 

      results = String(); 
      
      for (id = 1; id < 60; id++ ){
         const [title] = await page.$x(`//*[@id="lcp_instance_0"]/li[${id}]/a[1]`);

         const  srcTitle = await title.getProperty('textContent');
         const titleTxt = await srcTitle.jsonValue(); 
   
         const foodName = getFoodName(titleTxt); 

         const [el] = await page.$x(`//*[@id="lcp_instance_0"]/li[${id}]/div[1]`);

         const src = await el.getProperty('textContent');

         const srcTxt = await src.jsonValue(); 
   
         const object = {id, foodName, srcTxt}; 
         
         results += JSON.stringify(object);
         results += ' , ';
         results += '\n';
         console.log(results); 
         
      }
      // fs.writeFileSync('results.json',  results);


     browser.close(); 

   }

   catch (err){

      console.log(err);

   }
}


scrapeData();
