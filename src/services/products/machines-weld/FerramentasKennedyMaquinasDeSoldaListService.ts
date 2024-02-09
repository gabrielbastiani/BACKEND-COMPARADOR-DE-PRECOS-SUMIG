import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class FerramentasKennedyMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- FERRAMENTAS KENNEDY ----------------- //


        const url_ferramentas_kennedy = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn09YiSsYQEu-nMaFdItSZkBM5RaUKg:1707247309010&q=maquina+de+solda&tbs=mr:1,merchagg:g117879318%7Cm8407917&sa=X&ved=0ahUKEwjL_pXrt5eEAxVVp5UCHWv8CIIQsysIngkoCw&biw=1592&bih=752&dpr=1';

        const browser_ferramentas_kennedy = await puppeteer.launch({
            headless: false
        });
        const page_ferramentas_kennedy = await browser_ferramentas_kennedy.newPage();
        await page_ferramentas_kennedy.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_ferramentas_kennedy.setUserAgent(randonUserAgent.getRandom());
        await page_ferramentas_kennedy.goto(url_ferramentas_kennedy);

        try {

            await page_ferramentas_kennedy.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_ferramentas_kennedy.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_ferramentas_kennedy.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_ferramentas_kennedy = await page_ferramentas_kennedy.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_ferramentas_kennedy = await page_ferramentas_kennedy.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_ferramentas_kennedy.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_ferramentas_kennedy = await page_ferramentas_kennedy.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_ferramentas_kennedy: any = [];

            for (let i = 0; i < title_ferramentas_kennedy.length; i++) {
                const palavras = title_ferramentas_kennedy[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_ferramentas_kennedy.push(brands);
            }

            const store_ferramentas_kennedy = "Ferramentas Kennedy";

            const obj_ferramentas_kennedy: { [key: string]: any } = {};
            obj_ferramentas_kennedy.array1 = title_ferramentas_kennedy;
            obj_ferramentas_kennedy.array2 = price_ferramentas_kennedy;
            obj_ferramentas_kennedy.array3 = brand_ferramentas_kennedy;
            obj_ferramentas_kennedy.array4 = links_ferramentas_kennedy;
            obj_ferramentas_kennedy.array5 = images;

            const new_ferramentas_kennedy = Object.keys(obj_ferramentas_kennedy.array1).map((index) => ({
                store: store_ferramentas_kennedy,
                image: obj_ferramentas_kennedy.array5[index],
                title: obj_ferramentas_kennedy.array1[index],
                price: Number(processarString(obj_ferramentas_kennedy.array2[index])),
                brand: obj_ferramentas_kennedy.array3[index],
                link: obj_ferramentas_kennedy.array4[index]
            }));

            for (const item of new_ferramentas_kennedy) {
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

            list_products.push(new_ferramentas_kennedy);

            await browser_ferramentas_kennedy.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Ferramentas Kennedy");
        }

    }

}

export { FerramentasKennedyMaquinasDeSoldaListService }