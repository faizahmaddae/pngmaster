import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import axios from 'axios';
import { log } from 'console';


export default defineEventHandler(async (event) => {

    // const { name } = getQuery(event)
    const query = getQuery(event)

    const bodyHTML = await axios.get('https://www.pngwing.com/');
    const $ = cheerio.load(bodyHTML.data);

    // find ul with id list_ul
    const items = $('.hotsearch > ul').find('li');

    var arr = [];

    // loop through the items
    items.each((i, el) => {
        const ahref = $(el).find('a').attr('href');
        const atext = $(el).find('a').text();
        // if link is empty, skip
        if (!ahref) return;
        // create new object
        const item = {
            ahref: ahref,
            atext: atext,
        };
        arr.push(item);
    
    });


      // releated list_ul
      const list_ul = $('#list_ul').find('li');
      var list_ul_data = [];
      // loop through the items
      list_ul.each((i, el) => {
  
          const link = $(el).find('link[itemprop="contentUrl"]').attr('href');
          const keywords = $(el).find('meta[itemprop="keywords"]').attr('content');
          const figcaption = $(el).find('figcaption').text();
          const thumbnail = $(el).find('a[itemprop="url"]').attr('src');
          const permalink = $(el).find('a[itemprop="url"]').attr('href');
          // https://www.pngwing.com/en/free-png-nueth
          // https://www.pngwing.com/en/{slug}
  
          // get slug from permalink use regex
          const slug = (permalink + "").replaceAll('https://www.pngwing.com/en/', '');
  
          // if link is empty, skip
          if (!link) return;
  
          // create new object
          const item = {
              link: link,
              thumbnail: thumbnail,
              keywords: keywords,
              figcaption: figcaption,
              permalink: permalink,
              slug: slug,
              // slug: slug,
          };
  
          list_ul_data.push(item);
  
      });

    return {
        statusCode: 200,
        body: arr,
        list_ul_data: list_ul_data,
    };
});

