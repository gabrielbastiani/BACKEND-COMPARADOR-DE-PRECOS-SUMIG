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

            await page.waitForSelector('.IuHnof', { timeout: 60000 });

            const stores = await page.$$eval('.IuHnof', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            
            console.log(stores);


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

            const store = "Diversas";

            const obj: { [key: string]: any } = {};
            obj.array1 = title;
            obj.array2 = price;
            obj.array3 = brand;
            obj.array4 = links;
            obj.array5 = images;

            const news = Object.keys(obj.array1).map((index) => ({
                store: store,
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

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao carregar dados das concorrencias`);
        }

    }

}

export { SearchAllMachinesAllStoresListService }