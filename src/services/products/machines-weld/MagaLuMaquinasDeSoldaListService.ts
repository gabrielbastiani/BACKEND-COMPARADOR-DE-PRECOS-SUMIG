import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class MagaLuMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MAGALU ----------------- //


        const url_magalu = 'https://www.magazineluiza.com.br/busca/maquina+de+solda/';

        let m = 1;

        const browser_magalu = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_magalu = await browser_magalu.newPage();
        await page_magalu.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_magalu.setUserAgent(randonUserAgent.getRandom());
        await page_magalu.goto(url_magalu);

        try {

            await page_magalu.waitForSelector('[data-testid="product-card-container"]', { timeout: 60000 });

            const links_magalu = await page_magalu.$$eval('[data-testid="product-card-container"]', (el: any[]) => el.map((link: { href: any; }) => link.href));

            for (const link of links_magalu) {
                if (m === 21) continue;
                await page_magalu.goto(link);

                await page_magalu.waitForSelector('[data-testid="heading-product-title"]', { timeout: 60000 });

                const title = await page_magalu.$eval('[data-testid="heading-product-title"]', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_magalu.waitForSelector('[data-testid="price-value"]', { timeout: 60000 });

                const price = await page_magalu.$eval('[data-testid="price-value"]', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_magalu.waitForSelector('[data-testid="heading-product-brand"]', { timeout: 60000 });

                const brand = await page_magalu.$eval('[data-testid="heading-product-brand"]', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                const store = "MagaLu";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.title = title;
                obj.price = price.replace(/R\$\s*/g, '').replace(/,/g, '.');
                obj.brand = brand;
                obj.link = link;

                list_products.push(obj);

                m++;
            }

            await browser_magalu.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = MagaLu");
        }

    }

}

export { MagaLuMaquinasDeSoldaListService }