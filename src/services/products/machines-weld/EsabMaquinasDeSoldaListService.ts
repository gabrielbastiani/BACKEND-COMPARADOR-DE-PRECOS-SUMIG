import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class EsabMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- ESAB ----------------- //


        const url_esab = 'https://www.lojaesab.com.br/maquinas-de-solda?limit=24';

        let e = 1;

        const browser_esab = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_esab = await browser_esab.newPage();
        await page_esab.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_esab.setUserAgent(randonUserAgent.getRandom());
        await page_esab.goto(url_esab);

        try {

            await page_esab.waitForSelector('.area-product', { timeout: 60000 });

            const links_esab = await page_esab.$$eval('.area-product > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            for (const link of links_esab) {
                if (e === 21) continue;
                await page_esab.goto(link);

                await page_esab.waitForSelector('.zoomContainer', { timeout: 60000 });

                await page_esab.click('.zoomContainer');

                await page_esab.waitForSelector('.fancybox-image', { timeout: 60000 });

                const image = await page_esab.$eval('.fancybox-image', (element: HTMLElement | null) => {
                    return element ? element.getAttribute('src') : '';
                });

                await page_esab.waitForSelector('.product-name', { timeout: 60000 });

                const title = await page_esab.$eval('.product-name', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_esab.waitForSelector('.price', { timeout: 60000 });

                const price = await page_esab.$eval('.price', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }

                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                    return str;
                }

                const store = "ESAB";
                const brand = "ESAB";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.image = image;
                obj.title = title;
                obj.price = Number(processarString(price));
                obj.brand = brand;
                obj.link = link;

                list_products.push(obj);

                e++;
            }

            await browser_esab.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = ESAB");
        }
    }

}

export { EsabMaquinasDeSoldaListService }