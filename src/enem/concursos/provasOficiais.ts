/**
 * Provas oficiais anteriores (PF — Cebraspe 2021 e 2025; Receita — FGV 2023).
 * Os cadernos e gabaritos ficam nos sites oficiais das bancas (links abaixo); aqui guardamos só o gabarito
 * definitivo (extraído dos PDFs oficiais) e as faixas de itens de cada matéria, para corrigir o cartão-resposta.
 * Gabarito: C/E (Cebraspe) ou A–E (FGV); X ou * = item/questão anulado.
 * Gerado por script a partir dos PDFs oficiais — não editar à mão.
 */
import type { Trilha } from "./dados";

export interface ProvaOficial {
  id: string;
  trilha: Trilha;
  ano: number;
  banca: "Cebraspe" | "FGV";
  cargo: string;
  formato: "CE" | "ME";
  cadernos: { nome: string; url: string }[];
  gabaritos: { nome: string; url: string }[];
  materias: { nome: string; de: number; ate: number }[];
  gabarito: string;
}

export const PROVAS_OFICIAIS: ProvaOficial[] = [
  {
    id: "PF25_AG",
    trilha: "PF",
    ano: 2025,
    banca: "Cebraspe",
    cargo: "Agente de Polícia Federal",
    formato: "CE",
    cadernos: [{ nome: "Bloco I — Conhecimentos básicos", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_CB2_01.pdf" }, { nome: "Bloco II — Informática", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_CG1_01.pdf" }, { nome: "Bloco III — Específicos (Agente)", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_016_01.pdf" }],
    gabaritos: [{ nome: "Gabarito Bloco I", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/D0F881898A969B6733B878291FC1201E6CFE079281391E04B7EE322628BC888C.pdf" }, { nome: "Gabarito Bloco II", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/A78F5BA07173AF0B8A5E611A1D7AAB166B7BD473E5D7AC2220F0F1B7DDB641E9.pdf" }, { nome: "Gabarito Bloco III", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/CDC24D454696C9FE260E6C50FE758707F322649AEE24B6FB664FDDA10E307BCF.pdf" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 8 }, { nome: "Redação Oficial", de: 9, ate: 10 }, { nome: "Direito Administrativo", de: 11, ate: 16 }, { nome: "Direito Constitucional", de: 17, ate: 22 }, { nome: "Direito Penal", de: 23, ate: 25 }, { nome: "Direito Processual Penal", de: 26, ate: 28 }, { nome: "Direitos Humanos", de: 29, ate: 34 }, { nome: "Legislação Especial", de: 35, ate: 44 }, { nome: "Estatística", de: 45, ate: 52 }, { nome: "Raciocínio Lógico", de: 53, ate: 60 }, { nome: "Informática", de: 61, ate: 96 }, { nome: "Contabilidade", de: 97, ate: 120 }],
    gabarito: "EECEECECCCEECEECEEECCECCECEECEECCECEXCECECCCEECCEECXEECCECCECXECECEEXEECECCEEEECCCECXCECECXECXEEEEEECECCECECCCXXCCEEXECE",
  },
  {
    id: "PF25_ES",
    trilha: "PF",
    ano: 2025,
    banca: "Cebraspe",
    cargo: "Escrivão de Polícia Federal",
    formato: "CE",
    cadernos: [{ nome: "Bloco I — Conhecimentos básicos", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_CB2_01.pdf" }, { nome: "Bloco II — Informática", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_CG1_01.pdf" }, { nome: "Bloco III — Específicos (Escrivão)", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/106_PF_015_01.pdf" }],
    gabaritos: [{ nome: "Gabarito Bloco I", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/D0F881898A969B6733B878291FC1201E6CFE079281391E04B7EE322628BC888C.pdf" }, { nome: "Gabarito Bloco II", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/A78F5BA07173AF0B8A5E611A1D7AAB166B7BD473E5D7AC2220F0F1B7DDB641E9.pdf" }, { nome: "Gabarito Bloco III", url: "https://cdn.cebraspe.org.br/concursos/pf_25/arquivos/570C8865F7DDA1651ED10E330A6297A95466A2393EEEC633290FE754912D6143.pdf" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 8 }, { nome: "Redação Oficial", de: 9, ate: 10 }, { nome: "Direito Administrativo", de: 11, ate: 16 }, { nome: "Direito Constitucional", de: 17, ate: 22 }, { nome: "Direito Penal", de: 23, ate: 25 }, { nome: "Direito Processual Penal", de: 26, ate: 28 }, { nome: "Direitos Humanos", de: 29, ate: 34 }, { nome: "Legislação Especial", de: 35, ate: 44 }, { nome: "Estatística", de: 45, ate: 52 }, { nome: "Raciocínio Lógico", de: 53, ate: 60 }, { nome: "Informática", de: 61, ate: 96 }, { nome: "Contabilidade", de: 97, ate: 120 }],
    gabarito: "EECEECECCCEECEECEEECCECCECEECEECCECEXCECECCCEECCEECXEECCECCECXECECEEXEECECCEEEECCCECXCECECXECXEEECECCEECCCEEECECECCEEEXC",
  },
  {
    id: "PF21_AG",
    trilha: "PF",
    ano: 2021,
    banca: "Cebraspe",
    cargo: "Agente de Polícia Federal",
    formato: "CE",
    cadernos: [{ nome: "Prova objetiva", url: "https://cdn.cebraspe.org.br/concursos/pf_21/arquivos/CARGO_2_AGENTE_DE_POLCIA_FEDERAL.PDF" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://cdn.cebraspe.org.br/concursos/pf_21/arquivos/GAB_DEFINITIVO_MATRIZ_577_PF_002_00.PDF" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 18 }, { nome: "Redação Oficial", de: 19, ate: 24 }, { nome: "Direito Administrativo", de: 25, ate: 27 }, { nome: "Direito Constitucional", de: 28, ate: 30 }, { nome: "Direito Penal e Processual Penal", de: 31, ate: 36 }, { nome: "Estatística", de: 37, ate: 48 }, { nome: "Raciocínio Lógico", de: 49, ate: 60 }, { nome: "Informática", de: 61, ate: 96 }, { nome: "Contabilidade", de: 97, ate: 120 }],
    gabarito: "ECEEECECCEEEECCCEECCEECECEEXCEECCEECCCEEEEECEECCCCEEECCECCEEECEECCCEEEEECCECEECCEEEEECEEECCXECCECCEEECCECXEXECECCEEECCXC",
  },
  {
    id: "PF21_ES",
    trilha: "PF",
    ano: 2021,
    banca: "Cebraspe",
    cargo: "Escrivão de Polícia Federal",
    formato: "CE",
    cadernos: [{ nome: "Prova objetiva", url: "https://cdn.cebraspe.org.br/concursos/pf_21/arquivos/CARGO_3_ESCRIVO_DE_POLCIA_FEDERAL.PDF" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://cdn.cebraspe.org.br/concursos/pf_21/arquivos/GAB_DEFINITIVO_MATRIZ_577_PF_003_00.PDF" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 18 }, { nome: "Redação Oficial", de: 19, ate: 24 }, { nome: "Direito Administrativo", de: 25, ate: 27 }, { nome: "Direito Constitucional", de: 28, ate: 30 }, { nome: "Direito Penal e Processual Penal", de: 31, ate: 36 }, { nome: "Estatística", de: 37, ate: 48 }, { nome: "Raciocínio Lógico", de: 49, ate: 60 }, { nome: "Informática", de: 61, ate: 96 }, { nome: "Contabilidade", de: 97, ate: 114 }, { nome: "Arquivologia", de: 115, ate: 120 }],
    gabarito: "ECEEECECCEEEECCCEECCEECECEEXCEECCEECCCEEEEECEECCCCEEECCECCEEECEECCCEEEEECCECEECCEEEEECEEECCXECCECCECXEXECECCEEECXCCECECE",
  },
  {
    id: "RFB23_AF_P1",
    trilha: "RFB",
    ano: 2023,
    banca: "FGV",
    cargo: "Auditor-Fiscal — Prova 1 (manhã)",
    formato: "ME",
    cadernos: [{ nome: "Caderno Tipo 1", url: "https://conhecimento.fgv.br/sites/default/files/concursos/cns101-auditor-fiscal-da-receita-federal-do-brasil-afrfbcns101-tipo-1.pdf" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://conhecimento.fgv.br/sites/default/files/concursos/serfb-gabarito-defintivo-auditor-_0.pdf" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 13 }, { nome: "Língua Inglesa", de: 14, ate: 18 }, { nome: "Raciocínio Lógico e Estatística", de: 19, ate: 32 }, { nome: "Economia e Finanças Públicas", de: 33, ate: 38 }, { nome: "Administração Geral", de: 39, ate: 44 }, { nome: "Administração Pública", de: 45, ate: 54 }, { nome: "Auditoria", de: 55, ate: 62 }, { nome: "Contabilidade Geral e Pública", de: 63, ate: 70 }, { nome: "Fluência de Dados", de: 71, ate: 80 }],
    gabarito: "CBBDADCAEECAEBADCDDA**CAECCBDCEDBCAECDCAEDEBABBCCAECDABBECDAECDAAEBCCBBACEADECCD",
  },
  {
    id: "RFB23_AF_P2",
    trilha: "RFB",
    ano: 2023,
    banca: "FGV",
    cargo: "Auditor-Fiscal — Prova 2 (tarde)",
    formato: "ME",
    cadernos: [{ nome: "Caderno Tipo 1", url: "https://conhecimento.fgv.br/sites/default/files/concursos/cns201-auditor-fiscal-da-receita-federal-do-brasil-afrfbcns201-tipo-1.pdf" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://conhecimento.fgv.br/sites/default/files/concursos/serfb-gabarito-defintivo-auditor-_0.pdf" }],
    materias: [{ nome: "Direito Administrativo", de: 1, ate: 8 }, { nome: "Direito Constitucional", de: 9, ate: 16 }, { nome: "Direito Previdenciário", de: 17, ate: 24 }, { nome: "Direito Tributário", de: 25, ate: 34 }, { nome: "Legislação Tributária", de: 35, ate: 42 }, { nome: "Comércio Internacional", de: 43, ate: 50 }, { nome: "Legislação Aduaneira", de: 51, ate: 60 }],
    gabarito: "CBCCAEDDBBECAEAADCBABBEAEABDAECDCBADBBACDDBCEDBA*AEABBC*DDEB",
  },
  {
    id: "RFB23_AT_P1",
    trilha: "RFB",
    ano: 2023,
    banca: "FGV",
    cargo: "Analista-Tributário — Prova 1 (manhã)",
    formato: "ME",
    cadernos: [{ nome: "Caderno Tipo 1", url: "https://conhecimento.fgv.br/sites/default/files/concursos/cns102-analista-tributario-da-receita-federal-do-brasil-atrfbcns102-tipo-1.pdf" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://conhecimento.fgv.br/sites/default/files/concursos/gabarito-definitivo-rfb_analista-_0.pdf" }],
    materias: [{ nome: "Língua Portuguesa", de: 1, ate: 15 }, { nome: "Língua Inglesa", de: 16, ate: 25 }, { nome: "Raciocínio Lógico e Estatística", de: 26, ate: 35 }, { nome: "Contabilidade Geral", de: 36, ate: 45 }, { nome: "Administração Geral e Pública", de: 46, ate: 55 }, { nome: "Fluência de Dados", de: 56, ate: 70 }],
    gabarito: "CEBDDDDACACBAAEADBECECADBCDABCBCBABAACABBEEDEDCAEBACBEEBEBBC*DADCDCBAD",
  },
  {
    id: "RFB23_AT_P2",
    trilha: "RFB",
    ano: 2023,
    banca: "FGV",
    cargo: "Analista-Tributário — Prova 2 (tarde)",
    formato: "ME",
    cadernos: [{ nome: "Caderno Tipo 1", url: "https://conhecimento.fgv.br/sites/default/files/concursos/cns202-analista-tributario-da-receita-federal-do-brasil-atrfbcns202-tipo-1.pdf" }],
    gabaritos: [{ nome: "Gabarito definitivo", url: "https://conhecimento.fgv.br/sites/default/files/concursos/gabarito-definitivo-rfb_analista-_0.pdf" }],
    materias: [{ nome: "Direito Constitucional", de: 1, ate: 14 }, { nome: "Direito Administrativo", de: 15, ate: 26 }, { nome: "Direito Tributário e Previdenciário", de: 27, ate: 42 }, { nome: "Legislação Tributária", de: 43, ate: 56 }, { nome: "Legislação Aduaneira", de: 57, ate: 70 }],
    gabarito: "DACEEDBBAAEEDDDCABBECACDDEBAEDCBCDEAEBAECBEDAECBEBDBCDAABDACC*EDBACE*A",
  },
];

export const buscarProvaOficial = (id: string | undefined) => PROVAS_OFICIAIS.find((p) => p.id === id);

