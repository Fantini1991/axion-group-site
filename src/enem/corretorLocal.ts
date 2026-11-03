import type { CompetenciaCorrigida, CorrecaoRedacao, TemaRedacao } from "./types";

/**
 * Correção automática por regras, usada quando a correção por IA não está disponível.
 * Ela analisa sinais objetivos do texto (estrutura, conectivos, proposta de intervenção,
 * desvios comuns) para estimar a nota em cada competência do ENEM. É uma estimativa:
 * não substitui a leitura de um corretor humano.
 */

const NIVEIS = [0, 40, 80, 120, 160, 200];
const arredondar = (n: number) => NIVEIS.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a));

const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

interface Desvio {
  regex: RegExp;
  correcao: string;
  explicacao: string;
}

const DESVIOS: Desvio[] = [
  { regex: /\ba gente\b/gi, correcao: "nós / a sociedade", explicacao: "'A gente' é coloquial. Na redação, prefira a 3ª pessoa ou 'nós'." },
  { regex: /\bpra\b/gi, correcao: "para", explicacao: "'Pra' é uma forma da oralidade; use 'para'." },
  { regex: /(?<!\p{L})(tá|tô|né|vc|vcs|pq|tb|tbm|blz)(?!\p{L})/giu, correcao: "forma por extenso", explicacao: "Abreviações e marcas de oralidade não são aceitas na norma-padrão escrita." },
  { regex: /\bconcerteza\b/gi, correcao: "com certeza", explicacao: "Escreve-se separado: 'com certeza'." },
  { regex: /\bderrepente\b/gi, correcao: "de repente", explicacao: "Escreve-se separado: 'de repente'." },
  { regex: /\bmenas\b/gi, correcao: "menos", explicacao: "'Menos' é invariável; 'menas' não existe na norma-padrão." },
  { regex: /\bhouveram\b/gi, correcao: "houve", explicacao: "No sentido de 'existir', o verbo haver é impessoal e fica no singular: 'houve problemas'." },
  { regex: /\bfazem (\d+|dois|duas|tr[eê]s|muitos|v[aá]rios) anos\b/gi, correcao: "faz ... anos", explicacao: "Indicando tempo decorrido, 'fazer' é impessoal: 'faz dez anos'." },
  { regex: /\bseje\b/gi, correcao: "seja", explicacao: "A forma correta do verbo ser no subjuntivo é 'seja'." },
  { regex: /\bmais porém\b/gi, correcao: "porém / mas", explicacao: "'Mais porém' é redundante (dois conectivos de oposição) e 'mais' indica adição." },
  { regex: /\bmim (fazer|ler|escrever|estudar|ir|ver|falar)\b/gi, correcao: "eu + verbo", explicacao: "Antes de verbo no infinitivo, use 'eu': 'para eu fazer'." },
  { regex: /\bencima\b/gi, correcao: "em cima", explicacao: "Escreve-se separado: 'em cima'." },
  { regex: /\bmal educad/gi, correcao: "mal-educado", explicacao: "Com hífen: 'mal-educado'." },
  { regex: /\ba nível de\b/gi, correcao: "em nível de / no âmbito de", explicacao: "'A nível de' é considerado inadequado; prefira 'em nível de' ou 'no âmbito de'." },
  { regex: /\bonde\b(?=[^.]*\b(ano|época|momento|período|situação)\b)/gi, correcao: "em que / no qual", explicacao: "'Onde' deve indicar lugar físico. Para tempo ou situação, use 'em que'." },
  { regex: /\s+,/g, correcao: ",", explicacao: "Não se coloca espaço antes da vírgula." },
  { regex: /[.!?]\s+[a-zà-ú]/g, correcao: "letra maiúscula após ponto", explicacao: "Depois de ponto final, a frase começa com letra maiúscula." },
  { regex: /\beu (acho|penso|acredito)\b/gi, correcao: "construção impessoal", explicacao: "Evite a 1ª pessoa opinativa ('eu acho'); o texto dissertativo-argumentativo deve ser impessoal." },
];

const CONECTIVOS = [
  "além disso", "ademais", "outrossim", "por conseguinte", "portanto", "logo", "dessa forma", "desse modo", "assim",
  "nesse sentido", "nesse contexto", "em primeiro lugar", "em segundo lugar", "primeiramente", "por fim", "por outro lado",
  "no entanto", "entretanto", "contudo", "todavia", "porém", "embora", "ainda que", "apesar de", "visto que", "uma vez que",
  "já que", "posto que", "porque", "pois", "devido a", "em virtude de", "consequentemente", "sob esse viés", "sob essa ótica",
  "diante disso", "diante do exposto", "em suma", "em síntese", "de fato", "com efeito", "ou seja", "isto é", "a saber",
  "à vista disso", "nessa perspectiva", "paralelamente", "ainda", "também", "tal como", "assim como", "segundo", "conforme",
];

const REPERTORIO = [
  /constitui[cç][aã]o/i, /\blei\b/i, /estatuto/i, /\bsegundo (o|a)\b/i, /de acordo com/i, /fil[oó]sofo/i, /soci[oó]log/i,
  /\bibge\b/i, /\bonu\b/i, /\boms\b/i, /\b(18|19|20)\d{2}\b/, /pesquisa/i, /hist[oó]ria/i, /\bobra\b/i, /\blivro\b/i, /\bfilme\b/i,
  /\bs[eé]culo\b/i, /declara[cç][aã]o universal/i, /artigo \d+/i, /\bart\. ?\d+/i, /pensador/i, /teoria/i, /conceito/i, /["“”]/,
];

const AGENTES = [
  "governo", "estado", "ministério", "ministerio", "poder público", "poder publico", "escola", "escolas", "mídia", "midia",
  "ong", "ongs", "família", "familia", "sociedade civil", "congresso", "prefeitura", "prefeituras", "secretaria", "empresas",
  "instituições", "instituicoes", "poder legislativo", "legislativo", "judiciário", "imprensa", "plataformas", "universidades",
];
const ACAO = [/\bdeve(m|ria|riam)?\b/i, /\bcabe (ao|à|aos|às)\b/i, /é (necessário|fundamental|imprescindível|preciso|urgente) que/i, /\bprecisa(m)?\b/i, /\bcompete\b/i, /\bpromover\b/i, /\bcriar\b/i, /\bimplementar\b/i];
const MEIO = [/por meio de/i, /\bmediante\b/i, /atrav[eé]s de/i, /por intermédio de/i, /\bcom o uso de/i, /\bpor meio da/i, /\bpor meio do/i, /\bvia\b/i, /\bcom (a|o) (criação|ampliação|realização|implementação)/i];
const FINALIDADE = [/a fim de/i, /\bpara que\b/i, /com o (objetivo|intuito|propósito) de/i, /com a finalidade de/i, /\bvisando\b/i, /de modo a/i, /de forma a/i, /\bpara (garantir|assegurar|reduzir|combater|promover|ampliar|diminuir|evitar|mitigar|valorizar)\b/i];
const DETALHAMENTO = [/ou seja/i, /isto é/i, /\bcomo\b/i, /\bpor exemplo\b/i, /\b(que|o qual|a qual) (é|são|seja|tem|possui)\b/i, /,\s*(órgão|instituição|responsável|entidade)/i, /—|–/];

function contar(regexes: RegExp[], texto: string) {
  return regexes.filter((r) => r.test(texto)).length;
}

export function corrigirLocalmente(texto: string, tema: TemaRedacao): CorrecaoRedacao {
  const limpo = texto.trim();
  const palavras = limpo.split(/\s+/).filter(Boolean);
  const paragrafos = limpo.split(/\n\s*\n|\n/).map((p) => p.trim()).filter((p) => p.length > 0);
  const linhasEstimadas = Math.ceil(limpo.length / 75);
  const baseNorm = normalizar(limpo);

  const vazia = (motivo: string): CorrecaoRedacao => ({
    metodo: "automatica",
    notaTotal: 0,
    resumo: motivo,
    anulada: motivo,
    competencias: [1, 2, 3, 4, 5].map((n) => ({
      numero: n as 1 | 2 | 3 | 4 | 5,
      nota: 0,
      comentario: "Redação zerada — a competência não pode ser avaliada.",
      pontosFortes: [],
      pontosAMelhorar: [motivo],
      comoMelhorar: "Escreva um texto dissertativo-argumentativo completo, entre 20 e 30 linhas, sobre o tema proposto.",
    })),
    desvios: [],
  });

  if (linhasEstimadas <= 7 || palavras.length < 80) {
    return vazia("Texto insuficiente: no ENEM, redações com até 7 linhas recebem nota zero.");
  }

  // ---------- Competência 2: tema ----------
  const chavesEncontradas = tema.palavrasChave.filter((k) => baseNorm.includes(normalizar(k)));
  const proporcaoTema = chavesEncontradas.length / Math.max(1, Math.min(4, tema.palavrasChave.length));
  if (chavesEncontradas.length === 0) {
    return vazia("Fuga total ao tema: o texto não aborda o tema proposto. No ENEM, isso zera a redação.");
  }

  // ---------- Competência 1: norma-padrão ----------
  const desvios: CorrecaoRedacao["desvios"] = [];
  let totalDesvios = 0;
  for (const d of DESVIOS) {
    const encontrados = limpo.match(d.regex);
    if (encontrados) {
      totalDesvios += encontrados.length;
      for (const trecho of encontrados.slice(0, 2)) {
        desvios.push({ trecho: trecho.trim(), correcao: d.correcao, explicacao: d.explicacao });
      }
    }
  }
  const frases = limpo.split(/[.!?]+/).map((f) => f.trim()).filter(Boolean);
  const frasesLongas = frases.filter((f) => f.split(/\s+/).length > 55).length;
  if (frasesLongas > 0) {
    desvios.push({
      trecho: `${frasesLongas} período(s) com mais de 55 palavras`,
      correcao: "Divida em períodos menores",
      explicacao: "Períodos muito longos costumam gerar problemas de pontuação e de estrutura sintática.",
    });
  }
  const c1Bruta = 200 - totalDesvios * 20 - frasesLongas * 20;
  const c1: CompetenciaCorrigida = {
    numero: 1,
    nota: arredondar(Math.max(40, c1Bruta)),
    comentario:
      totalDesvios === 0
        ? "Não foram identificados desvios comuns da norma-padrão pela verificação automática."
        : `Foram identificados ${totalDesvios} desvio(s) comum(ns) da norma-padrão.`,
    pontosFortes: totalDesvios <= 1 ? ["Boa adequação à modalidade escrita formal."] : [],
    pontosAMelhorar: desvios.slice(0, 5).map((d) => `"${d.trecho}" → ${d.correcao}`),
    comoMelhorar:
      "Revise o texto procurando marcas de oralidade, concordância e pontuação. Leia cada frase em voz alta: se faltar fôlego, ela provavelmente está longa demais e precisa de ponto ou vírgula.",
  };

  const repertorios = contar(REPERTORIO, limpo);
  const primeiraPessoa = /\beu (acho|penso|acredito)\b/i.test(limpo);
  let c2Bruta = 80;
  if (paragrafos.length >= 4) c2Bruta += 40;
  if (proporcaoTema >= 0.75) c2Bruta += 40;
  if (repertorios >= 3) c2Bruta += 40;
  else if (repertorios >= 1) c2Bruta += 20;
  if (primeiraPessoa) c2Bruta -= 20;
  if (proporcaoTema < 0.5) c2Bruta = Math.min(c2Bruta, 80);
  const c2: CompetenciaCorrigida = {
    numero: 2,
    nota: arredondar(Math.min(200, c2Bruta)),
    comentario: `O texto aborda o tema (palavras-chave encontradas: ${chavesEncontradas.join(", ")}) e tem ${paragrafos.length} parágrafo(s).`,
    pontosFortes: [
      ...(paragrafos.length >= 4 ? ["Estrutura de texto dissertativo-argumentativo (introdução, desenvolvimento e conclusão)."] : []),
      ...(repertorios >= 2 ? ["Uso de repertório sociocultural (leis, dados, autores, fatos históricos)."] : []),
    ],
    pontosAMelhorar: [
      ...(paragrafos.length < 4 ? ["Organize o texto em 4 parágrafos: introdução, dois de desenvolvimento e conclusão."] : []),
      ...(repertorios < 2 ? ["Faltou repertório sociocultural legitimado e pertinente ao tema."] : []),
      ...(proporcaoTema < 0.75 ? ["Retome as palavras-chave do tema ao longo do texto, não só na introdução, para mostrar que você não tangenciou."] : []),
      ...(primeiraPessoa ? ["Evite 'eu acho': use construções impessoais ('é possível afirmar que...')."] : []),
    ],
    comoMelhorar:
      "Use pelo menos um repertório produtivo (lei, dado, filósofo, obra, fato histórico) e conecte-o ao seu argumento — não basta citar, é preciso explicar por que ele comprova sua ideia.",
  };

  // ---------- Competência 3: argumentação ----------
  const desenvolvimento = paragrafos.slice(1, -1);
  const causais = (baseNorm.match(/\b(porque|pois|visto que|uma vez que|ja que|devido|em virtude|consequencia|consequentemente|por isso|causa|resulta)\b/g) || []).length;
  const exemplos = /por exemplo|como ocorre|exemplo disso|a exemplo de|prova disso/i.test(limpo);
  let c3Bruta = 80;
  if (desenvolvimento.length >= 2) c3Bruta += 40;
  if (desenvolvimento.every((p) => p.split(/\s+/).length >= 60)) c3Bruta += 40;
  if (causais >= 3) c3Bruta += 20;
  if (exemplos) c3Bruta += 20;
  const c3: CompetenciaCorrigida = {
    numero: 3,
    nota: arredondar(Math.min(200, c3Bruta)),
    comentario: `Foram encontrados ${desenvolvimento.length} parágrafo(s) de desenvolvimento e ${causais} marca(s) de relação de causa e consequência.`,
    pontosFortes: [
      ...(desenvolvimento.length >= 2 ? ["Há mais de um argumento desenvolvido em parágrafos próprios."] : []),
      ...(exemplos ? ["Uso de exemplos para sustentar os argumentos."] : []),
    ],
    pontosAMelhorar: [
      ...(desenvolvimento.length < 2 ? ["Desenvolva dois argumentos, cada um em seu próprio parágrafo."] : []),
      ...(!desenvolvimento.every((p) => p.split(/\s+/).length >= 60) ? ["Algum parágrafo de desenvolvimento está curto: aprofunde a explicação."] : []),
      ...(causais < 3 ? ["Explique melhor as causas e as consequências do problema."] : []),
    ],
    comoMelhorar:
      "Em cada parágrafo de desenvolvimento siga: tópico frasal (a ideia) → fundamentação (repertório/dado) → explicação (por que isso acontece) → fechamento ligando ao tema.",
  };

  // ---------- Competência 4: coesão ----------
  const conectivosUsados = CONECTIVOS.filter((c) => baseNorm.includes(normalizar(c)));
  const inicioParagrafos = paragrafos.slice(1).filter((p) =>
    CONECTIVOS.some((c) => normalizar(p).startsWith(normalizar(c))),
  ).length;
  const freq = new Map<string, number>();
  for (const p of palavras.map((w) => normalizar(w).replace(/[^a-z]/g, "")).filter((w) => w.length > 5)) {
    freq.set(p, (freq.get(p) || 0) + 1);
  }
  const repetidas = [...freq.entries()].filter(([, n]) => n >= 5).map(([w]) => w);
  let c4Bruta = 40 + Math.min(120, conectivosUsados.length * 15) + (inicioParagrafos >= 2 ? 40 : 0) - repetidas.length * 20;
  c4Bruta = Math.max(40, c4Bruta);
  const c4: CompetenciaCorrigida = {
    numero: 4,
    nota: arredondar(Math.min(200, c4Bruta)),
    comentario: `Conectivos diferentes encontrados: ${conectivosUsados.length}${conectivosUsados.length ? ` (${conectivosUsados.slice(0, 8).join(", ")})` : ""}.`,
    pontosFortes: [
      ...(conectivosUsados.length >= 6 ? ["Boa variedade de conectivos."] : []),
      ...(inicioParagrafos >= 2 ? ["Parágrafos bem articulados entre si por conectivos."] : []),
    ],
    pontosAMelhorar: [
      ...(conectivosUsados.length < 6 ? ["Use mais conectivos e varie-os (ex.: 'além disso', 'nesse sentido', 'por conseguinte')."] : []),
      ...(inicioParagrafos < 2 ? ["Inicie os parágrafos de desenvolvimento e a conclusão com conectivos que mostrem a progressão."] : []),
      ...(repetidas.length ? [`Palavras muito repetidas: ${repetidas.slice(0, 5).join(", ")}. Use sinônimos ou pronomes.`] : []),
    ],
    comoMelhorar:
      "Use conectivos entre parágrafos ('Em primeiro lugar', 'Além disso', 'Portanto') e dentro dos parágrafos ('visto que', 'dessa forma'). Evite repetir palavras: troque por sinônimos, pronomes ou expressões equivalentes.",
  };

  // ---------- Competência 5: proposta de intervenção ----------
  const conclusao = paragrafos[paragrafos.length - 1] ?? "";
  const conclNorm = normalizar(conclusao);
  const elementos = {
    agente: AGENTES.some((a) => conclNorm.includes(normalizar(a))),
    acao: contar(ACAO, conclusao) > 0,
    meio: contar(MEIO, conclusao) > 0,
    finalidade: contar(FINALIDADE, conclusao) > 0,
    detalhamento: contar(DETALHAMENTO, conclusao) > 0,
  };
  const nomes: Record<keyof typeof elementos, string> = {
    agente: "Agente (quem vai executar)",
    acao: "Ação (o que deve ser feito)",
    meio: "Meio/modo (como será feito)",
    finalidade: "Finalidade (para quê)",
    detalhamento: "Detalhamento (explicação de algum elemento)",
  };
  const presentes = (Object.keys(elementos) as (keyof typeof elementos)[]).filter((k) => elementos[k]);
  const ausentes = (Object.keys(elementos) as (keyof typeof elementos)[]).filter((k) => !elementos[k]);
  const c5: CompetenciaCorrigida = {
    numero: 5,
    nota: presentes.length * 40,
    comentario: `Elementos da proposta de intervenção identificados no último parágrafo: ${presentes.length} de 5.`,
    pontosFortes: presentes.map((k) => `${nomes[k]} presente.`),
    pontosAMelhorar: ausentes.map((k) => `${nomes[k]} não identificado.`),
    comoMelhorar:
      "Monte a proposta com os 5 elementos. Modelo: 'Portanto, cabe ao Ministério da Educação [agente], órgão responsável pelas políticas de ensino [detalhamento], criar programas de educação midiática nas escolas [ação], por meio de oficinas com especialistas [meio], a fim de formar leitores capazes de identificar notícias falsas [finalidade].'",
  };

  const competencias = [c1, c2, c3, c4, c5];
  const notaTotal = competencias.reduce((s, c) => s + c.nota, 0);
  const pior = [...competencias].sort((a, b) => a.nota - b.nota)[0];
  const aviso = linhasEstimadas > 32 ? " Atenção: o texto parece ultrapassar 30 linhas, o limite da folha do ENEM." : "";

  return {
    metodo: "automatica",
    notaTotal,
    resumo: `Nota estimada de ${notaTotal}. O ponto que mais precisa de atenção é a Competência ${pior.numero}.${aviso} Esta é uma correção automática por critérios objetivos — para uma análise mais completa, use a correção por IA quando estiver disponível.`,
    competencias,
    desvios: desvios.slice(0, 12),
  };
}

export const NOMES_COMPETENCIAS: Record<number, { titulo: string; descricao: string }> = {
  1: { titulo: "Norma-padrão", descricao: "Demonstrar domínio da modalidade escrita formal da língua portuguesa." },
  2: { titulo: "Tema e tipo textual", descricao: "Compreender a proposta e aplicar conceitos de várias áreas para desenvolver o tema, dentro do texto dissertativo-argumentativo." },
  3: { titulo: "Argumentação", descricao: "Selecionar, relacionar, organizar e interpretar informações, fatos e opiniões em defesa de um ponto de vista." },
  4: { titulo: "Coesão", descricao: "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação." },
  5: { titulo: "Proposta de intervenção", descricao: "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos." },
};
