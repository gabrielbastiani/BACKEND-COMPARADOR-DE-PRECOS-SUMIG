import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';

class MadeiraMadeiraMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- MADEIRAMADEIRA ----------------- //


        const url_madeiramadeira = 'https://www.madeiramadeira.com.br/busca?q=maquina%20de%20solda&f=eyJxdWVyeVN0cmluZyI6W119';

        let m = 1;

        const browser_madeira = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
        const page_madeiramadeira = await browser_madeira.newPage();
        await page_madeiramadeira.setViewport({
            width: 1800,
            height: 900,
            deviceScaleFactor: 1,
            isMobile: false
        });
        await page_madeiramadeira.setUserAgent(randonUserAgent.getRandom());
        await page_madeiramadeira.goto(url_madeiramadeira);

        try {

            await page_madeiramadeira.waitForSelector('.cav--c-zPire', { timeout: 60000 });

            const links_madeiramadeira = await page_madeiramadeira.$$eval('.cav--c-zPire > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            for (const link of links_madeiramadeira) {
                if (m === 21) continue;
                await page_madeiramadeira.goto(link);

                await page_madeiramadeira.waitForSelector('.cav--c-fpAEqe', { timeout: 60000 });

                const title = await page_madeiramadeira.$eval('.cav--c-fpAEqe', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                await page_madeiramadeira.waitForSelector('.cav--c-gNPphv-hHqInm-size-h3', { timeout: 60000 });

                const price = await page_madeiramadeira.$eval('.cav--c-gNPphv-hHqInm-size-h3', (element: HTMLElement | null) => {
                    return element ? element.innerText : '';
                });

                function processarString(str: string) {
                    if (str.includes('.')) {
                        str = str.replace('.', '');
                    }

                    str = str.replace(/R\$\s*/g, '').replace(/,/g, '.');

                    return str;
                }

                await page_madeiramadeira.waitForSelector('.cav--c-difWUU', { timeout: 60000 });

                const tabelaSelector = '.cav--c-dKpJQB';

                const dadosDaTabela = await page_madeiramadeira.evaluate((tabelaSelector) => {
                    const tabela = document.querySelector(tabelaSelector);
                    const linhas = tabela.querySelectorAll('tr');

                    const dados = [];

                    linhas.forEach((linha) => {
                        const colunas = linha.querySelectorAll('td');
                        const linhaDados = [];

                        colunas.forEach((coluna) => {
                            linhaDados.push(coluna.textContent.trim());
                        });

                        dados.push(linhaDados);

                    });

                    return dados;

                }, tabelaSelector);

                const store = "MadeiraMadeira";

                const obj: { [key: string]: any } = {};
                obj.store = store;
                obj.title = title;
                obj.price = Number(processarString(price));
                obj.brand = dadosDaTabela[0][1];
                obj.link = link;

                list_products.push(obj);

                m++;
            }

            await browser_madeira.close();

            return list_products;

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = MadeiraMadeira");
        }

    }

}

export { MadeiraMadeiraMaquinasDeSoldaListService }