import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class MercadoLivreMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MERCADO LIVRE ----------------- //


        const url_livre = 'https://lista.mercadolivre.com.br/m%C3%A1quina-de-solda#D[A:m%C3%A1quina%20de%20solda]';

        let l = 1;

        const browser_livre = await puppeteer.launch({
            headless: false
        });
        const page_livre = await browser_livre.newPage();
        await page_livre.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_livre.setUserAgent(randonUserAgent.getRandom());
        await page_livre.goto(url_livre);

        try {

            await page_livre.waitForSelector('.ui-search-item__group--title', { timeout: 60000 });

            const links_livre = await page_livre.$$eval('.ui-search-item__group--title > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const links_new_livre = links_livre.filter(item => typeof item === 'string' && item.length > 200).map(item => item);

            for (const link of links_new_livre) {
                if (l === 21) continue;
                await page_livre.goto(link);

                await page_livre.waitForSelector('.ui-pdp-title', { timeout: 60000 });

                const title = await page_livre.$eval('.ui-pdp-title', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_livre.waitForSelector('.andes-money-amount__cents', { timeout: 60000 });

                const cents = await page_livre.$eval('.andes-money-amount__cents', (element: HTMLElement | null) => {
                    return element ? "," + element.innerText : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }
    
                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
    
                    return str;
                }

                await page_livre.waitForSelector('.andes-money-amount__cents', { timeout: 60000 });

                const price = await page_livre.$eval('.andes-money-amount__fraction', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_livre.waitForSelector('.andes-table__column--value', { timeout: 60000 });

                const brand = await page_livre.$eval('.andes-table__column--value', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_livre.waitForSelector('.ui-pdp-image', { timeout: 60000 });

                const image = await page_livre.$eval('.ui-pdp-image', (element: HTMLElement | null) => {
                    return element ? element.getAttribute('src') : '';
                });

                const store = "Mercado Livre";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.image = image;
                obj.title = title;
                obj.price = Number(processarString(price + cents));
                obj.brand = brand;
                obj.link = link;

                list_products.push(obj);

                l++;
            }

            await browser_livre.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Mercado Livre");
        }
    }

}

export { MercadoLivreMaquinasDeSoldaListService }