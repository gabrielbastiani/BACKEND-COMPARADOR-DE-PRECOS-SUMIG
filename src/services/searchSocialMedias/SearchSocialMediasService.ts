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

            await page.waitForSelector('div.native-text', { timeout: 60000 });
            const descriptions = await page.$$eval('div.native-text', (elementos) => {
                // Filtrar e mapear os elementos que possuem o span com o texto "… Ver mais"
                return elementos
                    .filter(el => el.querySelector('span')?.textContent === '… Ver mais')
                    .map(el => el.textContent.trim().replace('… Ver mais', '').trim());
            });

            console.log(descriptions)

            await page.waitForSelector('.img', { timeout: 60000 });
            const images = await page.$$eval('.img > img', (el) => el.map((link) => link.src));

            console.log(images)

        } catch (error) {
            console.log(error);
        }
    }
}

export { SearchSocialMediasService };
