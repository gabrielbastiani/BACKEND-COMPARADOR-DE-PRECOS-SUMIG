import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class CasasBahiaMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- CASAS BAHIA ----------------- //


        const url_casas_bahia = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn09dWL_fao9wJaw4kCZfnHCaHzEZhw:1707239739044&q=maquina+de+solda&tbs=mr:1,merchagg:g115160181%7Cm143357536%7Cm336930894%7Cm501057771&sa=X&ved=0ahUKEwje28PRm5eEAxXJr5UCHZuND6YQsysIjwkoAQ&biw=1592&bih=752&dpr=1';

        const browser_casas_bahia = await puppeteer.launch({
            headless: false
        });
        const page_casas_bahia = await browser_casas_bahia.newPage();
        await page_casas_bahia.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_casas_bahia.setUserAgent(randonUserAgent.getRandom());
        await page_casas_bahia.goto(url_casas_bahia);

        try {

            await page_casas_bahia.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_casas_bahia = await page_casas_bahia.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_casas_bahia = await page_casas_bahia.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_casas_bahia.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_casas_bahia = await page_casas_bahia.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_casas_bahia: any = [];

            for (let i = 0; i < title_casas_bahia.length; i++) {
                const palavras = title_casas_bahia[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_casas_bahia.push(brands);
            }

            const store_casas_bahia = "Casas Bahia";

            const obj_casas_bahia: { [key: string]: any } = {};
            obj_casas_bahia.array1 = title_casas_bahia;
            obj_casas_bahia.array2 = price_casas_bahia;
            obj_casas_bahia.array3 = brand_casas_bahia;
            obj_casas_bahia.array4 = links_casas_bahia;

            const new_casas_bahia = Object.keys(obj_casas_bahia.array1).map((index) => ({
                store: store_casas_bahia,
                title: obj_casas_bahia.array1[index],
                price: processarString(obj_casas_bahia.array2[index]),
                brand: obj_casas_bahia.array3[index],
                link: obj_casas_bahia.array4[index]
            }));

            list_products.push(new_casas_bahia);

            await browser_casas_bahia.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Casas Bahia");
        }

    }

}

export { CasasBahiaMaquinasDeSoldaListService }