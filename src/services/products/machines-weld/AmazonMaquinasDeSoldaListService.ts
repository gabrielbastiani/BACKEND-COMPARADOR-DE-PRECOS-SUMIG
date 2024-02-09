import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class AmazonMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- AMAZON.COM ----------------- //


        const url_amazon = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn08vpiPOeRNARHXSfHdmZyQpTo3Jqg:1707503464230&q=maquina+de+solda&tbs=mr:1,merchagg:g103278022%7Cm305474016%7Cm110551677%7Cm285480096%7Cm143935386&sa=X&ved=0ahUKEwiXicCL8p6EAxViOrkGHR3PC2wQsysIqQkoAQ&biw=1592&bih=752&dpr=1';

        const browser_amazon = await puppeteer.launch({
            headless: false
        });
        const page_amazon = await browser_amazon.newPage();
        await page_amazon.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_amazon.setUserAgent(randonUserAgent.getRandom());
        await page_amazon.goto(url_amazon);

        try {

            await page_amazon.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_amazon.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_amazon.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_amazon = await page_amazon.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_amazon = await page_amazon.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_amazon.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_amazon = await page_amazon.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_amazon: any = [];

            for (let i = 0; i < title_amazon.length; i++) {
                const palavras = title_amazon[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_amazon.push(brands);
            }

            const store_amazon = "Amazon.com";

            const obj_amazon: { [key: string]: any } = {};
            obj_amazon.array1 = title_amazon;
            obj_amazon.array2 = price_amazon;
            obj_amazon.array3 = brand_amazon;
            obj_amazon.array4 = links_amazon;
            obj_amazon.array5 = images;

            const new_amazon = Object.keys(obj_amazon.array1).map((index) => ({
                store: store_amazon,
                image: obj_amazon.array5[index],
                title: obj_amazon.array1[index],
                price: Number(processarString(obj_amazon.array2[index])),
                brand: obj_amazon.array3[index],
                link: obj_amazon.array4[index]
            }));

            for (const item of new_amazon) {
                await prismaClient.storeProduct.create({
                    data: {
                        store: item.store,
                        image: item.image,
                        title_product: item.title,
                        price: item.price,
                        brand: item.brand.replace(/\|/g, ''),
                        link: item.link
                    }
                });
            }

            list_products.push(new_amazon);

            await browser_amazon.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Amazon.com");
        }

    }

}

export { AmazonMaquinasDeSoldaListService }