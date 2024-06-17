import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

interface SearchRequest {
    urlSearchStore: string;
    stores: string;
}

interface Product {
    store: string;
    image: string;
    title: string;
    price: number;
    brand: string;
    link: string;
}

interface DataObject {
    array1: string[];
    array2: string[];
    array3: string[];
    array4: string[];
    array5: string[];
}

class SearchMachinesStoresService {
    async execute({ urlSearchStore, stores }: SearchRequest) {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page.setUserAgent(randonUserAgent.getRandom());
        await page.goto(urlSearchStore);

        const list_products: Product[] = [];
        let nextPageExists = true;

        while (nextPageExists) {
            try {
                const title = await page.$$eval(`.rgHvZc > a`, (elementos) => {
                    return elementos.map((elemento) => elemento.textContent.trim());
                });

                await page.waitForSelector('.oR27Gd', { timeout: 60000 });

                const images = await page.$$eval('.oR27Gd > img', (el) => el.map((link) => link.src));

                await page.waitForSelector('.rgHvZc', { timeout: 60000 });

                const links = await page.$$eval('.rgHvZc > a', (el) => el.map((link) => link.href));

                await page.waitForSelector('.HRLxBb', { timeout: 60000 });

                const price = await page.$$eval('.HRLxBb', (elementos) => {
                    return elementos.map((elemento) => elemento.textContent.trim());
                });

                function processarString(str) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }
                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
                    return str;
                }

                const brand = [];

                for (let i = 0; i < title.length; i++) {
                    const palavras = title[i].split(' ');
                    const brands = palavras[palavras.length - 1];
                    brand.push(brands);
                }

                const store = stores;

                const obj: DataObject = {
                    array1: title,
                    array2: price,
                    array3: brand,
                    array4: links,
                    array5: images
                };

                const news = obj.array1.map((_, index) => ({
                    store: store,
                    image: obj.array5[index],
                    title: obj.array1[index],
                    price: Number(processarString(obj.array2[index])),
                    brand: obj.array3[index],
                    link: obj.array4[index]
                }));

                function removerAcentos(s: string) {
                    return s.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .replace(/ +/g, "-")
                        .replace(/-{2,}/g, "-")
                        .replace(/[/]/g, "-");
                }

                function removerAcentosTitle(s: string) {
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

                list_products.push(...news);

                const nextPageLink = await page.$('.u30d4 > a:last-child');
                if (nextPageLink) {
                    await nextPageLink.click();
                    await page.waitForNavigation({ waitUntil: 'networkidle2' });
                } else {
                    nextPageExists = false;
                }
            } catch (error) {
                console.log(error);
                throw new Error(`Erro ao carregar dados da concorrência ${stores}`);
            }
        }

        await browser.close();
        return list_products.flat();

    }

}

export { SearchMachinesStoresService }