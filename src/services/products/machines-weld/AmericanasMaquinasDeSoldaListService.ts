import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class AmericanasMaquinasDeSoldaListService {
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

        try {

            await page_americanas.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_americanas = await page_americanas.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_americanas = await page_americanas.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_americanas.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_americanas = await page_americanas.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
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
                price: processarString(obj_americanas.array2[index]),
                brand: obj_americanas.array3[index],
                link: obj_americanas.array4[index]
            }));

            list_products.push(new_americanas);

            await browser_americanas.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Americanas");
        }

    }

}

export { AmericanasMaquinasDeSoldaListService }