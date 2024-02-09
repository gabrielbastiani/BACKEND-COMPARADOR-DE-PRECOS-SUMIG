import puppeteer from 'puppeteer';
import randonUserAgent from 'random-useragent';
import prismaClient from '../../../prisma';

class LojaDoMecanicoMaquinasDeSoldaListService {
    async execute() {

        const list_products: any = [];


        // ----------------- LOJA DO MECANICO ----------------- //


        const url_mecanico = 'https://www.google.com/search?sca_esv=584838229&tbm=shop&sxsrf=ACQVn0-GEFCj6Gvd40tdVLc00-cDZDzxPg:1706872438258&q=maquina+de+solda&tbs=mr:1,merchagg:m10892984&sa=X&ved=0ahUKEwiHm--qw4yEAxUGJrkGHd5IAdEQsysIwwkoAg&biw=1358&bih=620&dpr=1';

        const browser_mecanico = await puppeteer.launch({
            headless: false
        });
        const page_mecanico = await browser_mecanico.newPage();
        await page_mecanico.setViewport({
            width: 775,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true
        });
        await page_mecanico.setUserAgent(randonUserAgent.getRandom());
        await page_mecanico.goto(url_mecanico);

        try {

            await page_mecanico.waitForSelector('.oR27Gd', { timeout: 60000 });

            const images = await page_mecanico.$$eval('.oR27Gd > img', (el: any[]) => el.map((link: { src: any; }) => link.src));

            await page_mecanico.waitForSelector('.rgHvZc', { timeout: 60000 });

            const links_mecanico = await page_mecanico.$$eval('.rgHvZc > a', (el: any[]) => el.map((link: { href: any; }) => link.href));

            const title = await page_mecanico.$$eval(`.rgHvZc > a`, elementos => {
                return elementos.map(elemento => elemento.textContent.trim());
            });

            await page_mecanico.waitForSelector('.HRLxBb', { timeout: 60000 });

            const price = await page_mecanico.$$eval('.HRLxBb', elementos => {
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

            const store = "Loja do Mecanico";

            const obj: { [key: string]: any } = {};
            obj.array1 = title;
            obj.array2 = price;
            obj.array3 = brand;
            obj.array4 = links_mecanico;
            obj.array5 = images;

            const new_mecanico = Object.keys(obj.array1).map((index) => ({
                store,
                image: obj.array5[index],
                title: obj.array1[index],
                price: Number(processarString(obj.array2[index])),
                brand: obj.array3[index],
                link: obj.array4[index]
            }));

            for (const item of new_mecanico) {
                await prismaClient.storeProduct.create({
                    data: {
                        store: item.store,
                        image: item.image,
                        title_product: item.title,
                        price: item.price,
                        brand: item.brand.replace(/\|/g, ''),
                        link: item.link
                    }
                });
            }

            list_products.push(new_mecanico);

            await browser_mecanico.close();

            return list_products[0];

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao carregar dados da concorrencia = Loja do Mecanico");
        }

    }

}

export { LojaDoMecanicoMaquinasDeSoldaListService }