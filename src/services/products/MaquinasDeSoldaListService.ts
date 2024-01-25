import puppeteer from 'puppeteer';

class MaquinasDeSoldaListService {
    async execute() {
        
        const url_amazon = 'https://www.amazon.com.br/s?k=m%C3%A1quina+de+solda&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2904PMWP2D0V0&sprefix=m%C3%A1quina+de+sold%2Caps%2C306&ref=nb_sb_noss_2';

        let c = 1;
        const list_amazon: any = [];

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url_amazon);

        await page.waitForSelector('.rush-component');
        const links = await page.$$eval('.rush-component > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links) {
            if(c === 20) continue;
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
            obj.price = price.replace(/,|\n/g, '');
            obj.brand = brand.replace(/\|/g, '');
            obj.link = link;

            list_amazon.push(obj);

            console.log(list_amazon)
            console.log(list_amazon.length)

            c++;
        }

        await browser.close();

        return list_amazon;

    }

}

export { MaquinasDeSoldaListService }