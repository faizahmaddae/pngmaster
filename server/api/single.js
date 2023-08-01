import * as cheerio from 'cheerio';
import { log } from 'console';
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {

    // const { name } = getQuery(event)
    const query = getQuery(event)
    const slug = query.slug

    log(`slug: ${slug}`);

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage()

    // Navigate the page to a URL
    await page.goto(`https://www.pngwing.com/en/${slug}`);

    let bodyHTML = await page.evaluate(() => document.body.innerHTML);

    const $ = cheerio.load(bodyHTML);

    // replace url 
    const oldBaseUrl = 'https://www.pngwing.com/en/';

    // image info
    const image = $('.left_view').find('img[itemprop="contentUrl"]').attr('src');
    const alt = $('.left_view').find('img[itemprop="contentUrl"]').attr('alt');
    const title = $('.left_view').find('img[itemprop="contentUrl"]').attr('title');
    const figcaption = $('.left_view').find('figcaption').text();

    // find ul.tag_ul
    var tagList = [];
    $('.tag_ul').find('li').each(function (i, elem) {

        var link = $(this).find('a').attr('href');
        // check if link is empty, skip
        if (!link) link = '#';

        var tag = {
            name: $(this).find('a').text(),
            link: `${link}`.replaceAll(oldBaseUrl, '')
        }
        tagList.push(tag);
    });

    // get content of dl.info_list
    var info_list = $('.info_list').html();


    // releated list_ul
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
        var slug = (permalink + "").replaceAll('https://www.pngwing.com/en/', '');
       
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

    return {
        statusCode: 200,
        body: {
            image: image,
            alt: alt,
            title: title,
            figcaption: figcaption,
            tags: tagList,
            info_list: info_list,
            related: arr,
        },
    };
});

