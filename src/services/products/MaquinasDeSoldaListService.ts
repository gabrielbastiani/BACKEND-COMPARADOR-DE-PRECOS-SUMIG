import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class MaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];

        const url_amazon = 'https://www.amazon.com.br/s?k=m%C3%A1quina+de+solda&__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2904PMWP2D0V0&sprefix=m%C3%A1quina+de+sold%2Caps%2C306&ref=nb_sb_noss_2';

        let c = 1;

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page = await browser.newPage();
        await page.setUserAgent(randonUserAgent.getRandom());
        await page.goto(url_amazon);

        await page.waitForSelector('.rush-component');
        const links = await page.$$eval('.rush-component > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links) {
            if (c === 21) continue;
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

        await browser.close();


        // ---------------------------------- //


        const url_magalu = 'https://www.magazineluiza.com.br/busca/maquina+de+solda/';

        let m = 1;

        const browser_magalu = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_magalu = await browser_magalu.newPage();
        await page_magalu.setUserAgent(randonUserAgent.getRandom());
        await page_magalu.goto(url_magalu);

        await page_magalu.waitForSelector('.sc-kTbCBX');
        const links_magalu = await page_magalu.$$eval('.sc-kTbCBX > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_magalu) {
            if (m === 21) continue;
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

        await browser_magalu.close();


        // ---------------------------------- //


        const url_livre = 'https://lista.mercadolivre.com.br/m%C3%A1quina-de-solda#D[A:m%C3%A1quina%20de%20solda]';

        let l = 1;

        const browser_livre = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_livre = await browser_livre.newPage();
        await page_livre.setUserAgent(randonUserAgent.getRandom());
        await page_livre.goto(url_livre);

        await page_livre.waitForSelector('.ui-search-item__group--title');
        const links_livre = await page_livre.$$eval('.ui-search-item__group--title > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        const novoArray = links_livre.filter(item => typeof item === 'string' && item.length > 200).map(item => item);


        for (const link of novoArray) {
            if (l === 21) continue;
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

        await browser_livre.close();


        // ---------------------------------- //


        const url_esab = 'https://www.lojaesab.com.br/maquinas-de-solda?limit=24';

        let e = 1;

        const browser_esab = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_esab = await browser_esab.newPage();
        await page_esab.setUserAgent(randonUserAgent.getRandom());
        await page_esab.goto(url_esab);

        await page_esab.waitForSelector('.area-product');
        const links_esab = await page_esab.$$eval('.area-product > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_esab) {
            if (e === 21) continue;
            await page_esab.goto(link);
            await page_esab.waitForSelector('.product-name');

            const title = await page_esab.$eval('.product-name', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_esab.waitForSelector('.price');

            const price = await page_esab.$eval('.price', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            const store = "ESAB";
            const brand = "ESAB";

            const obj: { [key: string]: any } = {};
            obj.store = store;
            obj.title = title;
            obj.price = price.replace(/R\$\s*/g, '').replace(/,/g, '.');;
            obj.brand = brand;
            obj.link = link;

            list_products.push(obj);

            e++;
        }

        await browser_esab.close();


        // ---------------------------------- //


        const url_mecanico = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-GEFCj6Gvd40tdVLc00-cDZDzxPg:1706872438258&q=maquina+de+solda&tbs=mr:1,merchagg:m10892984&sa=X&ved=0ahUKEwiHm--qw4yEAxUGJrkGHd5IAdEQsysIwwkoAg&biw=1358&bih=620&dpr=1';

        const browser_mecanico = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_mecanico = await browser_mecanico.newPage();
        await page_mecanico.setUserAgent(randonUserAgent.getRandom());
        await page_mecanico.goto(url_mecanico);

        await page_mecanico.waitForSelector('.rgHvZc');
        const links_mecanico = await page_mecanico.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        const title = await page_mecanico.$$eval(`.rgHvZc > a`, elementos => {
            return elementos.map(elemento => elemento.textContent.trim());
        });

        await page_mecanico.waitForSelector('.HRLxBb');
        const price = await page_mecanico.$$eval('.HRLxBb', elementos => {
            return elementos.map(elemento => elemento.textContent.trim());
        });

        const brand: any = [];

        for (let i = 0; i < title.length; i++) {
            const palavras = title[i].split(' ');
            const brands = palavras[palavras.length - 1];

            brand.push(brands);
        }

        const store = "Loja do Mecanico";

        const obj: { [key: string]: any } = {};
        obj.array1 = title;
        obj.array2 = price;
        obj.array3 = brand;
        obj.array4 = links_mecanico;

        const new_mecanico = Object.keys(obj.array1).map((index) => ({
            store,
            title: obj.array1[index],
            price: obj.array2[index],
            brand: obj.array3[index],
            link: obj.array4[index]
        }));

        console.log(new_mecanico);

        list_products.push(new_mecanico);

        console.log(list_products)

        await browser_mecanico.close();

        return list_products;

    }

}

export { MaquinasDeSoldaListService }