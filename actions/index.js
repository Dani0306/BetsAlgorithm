"use server";

import puppeteer from "puppeteer"
import { map } from "@/constants";

export const scrapeData = async () => {

  const browser = await puppeteer.launch({ headless: false })
  const forebet = await browser.newPage();

  await forebet.goto("https://www.forebet.com/es")


  const hrefs = await forebet.evaluate(() => {
      const ul = document.querySelector("ul.forebets-all");
      if(ul){
          const anchors = ul.querySelectorAll("a");
          const hrefs = Array.from(anchors, a => a.href);
          return hrefs
      } else return []
  })



  const arr = [];
  const data = [];

  for (let i = 0; i < map.length; i++){
    let item = hrefs.find(x => x.includes(map[i].name) && x.includes(map[i].country) && x.split("/")[x.split("/").length - 1] === map[i].name);
    arr.push(item)
  }

  const ligues = arr.filter(item => Boolean(item) && item)
 

  for (let i = 0;i < ligues.length; i++){

      const page = await browser.newPage();
      await page.goto(ligues[i]);

      let newData = await page.evaluate(() => {
          const schemaDiv = document.querySelector('div.schema');
          if (!schemaDiv) return [];
          let newArr = [];
      
          const rcntDivs = schemaDiv.querySelectorAll('div.rcnt');
          let games = [];
          let probabilities = [];
      
          rcntDivs.forEach((rcntDiv) => {
            const tnmsDiv = rcntDiv.querySelector('div.tnms');
            if (tnmsDiv) {
              const spans = tnmsDiv.querySelectorAll('span');
              const spanText = Array.from(spans, (span) => span.textContent);
              games.push(spanText);
            }
  
  
            const fprcDiv = rcntDiv.querySelector("div.fprc");
            if(fprcDiv) {
              const spans = fprcDiv.querySelectorAll("span")
              const spanText = Array.from(spans, (span) => Number(span.textContent));
              probabilities.push(spanText)
            }
  
          });
  
          for(let i = 0; i < games.length; i++){
              newArr[i] = Array.from(new Set(games[i])).concat(probabilities[i])
          }
          return newArr
        });

        data.push(newData)
  }

  const joinedData =  data.reduce((acc, curr) => acc.concat(curr), [])

  const filteredData = joinedData.filter(item => {
    const date = new Date();
    const itemDate = item[2];
    const todayDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
    const comparation = Number(itemDate.slice(0, 2)) >= Number(todayDate.slice(0, 2))
    if(itemDate.split(" ")[0] === "2/11/2023") return item;
  })

  const sortedData = filteredData.sort((a, b) => {
    const aMax = Math.max(...a.slice(-3));
    const bMax = Math.max(...b.slice(-3));
    return bMax - aMax;
  });


  await browser.close();


  return sortedData

}


// analice NBA


export const scrapeNba = async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();

    await page.goto("https://www.forebet.com/es/basketball/usa")

    const data = await page.evaluate(() => {
        const rcntDivs = document.querySelectorAll("div.rcnt");
        const games = [];
        const probabilities = [];

        let newArr = [];

        rcntDivs.forEach(rcntDiv => {
            const tnmsDivs = rcntDiv.querySelectorAll("div.tnms");
            tnmsDivs.forEach(tnmscnDiv => {
                const spans = tnmscnDiv.querySelectorAll("span");
                const spansText = Array.from(spans, (span) => span.textContent);
                games.push(spansText)
            })
        })

        rcntDivs.forEach(rcntDiv => {
            const fprcDivs = rcntDiv.querySelectorAll("div.fprc");
            fprcDivs.forEach(fprcDiv => {
                const spans = fprcDiv.querySelectorAll("span");
                const spansText = Array.from(spans, (span) => Number(span.textContent))
                probabilities.push(spansText)
            })
        })


        for(let i = 0; i < games.length; i++){
            newArr[i] = Array.from(new Set(games[i])).concat(probabilities[i])
        }

        return newArr
    })


    const filteredData = data.filter(item => {
        const date = new Date();
        const itemDate = item[2];
        const todayDate =`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
        const comparation = Number(itemDate.slice(0, 2)) >= Number(todayDate.slice(0, 2))
        if(itemDate.split(" ")[0] === "2/11/2023") return item;
    })    

    await browser.close();

    return filteredData.sort((a, b) => Math.max(b[b.length - 2], b[b.length - 1]) - Math.max(a[a.length - 2], a[a.length - 1])).filter(subarray => !subarray.includes(null));
    ;

}