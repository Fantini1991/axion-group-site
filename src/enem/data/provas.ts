/**
 * As 3 provas oficiais do simulado. Todos os alunos fazem as MESMAS questões, na mesma ordem,
 * para que o ranking seja justo. Cada prova tem 20 questões (5 por área) e um tema de redação próprio.
 */
export interface ProvaOficial {
  id: "P1" | "P2" | "P3";
  nome: string;
  eixo: string;
  descricao: string;
  temaRedacaoId: string;
  questoes: string[];
}

export const PROVAS: ProvaOficial[] = [
  {
    id: "P1",
    nome: "Prova 1",
    eixo: "Tecnologia e sociedade",
    descricao: "Inteligência artificial, deepfakes, trabalho por aplicativo e o mundo digital.",
    temaRedacaoId: "R1",
    questoes: [
      "L03", "L04", "L08", "L13", "L15",
      "H01", "H05", "H06", "H12", "H14",
      "N02", "N04", "N10", "N11", "N14",
      "M01", "M03", "M10", "M11", "M14",
    ],
  },
  {
    id: "P2",
    nome: "Prova 2",
    eixo: "Meio ambiente e clima",
    descricao: "COP30, eventos extremos, energia, efeito estufa e cidades sustentáveis.",
    temaRedacaoId: "R2",
    questoes: [
      "L02", "L05", "L07", "L09", "L11",
      "H07", "H08", "H09", "H13", "H15",
      "N01", "N06", "N08", "N12", "N15",
      "M02", "M04", "M06", "M07", "M15",
    ],
  },
  {
    id: "P3",
    nome: "Prova 3",
    eixo: "Cidadania, saúde e economia",
    descricao: "Apostas online, vacinas, direitos, educação financeira e história do Brasil.",
    temaRedacaoId: "R3",
    questoes: [
      "L01", "L06", "L10", "L12", "L14",
      "H02", "H03", "H04", "H10", "H11",
      "N03", "N05", "N07", "N09", "N13",
      "M05", "M08", "M09", "M12", "M13",
    ],
  },
];

export const buscarProva = (id: string | undefined) => PROVAS.find((p) => p.id === id);
