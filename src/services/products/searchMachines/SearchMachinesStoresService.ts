import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

interface SearchRequest {
    urlSearchStore: string;
    stores: string;
}

class SearchMachinesStoresService {
    async execute({ urlSearchStore, stores }: SearchRequest) {

        let hasNextPage = true;
        const list_products: any = [];
        let attempts = 0;

        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page.setUserAgent(randonUserAgent.getRandom());
        await page.goto(urlSearchStore);

        try {

            while (hasNextPage && attempts < 4) {

                await page.waitForSelector('.oR27Gd', { timeout: 60000 });

                const images = await page.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

                await page.waitForSelector('.rgHvZc', { timeout: 60000 });

                const links = await page.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

                const title = await page.$$eval(`.rgHvZc > a`, elementos => {
                    return elementos.map(elemento => elemento.textContent.trim());
                });

                await page.waitForSelector('.HRLxBb', { timeout: 60000 });

                const price = await page.$$eval('.HRLxBb', elementos => {
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

                const store = stores;

                const obj: { [key: string]: any } = {};
                obj.array1 = title;
                obj.array2 = price;
                obj.array3 = brand;
                obj.array4 = links;
                obj.array5 = images;

                const news = Object.keys(obj.array1).map((index) => ({
                    store: store,
                    image: obj.array5[index],
                    title: obj.array1[index],
                    price: Number(processarString(obj.array2[index])),
                    brand: obj.array3[index],
                    link: obj.array4[index]
                }));

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

                for (const item of news) {
                    await prismaClient.storeProduct.create({
                        data: {
                            store: item.store,
                            slug: removerAcentos(item.store),
                            link_search: urlSearchStore,
                            image: item.image,
                            title_product: item.title,
                            slug_title_product: removerAcentosTitle(item.title),
                            price: item.price,
                            brand: item.brand.replace(/\|/g, ''),
                            link: item.link
                        }
                    });
                }

                list_products.push(news);

                const nextButton = await page.$('.u30d4 > a');

                if (nextButton) {
                    const currentURL = page.url();
                    await Promise.all([
                        page.waitForNavigation({ waitUntil: 'networkidle0' }),
                        nextButton.click(),
                    ]);
                    const newURL = page.url();
                    if (currentURL === newURL) {
                        hasNextPage = false;
                    }
                } else {
                    hasNextPage = false;
                }

                attempts++;

            }

            /* await browser.close(); */

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao carregar dados da concorrencia ${stores}`);
        }

    }

}

export { SearchMachinesStoresService }