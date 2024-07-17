import prismaClient from "../../prisma";

interface AlternativeRequest {
    slug_title: string;
    title_alternative: string;
}

class CreateAlternativeTitleService {
    async execute({ slug_title, title_alternative }: AlternativeRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const alternative = await prismaClient.titleAlternative.create({
            data: {
                slug_title: slug_title,
                title_alternative: title_alternative,
                slug_title_alternative: removerAcentos(title_alternative)
            }
        });

        return alternative;

    }
}

export { CreateAlternativeTitleService }