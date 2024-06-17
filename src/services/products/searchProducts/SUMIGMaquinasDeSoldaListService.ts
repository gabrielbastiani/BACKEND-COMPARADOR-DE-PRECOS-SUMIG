import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class SUMIGMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- SUMIG ----------------- //


        const url_sumig = 'https://loja.sumig.com/maquinas-de-solda?busca=&ordenacao=maisVendidos%3Adecrescente&gad_source=2&gclid=CjwKCAiA_aGuBhACEiwAly57MddDkSyun8v2TF75RfgBSGYJO7Z4lIJgUn7yUJXC4ds9Cc8t-6eRFBoC4REQAvD_BwE&pagina=1';

        let s = 1;

        const browser_sumig = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_sumig = await browser_sumig.newPage();
        await page_sumig.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_sumig.setUserAgent(randonUserAgent.getRandom());
        await page_sumig.goto(url_sumig);

        try {

            await page_sumig.waitForSelector('.spotContent', { timeout: 60000 });

            const links_sumig = await page_sumig.$$eval('.spotContent > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            function removerAcentos(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            function removerAcentosTitle(s: any) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            for (const link of links_sumig) {
                if (s === 21) continue;
                await page_sumig.goto(link);

                await page_sumig.waitForSelector('.prodTitle', { timeout: 60000 });

                const title = await page_sumig.$eval('.prodTitle', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_sumig.waitForSelector('.com-precoDe', { timeout: 60000 });

                const price = await page_sumig.$eval('.com-precoDe', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_sumig.waitForSelector('#zoomImagemProduto', { timeout: 60000 });

                const image = await page_sumig.$eval('#zoomImagemProduto', (element: HTMLElement | null) => {
                    return element ? element.getAttribute('src') : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }
    
                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
    
                    return str;
                }

                const store = "SUMIG";
                const brand = "SUMIG";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.image = image;
                obj.title = title;
                obj.price = Number(processarString(price));
                obj.brand = brand;
                obj.link = link;

                list_products.push(obj);

                s++;

                await prismaClient.storeProduct.create({
                    data: {
                        store: store,
                        slug: removerAcentos(store),
                        link_search: url_sumig,
                        image: obj.image,
                        title_product: obj.title,
                        slug_title_product: removerAcentosTitle(obj.title),
                        price: obj.price,
                        brand: obj.brand,
                        link: obj.link
                    }
                });
            }

            await browser_sumig.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = SUMIG");
        }

    }

}

export { SUMIGMaquinasDeSoldaListService }