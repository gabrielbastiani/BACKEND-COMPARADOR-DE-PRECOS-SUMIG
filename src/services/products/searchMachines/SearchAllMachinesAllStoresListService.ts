import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class SearchAllMachinesAllStoresListService {
    async execute() {

        const list_products: any = [];

        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page.setUserAgent(randonUserAgent.getRandom());
        await page.goto("https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ADLYWIJbjZCMopJ2BpaCJWlmG6mxVqjBpg:1717432364104&q=maquina+de+solda&tbs=mr:1,merchagg:g134886126%7Cg103278022%7Cg115994814%7Cg103001188%7Cg117879318%7Cg115160181%7Cg104823487%7Cg208973168%7Cg8670533%7Cg115172300%7Cg142484886%7Cg103272221%7Cm134880504%7Cm110551677%7Cm285480096%7Cm305474016%7Cm163052156%7Cm111578899%7Cm142915541%7Cm142916516%7Cm142917052%7Cm7423416%7Cm8407917%7Cm143357536%7Cm501057771%7Cm336930894%7Cm775984833%7Cm143340609%7Cm553660352%7Cm626893472%7Cm478855842%7Cm529062034%7Cm120225280%7Cm101617997%7Cm735098639%7Cm735125422%7Cm735128188%7Cm735098660%7Cm735128761%7Cm143195331%7Cm143210258%7Cm5308411824%7Cm712518894%7Cm5069529892%7Cm507986362%7Cm265940141%7Cm623309586%7Cm746589269%7Cm110551671%7Cm142944258%7Cm111576884%7Cm111260681%7Cm163052276&sa=X&ved=0ahUKEwjKnPOP7r-GAxXwpZUCHY4DD9cQsysI1Qoobw&biw=1592&bih=752&dpr=1");

        try {

            await page.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links = await page.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title = await page.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page.waitForSelector('div.dD8iuc', { timeout: 60000 });

            const stores = await page.$$eval('div.dD8iuc', elements => {
                return elements.map(element => {
                    const clonedElement = element.cloneNode(true);/* @ts-ignore */
                    clonedElement.querySelectorAll('span').forEach((span: { remove: () => any; }) => span.remove());
                    return clonedElement.textContent
                        .replace(/\sde/g, '')
                        .trim();
                }).filter(text => text.length > 0);
            });

            await page.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price = await page.$$eval('.HRLxBb', elementos => {
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

            const obj: { [key: string]: any } = {};
            obj.array1 = title;
            obj.array2 = price;
            obj.array3 = brand;
            obj.array4 = links;
            obj.array5 = images;
            obj.array6 = stores;

            const news = Object.keys(obj.array1).map((index) => ({
                store: obj.array6[index],
                image: obj.array5[index],
                title: obj.array1[index],
                price: Number(processarString(obj.array2[index])),
                brand: obj.array3[index],
                link: obj.array4[index]
            }));

            function removerAcentos(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            function removerAcentosTitle(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            for (const item of news) {
                await prismaClient.storeProduct.create({
                    data: {
                        store: item.store,
                        slug: removerAcentos(item.store),
                        link_search: "https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ADLYWIJbjZCMopJ2BpaCJWlmG6mxVqjBpg:1717432364104&q=maquina+de+solda&tbs=mr:1,merchagg:g134886126%7Cg103278022%7Cg115994814%7Cg103001188%7Cg117879318%7Cg115160181%7Cg104823487%7Cg208973168%7Cg8670533%7Cg115172300%7Cg142484886%7Cg103272221%7Cm134880504%7Cm110551677%7Cm285480096%7Cm305474016%7Cm163052156%7Cm111578899%7Cm142915541%7Cm142916516%7Cm142917052%7Cm7423416%7Cm8407917%7Cm143357536%7Cm501057771%7Cm336930894%7Cm775984833%7Cm143340609%7Cm553660352%7Cm626893472%7Cm478855842%7Cm529062034%7Cm120225280%7Cm101617997%7Cm735098639%7Cm735125422%7Cm735128188%7Cm735098660%7Cm735128761%7Cm143195331%7Cm143210258%7Cm5308411824%7Cm712518894%7Cm5069529892%7Cm507986362%7Cm265940141%7Cm623309586%7Cm746589269%7Cm110551671%7Cm142944258%7Cm111576884%7Cm111260681%7Cm163052276&sa=X&ved=0ahUKEwjKnPOP7r-GAxXwpZUCHY4DD9cQsysI1Qoobw&biw=1592&bih=752&dpr=1",
                        image: item.image,
                        title_product: item.title,
                        slug_title_product: removerAcentosTitle(item.title),
                        price: item.price,
                        brand: item.brand.replace(/\|/g, ''),
                        link: item.link
                    }
                });
            }

            list_products.push(news);

            await browser.close();


            // ----------------- SUMIG ----------------- //


            const url_sumig = 'https://loja.sumig.com/maquinas-de-solda?busca=&ordenacao=maisVendidos%3Adecrescente&gad_source=2&gclid=CjwKCAiA_aGuBhACEiwAly57MddDkSyun8v2TF75RfgBSGYJO7Z4lIJgUn7yUJXC4ds9Cc8t-6eRFBoC4REQAvD_BwE&pagina=1';

            let s = 1;

            const browser_sumig = await puppeteer.launch({
                headless: false,
                defaultViewport: null
            });
            const page_sumig = await browser_sumig.newPage();
            await page_sumig.setViewport({
                width: 1800,
                height: 900,
                deviceScaleFactor: 1,
                isMobile: false
            });
            await page_sumig.setUserAgent(randonUserAgent.getRandom());
            await page_sumig.goto(url_sumig);

            await page_sumig.waitForSelector('.spotContent', { timeout: 60000 });

            const links_sumig = await page_sumig.$$eval('.spotContent > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            for (const link of links_sumig) {
                if (s === 21) continue;
                await page_sumig.goto(link);

                await page_sumig.waitForSelector('.prodTitle', { timeout: 60000 });

                const title = await page_sumig.$eval('.prodTitle', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_sumig.waitForSelector('.com-precoDe', { timeout: 60000 });

                const price = await page_sumig.$eval('.com-precoDe', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_sumig.waitForSelector('#zoomImagemProduto', { timeout: 60000 });

                const image = await page_sumig.$eval('#zoomImagemProduto', (element: HTMLElement | null) => {
                    return element ? element.getAttribute('src') : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }

                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                    return str;
                }

                const store = "SUMIG";
                const brand = "SUMIG";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.image = image;
                obj.title = title;
                obj.price = Number(processarString(price));
                obj.brand = brand;
                obj.link = link;

                list_products.push(obj);

                s++;

                await prismaClient.storeProduct.create({
                    data: {
                        store: store,
                        slug: removerAcentos(store),
                        link_search: url_sumig,
                        image: obj.image,
                        title_product: obj.title,
                        slug_title_product: removerAcentosTitle(obj.title),
                        price: obj.price,
                        brand: obj.brand,
                        link: obj.link
                    }
                });
            }

            await browser_sumig.close();

            // ----------------- ESAB ----------------- //


            const url_esab = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn08BTT6y36GZcj95hVO3R2tg-Jk3Qg:1707649453556&q=maquina+de+solda&tbs=mr:1,merchagg:m560953009&sa=X&ved=0ahUKEwjVntH4kaOEAxXwrZUCHbMVDuQQsysImQkoDg&biw=1528&bih=708&dpr=1.25';

            const browser_esab = await puppeteer.launch({
                headless: false
            });
            const page_esab = await browser_esab.newPage();
            await page_esab.setViewport({
                width: 775,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true
            });
            await page_esab.setUserAgent(randonUserAgent.getRandom());
            await page_esab.goto(url_esab);

            await page_esab.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images_esab = await page_esab.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_esab.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_esab = await page_esab.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_esab = await page_esab.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_esab.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_esab = await page_esab.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            const store_esab = "ESAB";
            const brand_esab = "ESAB";

            const obj_esab: { [key: string]: any } = {};
            obj_esab.array1 = title_esab;
            obj_esab.array2 = price_esab;
            obj_esab.array4 = links_esab;
            obj_esab.array5 = images_esab;

            const new_esab = Object.keys(obj_esab.array1).map((index) => ({
                store: store_esab,
                image: obj_esab.array5[index],
                title: obj_esab.array1[index],
                price: Number(processarString(obj_esab.array2[index])),
                link: obj_esab.array4[index]
            }));

            for (const item of new_esab) {
                await prismaClient.storeProduct.create({
                    data: {
                        store: item.store,
                        slug: removerAcentos(item.store),
                        link_search: url_esab,
                        image: item.image,
                        title_product: item.title,
                        slug_title_product: removerAcentosTitle(item.title),
                        price: item.price,
                        brand: brand_esab,
                        link: item.link
                    }
                });
            }

            list_products.push(new_esab);

            await browser_esab.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao carregar dados das concorrencias`);
        }

    }

}

export { SearchAllMachinesAllStoresListService }