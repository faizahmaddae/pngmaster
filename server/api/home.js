import * as cheerio from 'cheerio';
import axios from 'axios';
// playwright
import { chromium } from 'playwright';
import { firefox } from 'playwright';
import { webkit } from 'playwright';



export default defineEventHandler(async (event) => {

    // const { name } = getQuery(event)
    const query = getQuery(event)

    try {
        const browser = await chromium.launch(
            {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],

            },
        ); // Launch the Chromium browser
        const context = await browser.newContext(
            { viewport: { width: 1920, height: 1080 },
            // userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',

        },

        ); // Create a new browser context
        const page = await context.newPage(); // Create a new page in the context
        // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');

        const url = 'https://www.pngwing.com/en/';
        await page.goto(url); // Navigate to the URL

        const content = await page.content();
        const $ = cheerio.load(`${content}`);

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

        // close browser
        await browser.close();

        return {
            statusCode: 200,
            body: arr,
            list_ul_data: list_ul_data,
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: {
                error: error.message,

            },
        };

    }

});

