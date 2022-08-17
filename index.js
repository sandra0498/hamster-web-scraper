const puppeteer = require('puppeteer');


// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

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
      // const [title] = await page.$x('//*[@id="lcp_instance_0"]/li[1]/a[1]');

      // const  srcTitle = await title.getProperty('textContent');
      // const titleTxt = await srcTitle.jsonValue(); 

      // const foodName = getFoodName(titleTxt); 

      // const [el] = await page.$x('//*[@id="lcp_instance_0"]/li[1]/div[1]');

      // const src = await el.getProperty('textContent');

      // const srcTxt = await src.jsonValue(); 


      // console.log({foodName, srcTxt});


     browser.close(); 

   }

   catch (err){

      console.log(err);

   }
}

// start of the program
const getFoodList = async () => {
   const FoodData= await getRawData(URL);

   console.log(typeof FoodData);
   // const parser = new DOMParser();
   // const htmlDoc = parser.parseFromString(FoodData, 'text/html');

   const list = `$("ul")`;
   console.log(list.length); 

   // parsing the data
   const parsedFoodData = load(FoodData)('content');

   const parentTag = `<ul id="lcp_catlist" id="lcp_instance_0">`; 
   const dom = new JSDOM(parentTag); 

   console.log(dom.window.document.textContent);

   const index = FoodData.indexOf('<div id="content" class="site-content clr">');
   console.log(index);
   
   const parsed = FoodData.substring(index + 1); 
   // console.log(parsed);

   
   // console.log(newData);

   // // extracting the table data
   // const worldCupsDataTable = parsedCricketWorldCupData("table.wikitable")[0]
   //    .children[1].children;

   // console.log("Year --- Winner --- Runner");
   // worldCupsDataTable.forEach((row) => {
   //    // extracting `td` tags
   //    if (row.name === "tr") {
   //       let year = null,
   //          winner = null,
   //          runner = null;

   //       const columns = row.children.filter((column) => column.name === "td");

   //       // extracting year
   //       const yearColumn = columns[0];
   //       if (yearColumn) {
   //          year = yearColumn.children[0];
   //          if (year) {
   //             year = year.children[0].data;
   //          }
   //       }

   //       // extracting winner
   //       const winnerColumn = columns[3];
   //       if (winnerColumn) {
   //          winner = winnerColumn.children[1];
   //          if (winner) {
   //             winner = winner.children[0].data;
   //          }
   //       }

   //       // extracting runner
   //       const runnerColumn = columns[5];
   //       if (runnerColumn) {
   //          runner = runnerColumn.children[1];
   //          if (runner) {
   //             runner = runner.children[0].data;
   //          }
   //       }

   //       if (year && winner && runner) {
   //          console.log(`${year} --- ${winner} --- ${runner}`);
   //       }
   //    }
   // });
};

// invoking the main function
// getFoodList();

scrapeData();
