import puppeteer from 'puppeteer';
import randomUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class SUMIGMachinesWeldingSearchService {
    async execute() {
        const list_products: any = [];
        const baseUrl = 'https://loja.sumig.com/maquinas-de-solda?busca=&ordenacao=maisVendidos%3Adecrescente&pagina=';

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });

        try {
            const page = await browser.newPage();
            await page.setViewport({
                width: 1800,
                height: 900,
                deviceScaleFactor: 1,
                isMobile: false
            });
            await page.setUserAgent(randomUserAgent.getRandom());
            await page.goto(baseUrl);

            let hasNextPage = true;
            let currentPage = 1;

            while (hasNextPage) {
                await page.goto(`${baseUrl}${currentPage}`);
                await page.waitForSelector('.spotContent', { timeout: 60000 });

                const links = await page.$$eval('.spotContent > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

                for (const link of links) {
                    await page.goto(link);
                    await page.waitForSelector('.prodTitle', { timeout: 60000 });

                    const title = await page.$eval('.prodTitle', (element: HTMLElement | null) => element ? element.innerText : '');
                    const price = await page.$eval('.com-precoDe', (element: HTMLElement | null) => element ? element.innerText : '');
                    const image = await page.$eval('#zoomImagemProduto', (element: HTMLElement | null) => element ? element.getAttribute('src') : '');

                    function processarString(str: string) {
                        if (str.includes('.')) {
                            str = str.replace('.', '');
                        }
                        str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
                        return str;
                    }

                    const store = "SUMIG";
                    const brand = "SUMIG";

                    const obj: { [key: string]: any } = {
                        store,
                        image,
                        title,
                        price: Number(processarString(price)),
                        brand,
                        link
                    };

                    list_products.push(obj);

                    await prismaClient.storeProduct.create({
                        data: {
                            type_product: "Máquinas de Solda",
                            slug_type: removerAcentosType("Máquinas de Solda"),
                            store: store,
                            slug: removerAcentos(store),
                            link_search: baseUrl,
                            image: obj.image,
                            title_product: obj.title,
                            slug_title_product: removerAcentosTitle(obj.title),
                            price: obj.price,
                            brand: obj.brand,
                            link: obj.link
                        }
                    });
                }

                // Verifica se há uma próxima página
                hasNextPage = await page.$eval('.fbits-paginacao', (element: HTMLElement | null) => {
                    const nextPageElement = element?.querySelector('a[title="Página ' + (currentPage + 1) + '"]');
                    return !!nextPageElement;
                });

                if (hasNextPage) {
                    currentPage++;
                }
            }

            await browser.close();
            return list_products;

        } catch (error) {
            console.log(error);
            await browser.close();
            throw new Error("Erro ao carregar dados da concorrência = SUMIG");
        }
    }
}

export { SUMIGMachinesWeldingSearchService };

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
