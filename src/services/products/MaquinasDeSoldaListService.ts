import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class MaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- AMERICANAS ----------------- //


        const url_americanas = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn09rgqDaloMmAsKP2tpGYY3trqN2Ug:1706900603236&q=maquina+de+solda&tbs=mr:1,merchagg:g103278022%7Cm110551677%7Cm305474016%7Cm285480096%7Cm143935386%7Cm111578899&sa=X&ved=0ahUKEwjO__ygrI2EAxWUpZUCHRHQDX8QsysIyQkoAQ&biw=1508&bih=688&dpr=0.9';

        const browser_americanas = await puppeteer.launch({
            headless: false
        });
        const page_americanas = await browser_americanas.newPage();
        await page_americanas.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_americanas.setUserAgent(randonUserAgent.getRandom());
        await page_americanas.goto(url_americanas);

        await page_americanas.waitForSelector('.rgHvZc');
        const links_americanas = await page_americanas.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        const title_americanas = await page_americanas.$$eval(`.rgHvZc > a`, elementos => {
            return elementos.map(elemento => elemento.textContent.trim());
        });

        await page_americanas.waitForSelector('.HRLxBb');
        const price_americanas = await page_americanas.$$eval('.HRLxBb', elementos => {
            return elementos.map(elemento => elemento.textContent.trim());
        });

        function processarString_americanas(str: string) {
            if (str.includes('.')) {
                str = str.replace('.', '');
            }

            str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

            return str;
        }

        const brand_americanas: any = [];

        for (let i = 0; i < title_americanas.length; i++) {
            const palavras = title_americanas[i].split(' ');
            const brands = palavras[palavras.length - 1];

            brand_americanas.push(brands);
        }

        const store_americanas = "Americanas";

        const obj_americanas: { [key: string]: any } = {};
        obj_americanas.array1 = title_americanas;
        obj_americanas.array2 = price_americanas;
        obj_americanas.array3 = brand_americanas;
        obj_americanas.array4 = links_americanas;

        const new_americanas = Object.keys(obj_americanas.array1).map((index) => ({
            store: store_americanas,
            title: obj_americanas.array1[index],
            price: processarString_americanas(obj_americanas.array2[index]),
            brand: obj_americanas.array3[index],
            link: obj_americanas.array4[index]
        }));

        list_products.push(new_americanas);

        await browser_americanas.close();


        // ----------------- LOJA DO MECANICO ----------------- //


        const url_mecanico = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-GEFCj6Gvd40tdVLc00-cDZDzxPg:1706872438258&q=maquina+de+solda&tbs=mr:1,merchagg:m10892984&sa=X&ved=0ahUKEwiHm--qw4yEAxUGJrkGHd5IAdEQsysIwwkoAg&biw=1358&bih=620&dpr=1';

        const browser_mecanico = await puppeteer.launch({
            headless: false
        });
        const page_mecanico = await browser_mecanico.newPage();
        await page_mecanico.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
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

        function processarString(str: string) {
            if (str.includes('.')) {
                str = str.replace('.', '');
            }

            str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

            return str;
        }

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
            price: processarString(obj.array2[index]),
            brand: obj.array3[index],
            link: obj.array4[index]
        }));

        list_products.push(new_mecanico);

        await browser_mecanico.close();


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
        await page_amazon.goto(url_amazon);

        await page_amazon.waitForSelector('.rush-component');
        const links_amazon = await page_amazon.$$eval('.rush-component > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_amazon) {
            if (a === 6) continue;
            await page_amazon.goto(link);
            await page_amazon.waitForSelector('#productTitle');

            const title = await page_amazon.$eval('#productTitle', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_amazon.waitForSelector('.a-price-whole');

            const price = await page_amazon.$eval('.a-price-whole', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_amazon.waitForSelector('.prodDetAttrValue');

            const brand = await page_amazon.$eval('.prodDetAttrValue', (element: HTMLElement | null) => {
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

            a++;
        }

        await browser_amazon.close();


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

        await page_livre.waitForSelector('.ui-search-item__group--title');
        const links_livre = await page_livre.$$eval('.ui-search-item__group--title > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        const links_new_livre = links_livre.filter(item => typeof item === 'string' && item.length > 200).map(item => item);

        for (const link of links_new_livre) {
            if (l === 6) continue;
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

        await page_esab.waitForSelector('.area-product');
        const links_esab = await page_esab.$$eval('.area-product > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_esab) {
            if (e === 6) continue;
            await page_esab.goto(link);
            await page_esab.waitForSelector('.product-name');

            const title = await page_esab.$eval('.product-name', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_esab.waitForSelector('.price');

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
            obj.title = title;
            obj.price = processarString(price);
            obj.brand = brand;
            obj.link = link;

            list_products.push(obj);

            e++;
        }

        await browser_esab.close();


        // ----------------- CARREFOUR ----------------- //


        const url_carrefour = 'https://www.carrefour.com.br/busca/maquina%20de%20solda?maxItemsPerPage=25&page=1';

        let ca = 1;

        const browser_carrefour = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_carrefour = await browser_carrefour.newPage();
        await page_carrefour.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_carrefour.setUserAgent(randonUserAgent.getRandom());
        await page_carrefour.goto(url_carrefour);

        await page_carrefour.waitForSelector('.vtex-product-summary-2-x-container');
        const links_carrefour = await page_carrefour.$$eval('.vtex-product-summary-2-x-container > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

        for (const link of links_carrefour) {
            if (ca === 6) continue;
            await page_carrefour.goto(link);
            await page_carrefour.waitForSelector('.vtex-store-components-3-x-productBrand ');

            const title = await page_carrefour.$eval('.vtex-store-components-3-x-productBrand ', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            await page_carrefour.waitForSelector('.carrefourbr-carrefour-components-0-x-currencyInteger');

            const price = await page_carrefour.$eval('.carrefourbr-carrefour-components-0-x-currencyInteger', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            });

            /* await page_carrefour.waitForSelector('.vtex-store-components-3-x-productBrandName');

            const brand = await page_carrefour.$eval('.vtex-store-components-3-x-productBrandName', (element: HTMLElement | null) => {
                return element ? element.innerText : '';
            }); */

            const store = "Carrefour";

            const obj: { [key: string]: any } = {};
            obj.store = store;
            obj.title = title;
            obj.price = price;
            /* obj.brand = brand; */
            obj.link = link;

            list_products.push(obj);

            ca++;
        }

        await browser_carrefour.close();


        // -----------------  ----------------- //


        console.log(list_products)

        return list_products;

    }

}

export { MaquinasDeSoldaListService }