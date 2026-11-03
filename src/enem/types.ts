export type Area = "linguagens" | "humanas" | "natureza" | "matematica";

export const AREAS: { id: Area; nome: string; curto: string; cor: string }[] = [
  { id: "linguagens", nome: "Linguagens, Códigos e suas Tecnologias", curto: "Linguagens", cor: "#f97316" },
  { id: "humanas", nome: "Ciências Humanas e suas Tecnologias", curto: "Humanas", cor: "#eab308" },
  { id: "natureza", nome: "Ciências da Natureza e suas Tecnologias", curto: "Natureza", cor: "#22c55e" },
  { id: "matematica", nome: "Matemática e suas Tecnologias", curto: "Matemática", cor: "#3b82f6" },
];

export interface Questao {
  id: string;
  area: Area;
  disciplina: string;
  assunto: string;
  /** 1 = fácil, 2 = média, 3 = difícil */
  dificuldade: 1 | 2 | 3;
  /** Por que esse conteúdo cai: padrão observado nas provas de 2016 a 2025. */
  recorrencia: string;
  texto?: string;
  fonte?: string;
  enunciado: string;
  alternativas: [string, string, string, string, string];
  correta: 0 | 1 | 2 | 3 | 4;
  /** Passo a passo de como resolver. */
  resolucao: string;
  /** Um comentário por alternativa: por que está certa ou qual erro leva a ela. */
  comentarios: [string, string, string, string, string];
}

export interface TemaRedacao {
  id: string;
  titulo: string;
  /** Ano em que caiu no ENEM, quando for um tema oficial de edição anterior. */
  ano?: number;
  textos: { titulo: string; conteudo: string }[];
  /** Palavras que indicam que o texto está no tema (usado pela correção automática). */
  palavrasChave: string[];
}

export interface RespostaProva {
  questaoId: string;
  resposta: number | null;
}

export interface ResultadoProva {
  id: string;
  data: string;
  modo: "oficial" | "rapido" | "completo";
  /** Preenchido quando é uma das 3 provas oficiais (P1, P2, P3). */
  provaId?: string;
  respostas: RespostaProva[];
  notas: Record<Area, number>;
  acertos: Record<Area, { acertos: number; total: number }>;
  media: number;
  duracaoSeg: number;
}

export interface CompetenciaCorrigida {
  numero: 1 | 2 | 3 | 4 | 5;
  nota: number;
  comentario: string;
  pontosFortes: string[];
  pontosAMelhorar: string[];
  comoMelhorar: string;
}

export interface CorrecaoRedacao {
  metodo: "ia" | "automatica";
  notaTotal: number;
  resumo: string;
  competencias: CompetenciaCorrigida[];
  desvios: { trecho: string; correcao: string; explicacao: string }[];
  sugestaoReescrita?: string;
  anulada?: string;
}

export interface ResultadoRedacao {
  id: string;
  data: string;
  temaId: string;
  temaTitulo: string;
  /** Preenchido quando a redação faz parte de uma prova oficial. */
  provaId?: string;
  texto: string;
  correcao: CorrecaoRedacao;
}

export interface Usuario {
  username: string;
  nome: string;
}

export interface LinhaRanking {
  username: string;
  nome: string;
  simulados: number;
  redacoes: number;
  melhorMedia: number;
  melhorRedacao: number;
  melhoresAreas: Record<Area, number>;
  /** Nota em cada prova oficial (1ª tentativa): (objetiva × 4 + redação) ÷ 5. */
  porProva: Record<string, { objetiva: number | null; redacao: number | null; nota: number }>;
  /** Média das 3 provas oficiais (prova não feita conta como zero). */
  notaGeral: number;
}
