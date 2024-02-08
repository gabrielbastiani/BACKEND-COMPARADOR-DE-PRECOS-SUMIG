import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class PontoFrioMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- PONTO FRIO ----------------- //


        const url_ponto_frio = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-OLO9UCuiRm9TJMGuQE6h3Mdycsg:1707240323007&q=maquina+de+solda&tbs=mr:1,merchagg:g115172300%7Cm143195331&sa=X&ved=0ahUKEwjRnf7nnZeEAxWLrJUCHRbmAKAQsysIqwkoFQ&biw=1592&bih=752&dpr=1';

        const browser_ponto_frio = await puppeteer.launch({
            headless: false
        });
        const page_ponto_frio = await browser_ponto_frio.newPage();
        await page_ponto_frio.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_ponto_frio.setUserAgent(randonUserAgent.getRandom());
        await page_ponto_frio.goto(url_ponto_frio);

        try {

            await page_ponto_frio.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_ponto_frio = await page_ponto_frio.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_ponto_frio = await page_ponto_frio.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_ponto_frio.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_ponto_frio = await page_ponto_frio.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_ponto_frio: any = [];

            for (let i = 0; i < title_ponto_frio.length; i++) {
                const palavras = title_ponto_frio[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_ponto_frio.push(brands);
            }

            const store_ponto_frio = "Ponto Frio";

            const obj_ponto_frio: { [key: string]: any } = {};
            obj_ponto_frio.array1 = title_ponto_frio;
            obj_ponto_frio.array2 = price_ponto_frio;
            obj_ponto_frio.array3 = brand_ponto_frio;
            obj_ponto_frio.array4 = links_ponto_frio;

            const new_ponto_frio = Object.keys(obj_ponto_frio.array1).map((index) => ({
                store: store_ponto_frio,
                title: obj_ponto_frio.array1[index],
                price: Number(processarString(obj_ponto_frio[index])),
                brand: obj_ponto_frio.array3[index],
                link: obj_ponto_frio.array4[index]
            }));

            list_products.push(new_ponto_frio);

            await browser_ponto_frio.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Ponto Frio");
        }

    }

}

export { PontoFrioMaquinasDeSoldaListService }