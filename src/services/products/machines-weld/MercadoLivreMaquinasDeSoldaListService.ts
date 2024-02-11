import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class MercadoLivreMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MERCADO LIVRE ----------------- //


        const url_mercadolivre = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0_infdiwy0yi57d5LegpG66Vgs5yQ:1707651865854&q=maquina+de+solda&tbs=mr:1,merchagg:g8670533%7Cm735125422%7Cm735098639%7Cm735098660%7Cm735128188%7Cm255113151&sa=X&ved=0ahUKEwjdrfT2mqOEAxUTppUCHQIuA8wQsysIoAkoEQ&biw=1528&bih=708&dpr=1.25';

        const browser_mercadolivre = await puppeteer.launch({
            headless: false
        });
        const page_mercadolivre = await browser_mercadolivre.newPage();
        await page_mercadolivre.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_mercadolivre.setUserAgent(randonUserAgent.getRandom());
        await page_mercadolivre.goto(url_mercadolivre);

        try {

            await page_mercadolivre.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_mercadolivre.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_mercadolivre.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_mercadolivre = await page_mercadolivre.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_mercadolivre = await page_mercadolivre.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_mercadolivre.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_mercadolivre = await page_mercadolivre.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_mercadolivre: any = [];

            for (let i = 0; i < title_mercadolivre.length; i++) {
                const palavras = title_mercadolivre[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_mercadolivre.push(brands);
            }

            const store_mercadolivre = "Mercado Livre";

            const obj_mercadolivre: { [key: string]: any } = {};
            obj_mercadolivre.array1 = title_mercadolivre;
            obj_mercadolivre.array2 = price_mercadolivre;
            obj_mercadolivre.array3 = brand_mercadolivre;
            obj_mercadolivre.array4 = links_mercadolivre;
            obj_mercadolivre.array5 = images;

            const new_mercadolivre = Object.keys(obj_mercadolivre.array1).map((index) => ({
                store: store_mercadolivre,
                image: obj_mercadolivre.array5[index],
                title: obj_mercadolivre.array1[index],
                price: Number(processarString(obj_mercadolivre.array2[index])),
                brand: obj_mercadolivre.array3[index],
                link: obj_mercadolivre.array4[index]
            }));

            for (const item of new_mercadolivre) {
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

            list_products.push(new_mercadolivre);

            await browser_mercadolivre.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Mercado Livre");
        }

    }

}

export { MercadoLivreMaquinasDeSoldaListService }