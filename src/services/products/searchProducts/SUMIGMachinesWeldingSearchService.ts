import puppeteer from 'puppeteer';
import randomUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class SUMIGMachinesWeldingSearchService {
    async execute() {

        const list_products: any = [];
        const maxProducts = 23;

        const urls_sumig = [
            'https://loja.sumig.com/maquinas-de-solda?busca=&ordenacao=maisVendidos%3Adecrescente',
            'https://loja.sumig.com/maquinas-de-solda?busca=&ordenacao=maisVendidos%3Adecrescente&pagina=2'
        ];

        const browser_sumig = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });

        try {
            const page_sumig = await browser_sumig.newPage();
            await page_sumig.setViewport({
                width: 1800,
                height: 900,
                deviceScaleFactor: 1,
                isMobile: false
            });
            await page_sumig.setUserAgent(randomUserAgent.getRandom());

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

            function removerAcentosType(s: string) {
                return s.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/ +/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/[/]/g, "-");
            }

            function processarString(str: string) {
                if (str.includes('.')) {
                    str = str.replace('.', '');
                }

                str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                return str;
            }

            let productCount = 0;

            for (const url_sumig of urls_sumig) {
                await page_sumig.goto(url_sumig);
                await page_sumig.waitForSelector('.spotContent', { timeout: 60000 });

                const links_sumig = await page_sumig.$$eval('.spotContent > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

                for (const link of links_sumig) {
                    if (productCount >= maxProducts && url_sumig === urls_sumig[0]) break;

                    const productPage = await browser_sumig.newPage();
                    try {
                        await productPage.goto(link);

                        await productPage.waitForSelector('.prodTitle', { timeout: 60000 });

                        const title = await productPage.$eval('.prodTitle', (element: HTMLElement | null) => {
                            return element ? element.innerText : '';
                        });

                        await productPage.waitForSelector('.com-precoDe', { timeout: 60000 });

                        const price = await productPage.$eval('.com-precoDe', (element: HTMLElement | null) => {
                            return element ? element.innerText : '';
                        });

                        await productPage.waitForSelector('#zoomImagemProduto', { timeout: 60000 });

                        const image = await productPage.$eval('#zoomImagemProduto', (element: HTMLElement | null) => {
                            return element ? element.getAttribute('src') : '';
                        });

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
                        productCount++;

                        await prismaClient.storeProduct.create({
                            data: {
                                type_product: "Máquinas de Solda",
                                slug_type: removerAcentosType("Máquinas de Solda"),
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
                    } catch (error) {
                        console.error(`Erro ao processar o link ${link}:`, error);
                    } finally {
                        await productPage.close();
                    }
                }
            }

        } catch (error) {
            console.error("Erro ao carregar dados da concorrência SUMIG:", error);
        } finally {
            await browser_sumig.close();
        }

        return list_products;
    }
}

export { SUMIGMachinesWeldingSearchService }