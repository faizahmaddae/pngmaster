import * as cheerio from 'cheerio';
import axios from 'axios';
// playwright
import { chromium } from 'playwright';
import { firefox } from 'playwright';
import { log } from 'console';

export default defineEventHandler(async (event) => {

    // const { name } = getQuery(event)
    const query = getQuery(event)

    const bodyHTML = await axios.get(`https://www.pngwing.com/`,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          'Connection': 'keep-alive',
          'Host': 'pngwing.com',
          'Origin': 'https://pngwing.app',
          'Referer': 'https://pngwing.app/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
      })

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

    //   arr.push(list_ul_data);

    return {
        statusCode: 200,
        body: arr,
        list_ul_data: list_ul_data,
    };
});

