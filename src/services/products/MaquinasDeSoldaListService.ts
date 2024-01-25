import puppeteer from 'puppeteer';

class MaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];

        const url_amazon = 'https://www.amazon.com.br/s?k=m%C3%A1quina+de+solda&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2904PMWP2D0V0&sprefix=m%C3%A1quina+de+sold%2Caps%2C306&ref=nb_sb_noss_2';

        let c = 1;

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url_amazon);

        await page.waitForSelector('.rush-component');
        const links = await page.$$eval('.rush-component > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links) {
            if (c === 4) continue;
            await page.goto(link);
            await page.waitForSelector('#productTitle');

            const title = await page.$eval('#productTitle', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page.waitForSelector('.a-price-whole');

            const price = await page.$eval('.a-price-whole', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page.waitForSelector('.prodDetAttrValue');

            const brand = await page.$eval('.prodDetAttrValue', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            const store = "Amazon.com";

            const obj: { [key: string]: any } = {};
            obj.store = store;
            obj.title = title;
            obj.price = price.replace(/,|\n/g, '') + ".00";
            obj.brand = brand.replace(/\|/g, '');
            obj.link = link;

            list_products.push(obj);

            c++;
        }


        // ---------------------------------- //


        const url_magalu = 'https://www.magazineluiza.com.br/busca/maquina+de+solda/';

        let m = 1;

        const browser_magalu = await puppeteer.launch({ headless: false });
        const page_magalu = await browser_magalu.newPage();
        await page_magalu.goto(url_magalu);

        await page_magalu.waitForSelector('.sc-kTbCBX');
        const links_magalu = await page_magalu.$$eval('.sc-kTbCBX > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_magalu) {
            if (m === 4) continue;
            await page_magalu.goto(link);
            await page_magalu.waitForSelector('[data-testid="heading-product-title"]');

            const title = await page_magalu.$eval('[data-testid="heading-product-title"]', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_magalu.waitForSelector('[data-testid="price-value"]');

            const price = await page_magalu.$eval('[data-testid="price-value"]', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_magalu.waitForSelector('[data-testid="heading-product-brand"]');

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


        // ---------------------------------- //


        const url_livre = 'https://lista.mercadolivre.com.br/ferramentas/ferramentas-eletricas/soldagem/maquinas-solda/m%C3%A1quina-de-solda_NoIndex_True#D[A:m%C3%A1quina%20de%20solda,on]';

        let l = 1;

        const browser_livre = await puppeteer.launch({ headless: false });
        const page_livre = await browser_livre.newPage();
        await page_livre.goto(url_livre);

        await page_livre.waitForSelector('.ui-search-item__group--title');
        const links_livre = await page_livre.$$eval('.ui-search-item__group--title > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        console.log(links_livre)

        for (const link of links_livre) {
            if (l === 2) continue;
            await page_livre.goto(link);
            await page_livre.waitForSelector('.ui-pdp-title');

            const title = await page_livre.$eval('.ui-pdp-title', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_livre.waitForSelector('.andes-money-amount__fraction');

            const price = await page_livre.$eval('.andes-money-amount__fraction', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_livre.waitForSelector('.andes-table__column--value');

            const brand = await page_livre.$eval('.andes-table__column--value', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            const store = "Mercado Livre";

            const obj: { [key: string]: any } = {};
            obj.store = store;
            obj.title = title;
            obj.price = price;
            obj.brand = brand;
            obj.link = link;

            list_products.push(obj);

            l++;
        }

        console.log(list_products)

        await browser.close();
        await browser_magalu.close();
        await browser_livre.close();

        return list_products;

    }

}

export { MaquinasDeSoldaListService }