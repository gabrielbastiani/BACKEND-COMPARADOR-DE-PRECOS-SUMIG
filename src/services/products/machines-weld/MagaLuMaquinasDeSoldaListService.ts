import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class MagaLuMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MAGALU ----------------- //


        const url_magalu = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-JbwTMJE3-on76NN_J4pRjmEnqgw:1707651437068&q=maquina+de+solda&tbs=mr:1,merchagg:g104823487%7Cm553660352%7Cm478855842%7Cm252108464%7Cm529062034%7Cm252860763&sa=X&ved=0ahUKEwiBp7mqmaOEAxUzrZUCHfBMB6AQsysInwkoEA&biw=1528&bih=708&dpr=1.25';

        const browser_magalu = await puppeteer.launch({
            headless: false
        });
        const page_magalu = await browser_magalu.newPage();
        await page_magalu.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_magalu.setUserAgent(randonUserAgent.getRandom());
        await page_magalu.goto(url_magalu);

        try {

            await page_magalu.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_magalu.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_magalu.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_magalu = await page_magalu.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_magalu = await page_magalu.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_magalu.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_magalu = await page_magalu.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_magalu: any = [];

            for (let i = 0; i < title_magalu.length; i++) {
                const palavras = title_magalu[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_magalu.push(brands);
            }

            const store_magalu = "MagaLu";

            const obj_magalu: { [key: string]: any } = {};
            obj_magalu.array1 = title_magalu;
            obj_magalu.array2 = price_magalu;
            obj_magalu.array3 = brand_magalu;
            obj_magalu.array4 = links_magalu;
            obj_magalu.array5 = images;

            const new_magalu = Object.keys(obj_magalu.array1).map((index) => ({
                store: store_magalu,
                image: obj_magalu.array5[index],
                title: obj_magalu.array1[index],
                price: Number(processarString(obj_magalu.array2[index])),
                brand: obj_magalu.array3[index],
                link: obj_magalu.array4[index]
            }));

            for (const item of new_magalu) {
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

            list_products.push(new_magalu);

            await browser_magalu.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = MagaLu");
        }

    }

}

export { MagaLuMaquinasDeSoldaListService }