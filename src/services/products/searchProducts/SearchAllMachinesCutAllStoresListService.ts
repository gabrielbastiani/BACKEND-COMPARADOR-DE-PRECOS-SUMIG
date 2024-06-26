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

class SearchAllMachinesCutAllStoresListService {
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
        await page.goto("https://www.google.com/search?sca_esv=34178eb96b5aeaa8&tbm=shop&sxsrf=ADLYWILNvv7Sj4iQSp-z422okhLv_SD6SQ:1719407578223&q=maquina+de+corte+plasma+manual&tbs=mr:1,merchagg:g103278022%7Cg134886126%7Cg208973168%7Cg104823487%7Cg8670533%7Cg115160181%7Cg103001188%7Cg142484886%7Cg103272221%7Cm110551677%7Cm111260480%7Cm134880504%7Cm134942054%7Cm101617997%7Cm10892984%7Cm553660352%7Cm478855842%7Cm135437352%7Cm120225280%7Cm732046960%7Cm735128761%7Cm735098639%7Cm735098660%7Cm735128188%7Cm735125422%7Cm501057771%7Cm143357536%7Cm336930894%7Cm143358244%7Cm7423416%7Cm265940141%7Cm507986362%7Cm623309586%7Cm408640043%7Cm133736100%7Cm110551671%7Cm163052276&sa=X&ved=0ahUKEwiU4LGvrPmGAxXHrZUCHRmYD_IQsysIqwkoOg&biw=1592&bih=752&dpr=1");

        const list_products: Product[] = [];
        let nextPageExists = true;

        while (nextPageExists) {
            try {
                const titles = await page.$$eval(`.rgHvZc > a`, (elementos) => {
                    return elementos.map((elemento) => elemento.textContent.trim());
                });

                const filteredIndices = titles.map((title, index) => title.includes('Plasma') ? index : -1).filter(index => index !== -1);

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

                await prismaClient.$transaction(async (transaction) => {
                    for (const item of news) {
                        await transaction.storeProduct.create({
                            data: {
                                type_product: "Máquinas de Solda",
                                slug_type: removerAcentosType("Máquinas de Solda"),
                                store: item.store,
                                slug: removerAcentos(item.store),
                                link_search: "https://www.google.com/search?sca_esv=34178eb96b5aeaa8&tbm=shop&sxsrf=ADLYWILNvv7Sj4iQSp-z422okhLv_SD6SQ:1719407578223&q=maquina+de+corte+plasma+manual&tbs=mr:1,merchagg:g103278022%7Cg134886126%7Cg208973168%7Cg104823487%7Cg8670533%7Cg115160181%7Cg103001188%7Cg142484886%7Cg103272221%7Cm110551677%7Cm111260480%7Cm134880504%7Cm134942054%7Cm101617997%7Cm10892984%7Cm553660352%7Cm478855842%7Cm135437352%7Cm120225280%7Cm732046960%7Cm735128761%7Cm735098639%7Cm735098660%7Cm735128188%7Cm735125422%7Cm501057771%7Cm143357536%7Cm336930894%7Cm143358244%7Cm7423416%7Cm265940141%7Cm507986362%7Cm623309586%7Cm408640043%7Cm133736100%7Cm110551671%7Cm163052276&sa=X&ved=0ahUKEwiU4LGvrPmGAxXHrZUCHRmYD_IQsysIqwkoOg&biw=1592&bih=752&dpr=1",
                                image: item.image,
                                title_product: item.title,
                                slug_title_product: removerAcentosTitle(item.title),
                                price: item.price,
                                brand: item.brand.replace(/\|/g, ''),
                                link: item.link
                            }
                        });
                    }
                });

                list_products.push(...news);

                const nextPageLink = await page.$('.u30d4 > a:last-child');
                if (nextPageLink) {
                    await nextPageLink.click();
                    await page.waitForNavigation({ waitUntil: 'networkidle2' });
                } else {
                    nextPageExists = false;
                }
            } catch (error) {
                console.log("Ocorreu algum erro ao coletar os dados da concorrência");
                console.error(error);
                await browser.close();
                throw new Error("Ocorreu algum erro ao coletar os dados da concorrência");
            }
        }

        await browser.close();
        return list_products.flat();

    }
}

export { SearchAllMachinesCutAllStoresListService }