import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class CarrefourMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- CARREFOUR ----------------- //


        const url_carrefour = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-Q7I6b7pVcKPFWHAbXcu084c1qIA:1707228614910&q=maquina+de+solda&tbs=mr:1,merchagg:g115994814%7Cm142916516%7Cm142915541&sa=X&ved=0ahUKEwjgx5CZ8paEAxVFrJUCHehdDDIQsysIpgkoAg&biw=1592&bih=752&dpr=1';

        const browser_carrefour = await puppeteer.launch({
            headless: false
        });
        const page_carrefour = await browser_carrefour.newPage();
        await page_carrefour.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_carrefour.setUserAgent(randonUserAgent.getRandom());
        await page_carrefour.goto(url_carrefour);

        try {

            await page_carrefour.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_carrefour = await page_carrefour.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title = await page_carrefour.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_carrefour.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price = await page_carrefour.$$eval('.HRLxBb', elementos => {
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

            const store = "Carrefour";

            const obj: { [key: string]: any } = {};
            obj.array1 = title;
            obj.array2 = price;
            obj.array3 = brand;
            obj.array4 = links_carrefour;

            const new_mecanico = Object.keys(obj.array1).map((index) => ({
                store,
                title: obj.array1[index],
                price: processarString(obj.array2[index]),
                brand: obj.array3[index],
                link: obj.array4[index]
            }));

            list_products.push(new_mecanico);

            await browser_carrefour.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Carrefour");
        }

    }

}

export { CarrefourMaquinasDeSoldaListService }