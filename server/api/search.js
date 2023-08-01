import * as cheerio from 'cheerio';
import { log } from 'console';
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {

    // const { name } = getQuery(event)
    const query = getQuery(event);

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate the page to a URL

    const pageID = query.page;
    var url = `https://www.pngwing.com/en/search?q=${query.q}`;
    if (pageID) {
        url = `https://www.pngwing.com/en/search?q=${query.q}&page=${pageID}`;
    }

    await page.goto(url);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);

    const $ = cheerio.load(bodyHTML);

    
    // check is portal_input is exist
    const portal_input = $('#portal_input');
    if (portal_input.length > 0) {
        // if exist, then redirect to home page
        await browser.close();
        return {
            statusCode: 400,
            body: [],
        }
    }

    // find ul with id list_ul
    const items = $('#list_ul').find('li');
    var arr = [];
    // loop through the items
    items.each((i, el) => {

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

        arr.push(item);

    });

    await browser.close();

    // return {
    //     statusCode: 200,
    //     body: 'Hello World',
    // }

    return {
        statusCode: 200,
        body: arr,
    };
});

