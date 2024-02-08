import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class AmazonMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- AMAZON ----------------- //


        const url_amazon = 'https://www.amazon.com.br/s?k=m%C3%A1quina+de+solda&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2904PMWP2D0V0&sprefix=m%C3%A1quina+de+sold%2Caps%2C306&ref=nb_sb_noss_2';

        let a = 1;

        const browser_amazon = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_amazon = await browser_amazon.newPage();
        await page_amazon.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_amazon.setUserAgent(randonUserAgent.getRandom());
        await page_amazon.goto(url_amazon, { timeout: 60000 });

        try {

            await page_amazon.waitForSelector('.rush-component', { timeout: 60000 });

            const links_amazon = await page_amazon.$$eval('.rush-component > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            for (const link of links_amazon) {
                if (a === 5) continue;
                await page_amazon.goto(link);

                await page_amazon.waitForSelector('.a-dynamic-image', { timeout: 60000 });

                const image = await page_amazon.$eval('.a-dynamic-image', (element: HTMLElement | null) => {
                    return element ? element.getAttribute('src') : '';
                });

                await page_amazon.waitForSelector('#productTitle', { timeout: 60000 });

                const title = await page_amazon.$eval('#productTitle', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_amazon.waitForSelector('.a-price-fraction', { timeout: 60000 });

                const cents = await page_amazon.$eval('.a-price-fraction', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }
    
                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
    
                    return str;
                }

                await page_amazon.waitForSelector('.a-price-whole', { timeout: 60000 });

                const price = await page_amazon.$eval('.a-price-whole', (element: HTMLElement | null) => {
                    return element ? "," + element.innerText : '';
                });

                await page_amazon.waitForSelector('.prodDetAttrValue', { timeout: 60000 });

                const brand = await page_amazon.$eval('.prodDetAttrValue', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                const store = "Amazon.com";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.image = image;
                obj.title = title;
                obj.price = Number(processarString(price + cents));
                obj.brand = brand.replace(/\|/g, '');
                obj.link = link;

                list_products.push(obj);

                a++;
            }

            await browser_amazon.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Amazon.com");
        }

    }

}

export { AmazonMaquinasDeSoldaListService }