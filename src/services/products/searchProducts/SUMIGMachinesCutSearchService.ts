import puppeteer from 'puppeteer';
import randomUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class SUMIGMachinesCutSearchService {
    async execute() {

        const list_products: any = [];
        const url_sumig = 'https://loja.sumig.com/maquinas-de-corte?busca=&ordenacao=maisVendidos%3Adecrescente';

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

            // Acessa a página inicial
            await page_sumig.goto(url_sumig);
            await page_sumig.waitForSelector('.spotContent', { timeout: 60000 });

            // Captura todos os links dos produtos
            const links_sumig = await page_sumig.$$eval('.spotContent > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const uniqueLinks = [...new Set(links_sumig)]; // Remove duplicados

            for (const link of uniqueLinks) {
                const productPage = await browser_sumig.newPage();
                try {
                    await productPage.goto(link);

                    await productPage.waitForSelector('.prodTitle', { timeout: 60000 });

                    const title = await productPage.$eval('.prodTitle', (element: HTMLElement | null) => {
                        return element ? element.innerText : '';
                    });

                    // Verifica se o título contém "Plasma"
                    if (!title.toLowerCase().includes('plasma')) {
                        await productPage.close();
                        continue; // Pula este produto se não contiver "Plasma" no título
                    }

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

                    try {
                        // Verifique se o slug_title_product existe na tabela titleAlternative
                        const titleAlternative = await prismaClient.titleAlternative.findFirst({
                            where: {
                                slug_title_product: removerAcentosTitle(obj.title)
                            }
                        });

                        let titleProduct = obj.title;
                        let slugTitleProduct = removerAcentosTitle(obj.title);

                        if (titleAlternative) {
                            slugTitleProduct = titleAlternative.slug_title_alternative;
                            titleProduct = titleAlternative.title_alternative;
                        }

                        await prismaClient.storeProduct.create({
                            data: {
                                type_product: "Máquinas de Corte Plasma Manual",
                                slug_type: removerAcentosType("Máquinas de Corte Plasma Manual"),
                                store: store,
                                slug: removerAcentos(store),
                                link_search: url_sumig,
                                image: obj.image,
                                title_product: titleProduct,
                                slug_title_product: slugTitleProduct,
                                price: obj.price,
                                brand: obj.brand,
                                link: obj.link
                            }
                        });

                    } catch (insertError) {
                        console.error(`Erro ao inserir/atualizar produto: ${obj.title}`, insertError);
                    }

                } catch (error) {
                    console.error(`Erro ao processar o link ${link}:`, error);
                } finally {
                    await productPage.close();

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

                                console.log(`Produto atualizado: ${product.title_product}`);
                            }
                        } catch (updateError) {
                            console.error(`Erro ao atualizar produto: ${product.title_product}`, updateError);
                        }
                    }

                }
            }

        } catch (error) {
            console.error("Erro ao carregar dados da concorrência SUMIG");
        } finally {
            await browser_sumig.close();
        }

        return list_products;
    }
}

export { SUMIGMachinesCutSearchService }