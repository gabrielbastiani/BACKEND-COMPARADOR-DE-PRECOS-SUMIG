import puppeteer from 'puppeteer';
import randomUserAgent from 'random-useragent';
import prismaClient from '../../prisma';

class SearchSocialMediasService {
    async execute() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        // Configurar User-Agent aleatório
        const userAgent = randomUserAgent.getRandom();
        await page.setUserAgent(userAgent);

        // Navegar para a URL desejada
        await page.goto('https://www.facebook.com/hsoldas/', { waitUntil: 'networkidle2' });

        const list_posts = [];

        try {

           /*  await page.waitForSelector('.m', { timeout: 60000 });
            await page.click('.m'); */

            await page.waitForSelector('div.native-text', { timeout: 60000 });
            const description = await page.$$eval('div.native-text', (elementos) => {
                return elementos.map((elemento) => elemento.textContent.trim());
            });

            console.log(description)

        } catch (error) {
            console.log(error);
        }
    }
}

export { SearchSocialMediasService };
