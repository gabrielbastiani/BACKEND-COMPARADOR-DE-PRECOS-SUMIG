import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class EsabSearchService {
    async execute() {

        const list_products: any = [];


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

        try {

            await page_esab.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_esab.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_esab.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_esab = await page_esab.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_esab = await page_esab.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_esab.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_esab = await page_esab.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const store_esab = "ESAB";
            const brand_esab = "ESAB";

            const obj_esab: { [key: string]: any } = {};
            obj_esab.array1 = title_esab;
            obj_esab.array2 = price_esab;
            obj_esab.array4 = links_esab;
            obj_esab.array5 = images;

            const new_esab = Object.keys(obj_esab.array1).map((index) => ({
                store: store_esab,
                image: obj_esab.array5[index],
                title: obj_esab.array1[index],
                price: Number(processarString(obj_esab.array2[index])),
                link: obj_esab.array4[index]
            }));

            function removerAcentos(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            for (const item of new_esab) {
                await prismaClient.storeProduct.create({
                    data: {
                        store: item.store,
                        slug: removerAcentos(item.store),
                        image: item.image,
                        title_product: item.title,
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
            throw new Error("Erro ao carregar dados da concorrencia = ESAB");
        }

    }

}

export { EsabSearchService }