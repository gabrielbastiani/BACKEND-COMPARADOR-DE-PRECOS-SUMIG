import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class ShopeeMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- SHOPEE ----------------- //


        const url_shopee = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0_0X7huNLpJ741UdsEWKeFirydptA:1707238615194&q=maquina+de+solda&tbs=mr:1,merchagg:g142484886%7Cm5069529892%7Cm507986362%7Cm733145420%7Cm623309586%7Cm735399210&sa=X&ved=0ahUKEwiS0tG5l5eEAxU7q5UCHbc7DcsQsysItAkoGA&biw=1592&bih=752&dpr=1';

        const browser_shopee = await puppeteer.launch({
            headless: false
        });
        const page_shopee = await browser_shopee.newPage();
        await page_shopee.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_shopee.setUserAgent(randonUserAgent.getRandom());
        await page_shopee.goto(url_shopee);

        try {

            await page_shopee.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_shopee.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_shopee.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_shopee = await page_shopee.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title_shopee = await page_shopee.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_shopee.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price_shopee = await page_shopee.$$eval('.HRLxBb', elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            const brand_shopee: any = [];

            for (let i = 0; i < title_shopee.length; i++) {
                const palavras = title_shopee[i].split(' ');
                const brands = palavras[palavras.length - 1];

                brand_shopee.push(brands);
            }

            const store_shopee = "Shopee";

            const obj_shopee: { [key: string]: any } = {};
            obj_shopee.array1 = title_shopee;
            obj_shopee.array2 = price_shopee;
            obj_shopee.array3 = brand_shopee;
            obj_shopee.array4 = links_shopee;
            obj_shopee.array5 = images;

            const new_shopee = Object.keys(obj_shopee.array1).map((index) => ({
                store: store_shopee,
                image: obj_shopee.array5[index],
                title: obj_shopee.array1[index],
                price: Number(processarString(obj_shopee[index])),
                brand: obj_shopee.array3[index],
                link: obj_shopee.array4[index]
            }));

            list_products.push(new_shopee);

            await browser_shopee.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Shopee");
        }

    }

}

export { ShopeeMaquinasDeSoldaListService }