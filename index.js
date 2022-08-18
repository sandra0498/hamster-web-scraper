const puppeteer = require('puppeteer');



// URL for data
const URL = "https://canmypeteatthis.com/what-can-hamsters-eat-your-ultimate-list/"



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

      for (i = 1; i < 60; i++ ){
         const [title] = await page.$x(`//*[@id="lcp_instance_0"]/li[${i}]/a[1]`);

         const  srcTitle = await title.getProperty('textContent');
         const titleTxt = await srcTitle.jsonValue(); 
   
         const foodName = getFoodName(titleTxt); 

         const [el] = await page.$x(`//*[@id="lcp_instance_0"]/li[${i}]/div[1]`);

         const src = await el.getProperty('textContent');

         const srcTxt = await src.jsonValue(); 
   
   
         console.log({foodName, srcTxt});




      }


     browser.close(); 

   }

   catch (err){

      console.log(err);

   }
}



scrapeData();
