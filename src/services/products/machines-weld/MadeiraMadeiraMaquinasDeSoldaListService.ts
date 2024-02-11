import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class MadeiraMadeiraMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MADEIRAMADEIRA ----------------- //


        const url_madeiramadeira = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-6KFAKou72wtWgG1CYNW-_CNq3Eg:1707652584097&q=maquina+de+solda&tbs=mr:1,merchagg:g11358442%7Cm734684566&sa=X&ved=0ahUKEwiwmLLNnaOEAxUaqZUCHVkcAY0QsysIkgkoDg&biw=1528&bih=708&dpr=1.25';

        const browser_madeiramadeira = await puppeteer.launch({
            headless: false
        });
        const page_madeiramadeira = await browser_madeiramadeira.newPage();
        await page_madeiramadeira.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_madeiramadeira.setUserAgent(randonUserAgent.getRandom());
        await page_madeiramadeira.goto(url_madeiramadeira);

        try {

            await page_madeiramadeira.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_madeiramadeira.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_madeiramadeira.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_madeiramadeira = await page_madeiramadeira.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_madeiramadeira = await page_madeiramadeira.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_madeiramadeira.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_madeiramadeira = await page_madeiramadeira.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_madeiramadeira: any = [];

            for (let i = 0; i < title_madeiramadeira.length; i++) {
                const palavras = title_madeiramadeira[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_madeiramadeira.push(brands);
            }

            const store_madeiramadeira = "MadeiraMadeira";

            const obj_madeiramadeira: { [key: string]: any } = {};
            obj_madeiramadeira.array1 = title_madeiramadeira;
            obj_madeiramadeira.array2 = price_madeiramadeira;
            obj_madeiramadeira.array3 = brand_madeiramadeira;
            obj_madeiramadeira.array4 = links_madeiramadeira;
            obj_madeiramadeira.array5 = images;

            const new_madeiramadeira = Object.keys(obj_madeiramadeira.array1).map((index) => ({
                store: store_madeiramadeira,
                image: obj_madeiramadeira.array5[index],
                title: obj_madeiramadeira.array1[index],
                price: Number(processarString(obj_madeiramadeira.array2[index])),
                brand: obj_madeiramadeira.array3[index],
                link: obj_madeiramadeira.array4[index]
            }));

            for (const item of new_madeiramadeira) {
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

            list_products.push(new_madeiramadeira);

            await browser_madeiramadeira.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = MadeiraMadeira");
        }

    }

}

export { MadeiraMadeiraMaquinasDeSoldaListService }