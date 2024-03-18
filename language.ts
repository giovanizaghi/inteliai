import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export default function language() {
    const translations = {
        pt: {
            avatares: 'Avatares',
            criarMeuAvatar: 'Criar meu avatar',
            avataresDe: "Avatares de",
            inteligenciaArtificialAbreviado: "IA",
            mensagemBoasVindas: "Transforme suas fotos em avatares sensacionais usando uma avançada tecnologia de IA",
            gerar: "Gerar",
            deixeIaDecidir: "Deixe a IA decidir",
            imagem: "Imagem",
            teste: "Teste",
            abstrato: "Abstrato",
            classico: "Clássico",
            realista: "Realista",
            maisUsados: "Mais usados",
            anime: "Anime",
            videoGame: "Video Game",
            sugestoesCriador: "Sugestões do criador",
            estilo: "Estilo",
            testeEstePrompt: "Teste este prompt",
            com: "com", //equivalente a 'with' em ingles
            obterProVantagem1: "Criação de arte- ilimitada", //manter o hífen, pois é após ele que o código vai deixar as palavras depois dele de outra cor
            obterProVantagem2: "Processamento de imagem- mais rápido", //manter o hífen, pois é após ele que o código vai deixar as palavras depois dele de outra cor
            obterProVantagem3: "Toda experiência- sem anúncios", //manter o hífen, pois é após ele que o código vai deixar as palavras depois dele de outra cor
            obterProVantagem4: "Qualidade de imagem- extrema", //manter o hífen, pois é após ele que o código vai deixar as palavras depois dele de outra cor
            obtenhaAcessoCompleto: "Obtenha acesso completo",
            diasDeTesteGratis: "dias de teste grátis",
            depois: "depois", //contexto "pagará 10 dólares depois de 3 semanas"
            semana: "semana",
            acessoVitalicio: "Acesso vitalício",
            pagamentoUnico: "Pagamento único",
            ofertaEspecial: "Oferta especial",
            erroPermissaoGaleria: "Permissão negada para acessar a biblioteca de fotos.",
            urlImagemInvalida: "URL da imagem inválida.",
            mensagemImagemSalva: "Imagem salva na biblioteca de fotos.",
            erroSalvarImagem: "Erro ao salvar a imagem na biblioteca de fotos",
            marcaDagua: "Marca d'àgua",
            gerarNovamente: "Gerar novamente",
            salvar: "Salvar",
            compartilhar: "Compartilhar",
            limparTudo: "Limpar tudo", //Limpar no sentido de remover o conteúdo de um campo de texto
            categoriasDisponiveis: "Categorias disponíveis",
            natureza: "Natureza",
            insiraSeuTextoAqui: "Insira seu texto aqui",
            mensagemAguardoGerandoImaegem: "Gerando sua imagem, aguarde...",
        },
    };

    const i18n = new I18n(translations);

    i18n.locale = Localization.locale;
    i18n.enableFallback = true;

    return {
        texts: (str: string) => i18n.t(str),
    }
}