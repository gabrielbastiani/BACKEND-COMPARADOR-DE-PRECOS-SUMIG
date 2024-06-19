import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

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
    array6: string[]
}

class SearchAllMachinesWeldingAllStoresListService {
    async execute() {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page.setUserAgent(randonUserAgent.getRandom());
        await page.goto("https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ADLYWIJbjZCMopJ2BpaCJWlmG6mxVqjBpg:1717432364104&q=maquina+de+solda&tbs=mr:1,merchagg:g134886126%7Cg103278022%7Cg115994814%7Cg103001188%7Cg117879318%7Cg115160181%7Cg104823487%7Cg208973168%7Cg8670533%7Cg115172300%7Cg142484886%7Cg103272221%7Cm134880504%7Cm110551677%7Cm285480096%7Cm305474016%7Cm163052156%7Cm111578899%7Cm142915541%7Cm142916516%7Cm142917052%7Cm7423416%7Cm8407917%7Cm143357536%7Cm501057771%7Cm336930894%7Cm775984833%7Cm143340609%7Cm553660352%7Cm626893472%7Cm478855842%7Cm529062034%7Cm120225280%7Cm101617997%7Cm735098639%7Cm735125422%7Cm735128188%7Cm735098660%7Cm735128761%7Cm143195331%7Cm143210258%7Cm5308411824%7Cm712518894%7Cm5069529892%7Cm507986362%7Cm265940141%7Cm623309586%7Cm746589269%7Cm110551671%7Cm142944258%7Cm111576884%7Cm111260681%7Cm163052276&sa=X&ved=0ahUKEwjKnPOP7r-GAxXwpZUCHY4DD9cQsysI1Qoobw&biw=1592&bih=752&dpr=1");

        const list_products: Product[] = [];
        let nextPageExists = true;

        while (nextPageExists) {
            try {
                const titles = await page.$$eval(`.rgHvZc > a`, (elementos) => {
                    return elementos.map((elemento) => elemento.textContent.trim());
                });

                const filteredIndices = titles.map((title, index) => title.includes('Máquina') ? index : -1).filter(index => index !== -1);

                if (filteredIndices.length === 0) {
                    nextPageExists = false;
                    break;
                }

                await page.waitForSelector('.oR27Gd', { timeout: 60000 });

                const images = await page.$$eval('.oR27Gd > img', (el) => el.map((link) => link.src));

                await page.waitForSelector('.rgHvZc', { timeout: 60000 });

                const links = await page.$$eval('.rgHvZc > a', (el) => el.map((link) => link.href));

                await page.waitForSelector('.HRLxBb', { timeout: 60000 });

                const prices = await page.$$eval('.HRLxBb', (elementos) => {
                    return elementos.map((elemento) => elemento.textContent.trim());
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }
                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');
                    return str;
                }

                const brands = filteredIndices.map(i => {
                    const palavras = titles[i].split(' ');
                    return palavras[palavras.length - 1];
                });

                await page.waitForSelector('div.dD8iuc', { timeout: 60000 });

                const store = await page.$$eval('div.dD8iuc', elements => {
                    return elements.map(element => {
                        const clonedElement = element.cloneNode(true);/* @ts-ignore */
                        clonedElement.querySelectorAll('span').forEach((span: { remove: () => any; }) => span.remove());
                        return clonedElement.textContent
                            .replace(/\sde/g, '')
                            .trim();
                    }).filter(text => text.length > 0);
                });

                const obj: DataObject = {
                    array1: filteredIndices.map(i => titles[i]),
                    array2: filteredIndices.map(i => prices[i]),
                    array3: brands,
                    array4: filteredIndices.map(i => links[i]),
                    array5: filteredIndices.map(i => images[i]),
                    array6: store
                };

                const news = obj.array1.map((_, index) => ({
                    store: obj.array6[index],
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

                function removerAcentosType(s: string) {
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
                            type_product: "Máquinas de Solda",
                            slug_type: removerAcentosType("Máquinas de Solda"),
                            store: item.store,
                            slug: removerAcentos(item.store),
                            link_search: "https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ADLYWIJbjZCMopJ2BpaCJWlmG6mxVqjBpg:1717432364104&q=maquina+de+solda&tbs=mr:1,merchagg:g134886126%7Cg103278022%7Cg115994814%7Cg103001188%7Cg117879318%7Cg115160181%7Cg104823487%7Cg208973168%7Cg8670533%7Cg115172300%7Cg142484886%7Cg103272221%7Cm134880504%7Cm110551677%7Cm285480096%7Cm305474016%7Cm163052156%7Cm111578899%7Cm142915541%7Cm142916516%7Cm142917052%7Cm7423416%7Cm8407917%7Cm143357536%7Cm501057771%7Cm336930894%7Cm775984833%7Cm143340609%7Cm553660352%7Cm626893472%7Cm478855842%7Cm529062034%7Cm120225280%7Cm101617997%7Cm735098639%7Cm735125422%7Cm735128188%7Cm735098660%7Cm735128761%7Cm143195331%7Cm143210258%7Cm5308411824%7Cm712518894%7Cm5069529892%7Cm507986362%7Cm265940141%7Cm623309586%7Cm746589269%7Cm110551671%7Cm142944258%7Cm111576884%7Cm111260681%7Cm163052276&sa=X&ved=0ahUKEwjKnPOP7r-GAxXwpZUCHY4DD9cQsysI1Qoobw&biw=1592&bih=752&dpr=1",
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
                throw new Error(`Erro ao carregar dados da concorrência.`);
            }
        }



        // -------------------------- SUMIG -----------------------------//


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
            await page_sumig.setUserAgent(randonUserAgent.getRandom());

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



            // ------------------------------------ ESAB ------------------------------------- //



            



        await browser.close();
        return list_products.flat();
    }
}

export { SearchAllMachinesWeldingAllStoresListService }