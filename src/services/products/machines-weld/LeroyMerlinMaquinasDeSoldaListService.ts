import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class LeroyMerlinMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- LEROY MERLIN ----------------- //


        const url_leroy_merlin = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-h1T5Y5kq5qZQ7Rip7yOvd-LlWSg:1707245796873&q=maquina+de+solda&tbs=mr:1,merchagg:g208973168%7Cm101617997&sa=X&ved=0ahUKEwj6wpCaspeEAxX4gWEGHTtKCjQQsysIngkoDQ&biw=1592&bih=752&dpr=1';

        const browser_leroy_merlin = await puppeteer.launch({
            headless: false
        });
        const page_leroy_merlin = await browser_leroy_merlin.newPage();
        await page_leroy_merlin.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_leroy_merlin.setUserAgent(randonUserAgent.getRandom());
        await page_leroy_merlin.goto(url_leroy_merlin);

        try {

            await page_leroy_merlin.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_leroy_merlin.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_leroy_merlin.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_leroy_merlin = await page_leroy_merlin.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_leroy_merlin = await page_leroy_merlin.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_leroy_merlin.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_leroy_merlin = await page_leroy_merlin.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_leroy_merlin: any = [];

            for (let i = 0; i < title_leroy_merlin.length; i++) {
                const palavras = title_leroy_merlin[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_leroy_merlin.push(brands);
            }

            const store_leroy_merlin = "LeroyMerlin";

            const obj_leroy_merlin: { [key: string]: any } = {};
            obj_leroy_merlin.array1 = title_leroy_merlin;
            obj_leroy_merlin.array2 = price_leroy_merlin;
            obj_leroy_merlin.array3 = brand_leroy_merlin;
            obj_leroy_merlin.array4 = links_leroy_merlin;
            obj_leroy_merlin.array5 = images;

            const new_leroy_merlin = Object.keys(obj_leroy_merlin.array1).map((index) => ({
                store: store_leroy_merlin,
                image: obj_leroy_merlin.array5[index],
                title: obj_leroy_merlin.array1[index],
                price: Number(processarString(obj_leroy_merlin.array2[index])),
                brand: obj_leroy_merlin.array3[index],
                link: obj_leroy_merlin.array4[index]
            }));

            list_products.push(new_leroy_merlin);

            await browser_leroy_merlin.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Leroy Merlin");
        }

    }

}

export { LeroyMerlinMaquinasDeSoldaListService }