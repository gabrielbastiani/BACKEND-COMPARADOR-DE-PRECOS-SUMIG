import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class DutraMaquinasMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- DUTRA MAQUINAS ----------------- //


        const url_dutra = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn086tMPL4KSPRiVchegk-1h8jr6dvA:1707237844333&q=maquina+de+solda&tbs=mr:1,merchagg:g103001188%7Cm7423416&sa=X&ved=0ahUKEwjwiIjKlJeEAxX6rpUCHSoMAXQQsysImwkoBw&biw=1592&bih=752&dpr=1';

        const browser_dutra = await puppeteer.launch({
            headless: false
        });
        const page_dutra = await browser_dutra.newPage();
        await page_dutra.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_dutra.setUserAgent(randonUserAgent.getRandom());
        await page_dutra.goto(url_dutra);

        try {

            await page_dutra.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_dutra = await page_dutra.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_dutra = await page_dutra.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_dutra.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_dutra = await page_dutra.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_dutra: any = [];

            for (let i = 0; i < title_dutra.length; i++) {
                const palavras = title_dutra[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_dutra.push(brands);
            }

            const store_dutra = "Dutra Máquinas";

            const obj_dutra: { [key: string]: any } = {};
            obj_dutra.array1 = title_dutra;
            obj_dutra.array2 = price_dutra;
            obj_dutra.array3 = brand_dutra;
            obj_dutra.array4 = links_dutra;

            const new_dutra = Object.keys(obj_dutra.array1).map((index) => ({
                store: store_dutra,
                title: obj_dutra.array1[index],
                price: processarString(obj_dutra.array2[index]),
                brand: obj_dutra.array3[index],
                link: obj_dutra.array4[index]
            }));

            list_products.push(new_dutra);

            await browser_dutra.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Dutra Máquinas");
        }

    }

}

export { DutraMaquinasMaquinasDeSoldaListService }