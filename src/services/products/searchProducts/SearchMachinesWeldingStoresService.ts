import puppeteer from 'puppeteer';
import randomUserAgent from 'random-useragent';
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

class SearchMachinesWeldingStoresService {
    async execute({ urlSearchStore, stores }: SearchRequest) {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page.setUserAgent(randomUserAgent.getRandom());
        await page.goto(urlSearchStore);

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

                const store = stores;

                const obj: DataObject = {
                    array1: filteredIndices.map(i => titles[i]),
                    array2: filteredIndices.map(i => prices[i]),
                    array3: brands,
                    array4: filteredIndices.map(i => links[i]),
                    array5: filteredIndices.map(i => images[i])
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

                function removerAcentosType(s: string) {
                    return s.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .replace(/ +/g, "-")
                        .replace(/-{2,}/g, "-")
                        .replace(/[/]/g, "-");
                }

                for (const item of news) {
                    try {
                        // Verifique se o slug_title_product existe na tabela titleAlternative
                        const titleAlternative = await prismaClient.titleAlternative.findFirst({
                            where: {
                                slug_title_product: removerAcentosTitle(item.title)
                            }
                        });

                        let titleProduct = item.title;
                        let slugTitleProduct = removerAcentosTitle(item.title);

                        if (titleAlternative) {
                            slugTitleProduct = titleAlternative.slug_title_alternative;
                            titleProduct = titleAlternative.title_alternative;
                        }

                        await prismaClient.storeProduct.create({
                            data: {
                                type_product: "Máquinas de Solda",
                                slug_type: removerAcentosType("Máquinas de Solda"),
                                store: item.store,
                                slug: removerAcentos(item.store),
                                link_search: urlSearchStore,
                                image: item.image,
                                title_product: titleProduct,
                                slug_title_product: slugTitleProduct,
                                price: item.price,
                                brand: item.brand.replace(/\|/g, ''),
                                link: item.link
                            }
                        });

                    } catch (insertError) {
                        console.error(`Erro ao inserir/atualizar produto: ${item.title}`, insertError);
                    }
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
                console.error(`Erro ao carregar dados da concorrência ${stores}`, error);
                throw new Error(`Erro ao carregar dados da concorrência ${stores}`);
            }
        }

        await browser.close();

        // Revalidação e atualização dos dados existentes no banco de dados
        const existingProducts = await prismaClient.storeProduct.findMany();

        for (const product of existingProducts) {
            try {
                const titleAlternative = await prismaClient.titleAlternative.findFirst({
                    where: {
                        slug_title_product: product.slug_title_product
                    }
                });

                if (titleAlternative) {
                    await prismaClient.storeProduct.updateMany({
                        where: {
                            id: product.id
                        },
                        data: {
                            title_product: titleAlternative.title_alternative,
                            slug_title_product: titleAlternative.slug_title_alternative
                        }
                    });
                }
            } catch (updateError) {
                console.error(`Erro ao atualizar produto: ${product.title_product}`, updateError);
            }
        }

        return list_products.flat();
    }
}

export { SearchMachinesWeldingStoresService };