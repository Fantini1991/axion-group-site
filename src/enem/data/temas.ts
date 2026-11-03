import type { TemaRedacao } from "../types";

/**
 * Temas inéditos, no estilo do ENEM, construídos a partir dos eixos que mais se repetiram
 * entre 2016 e 2025: cidadania e direitos, inclusão, tecnologia, saúde e cultura.
 */
export const temasPropostos: TemaRedacao[] = [
  {
    id: "P01",
    titulo: "Desafios para combater a desinformação nas redes sociais no Brasil",
    palavrasChave: ["desinformação", "fake news", "notícias falsas", "redes sociais", "informação", "checagem", "internet", "algoritmo"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "A desinformação não é uma novidade, mas as redes sociais mudaram sua escala: uma mensagem falsa pode alcançar milhões de pessoas em poucas horas, muitas vezes mais rápido do que a correção.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Agências de checagem de fatos verificam boatos que circulam na internet e classificam as informações como verdadeiras, falsas ou enganosas. Ainda assim, muitas pessoas compartilham conteúdos sem ler além do título.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "A educação midiática — ensinar a verificar a fonte, a data e a intenção de um conteúdo — tem sido apontada por especialistas como uma das principais estratégias para formar leitores críticos.",
      },
    ],
  },
  {
    id: "P02",
    titulo: "Os impactos do uso excessivo de telas na infância e na adolescência no Brasil",
    palavrasChave: ["tela", "telas", "celular", "criança", "adolescente", "infância", "adolescência", "digital", "redes sociais", "saúde mental"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Sociedades médicas recomendam limitar o tempo de tela de crianças e adolescentes e evitar o uso de aparelhos antes de dormir, pois o excesso está associado a prejuízos no sono, na atenção e na atividade física.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Aplicativos e redes sociais são projetados para prender a atenção: notificações, rolagem infinita e recompensas constantes estimulam o usuário a permanecer conectado.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "O Estatuto da Criança e do Adolescente (Lei nº 8.069/1990) estabelece que é dever da família, da comunidade, da sociedade e do poder público assegurar, com absoluta prioridade, os direitos de crianças e adolescentes, incluindo a saúde e o lazer.",
      },
      {
        titulo: "Texto IV",
        conteudo:
          "Em 2025, entrou em vigor a Lei nº 15.100, que restringe o uso de celulares e outros aparelhos eletrônicos portáteis pelos estudantes nas escolas públicas e privadas de educação básica, inclusive no recreio, salvo para fins pedagógicos ou de acessibilidade.",
      },
    ],
  },
  {
    id: "P03",
    titulo: "Caminhos para enfrentar a insegurança alimentar no Brasil",
    palavrasChave: ["fome", "insegurança alimentar", "alimentação", "alimento", "comida", "desperdício", "nutrição", "renda"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "A alimentação é um direito social previsto no artigo 6º da Constituição Federal de 1988, incluído pela Emenda Constitucional nº 64, de 2010.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "O Brasil é um dos maiores produtores de alimentos do mundo. Mesmo assim, milhões de famílias convivem com a incerteza de ter o que comer, enquanto toneladas de alimentos são desperdiçadas entre a colheita e o consumo.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "Programas como a alimentação escolar garantem refeições a milhões de estudantes da rede pública e, para muitos deles, representam a principal refeição do dia.",
      },
    ],
  },
  {
    id: "P04",
    titulo: "Desafios para o uso ético da inteligência artificial na educação brasileira",
    palavrasChave: ["inteligência artificial", "ia", "tecnologia", "educação", "escola", "aluno", "professor", "ética", "aprendizagem"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Ferramentas de inteligência artificial conseguem redigir textos, resolver exercícios e explicar conteúdos em segundos. Para alguns educadores, elas podem personalizar o ensino; para outros, ameaçam o desenvolvimento do pensamento autônomo.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Nem todas as escolas brasileiras têm acesso estável à internet e a equipamentos adequados, o que pode ampliar a distância entre estudantes de diferentes realidades sociais.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) estabelece regras para o tratamento de dados pessoais, com cuidados especiais quando se trata de dados de crianças e adolescentes.",
      },
    ],
  },
  {
    id: "P05",
    titulo: "Caminhos para combater a evasão escolar no ensino médio brasileiro",
    palavrasChave: ["evasão", "abandono", "escola", "ensino médio", "educação", "jovem", "jovens", "estudante", "trabalho"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Segundo o artigo 205 da Constituição Federal, a educação é direito de todos e dever do Estado e da família, e deve visar ao pleno desenvolvimento da pessoa, ao preparo para a cidadania e à qualificação para o trabalho.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Entre os motivos mais citados por jovens que deixam a escola estão a necessidade de trabalhar, a falta de interesse pelos conteúdos e, entre as meninas, a gravidez e os cuidados com a família.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "Programas de incentivo financeiro condicionados à frequência escolar e escolas em tempo integral com projetos de vida têm sido adotados como estratégias para manter os jovens estudando.",
      },
    ],
  },
  {
    id: "P06",
    titulo: "Desafios para a preservação dos recursos hídricos no Brasil",
    palavrasChave: ["água", "hídricos", "rio", "rios", "seca", "saneamento", "esgoto", "desmatamento", "recursos"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "O Brasil concentra uma das maiores reservas de água doce do planeta, mas ela é distribuída de forma desigual: a maior parte está na Região Norte, enquanto as regiões mais populosas enfrentam crises de abastecimento.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "O lançamento de esgoto sem tratamento em rios e o desmatamento de nascentes e matas ciliares comprometem a qualidade e a quantidade de água disponível.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "A Política Nacional de Recursos Hídricos (Lei nº 9.433/1997) define a água como um bem de domínio público, limitado e dotado de valor econômico.",
      },
    ],
  },
  {
    id: "P07",
    titulo: "Caminhos para promover a mobilidade urbana sustentável nas cidades brasileiras",
    palavrasChave: ["mobilidade", "transporte", "trânsito", "ônibus", "bicicleta", "cidade", "cidades", "urbana", "carro"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Em muitas metrópoles brasileiras, trabalhadores passam mais de duas horas por dia em deslocamentos, o que reduz o tempo de descanso, de estudo e de convivência familiar.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "A Política Nacional de Mobilidade Urbana (Lei nº 12.587/2012) estabelece a prioridade dos modos de transporte não motorizados e do transporte público coletivo sobre o transporte individual motorizado.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "Ciclovias conectadas, corredores exclusivos de ônibus e calçadas acessíveis são exemplos de medidas que tornam as cidades mais democráticas e menos poluídas.",
      },
    ],
  },
];

/** Temas das 3 provas oficiais do simulado — atuais (2024–2026), um eixo diferente em cada prova. */
export const temasDasProvas: TemaRedacao[] = [
  {
    id: "R1",
    titulo: "Desafios para o uso ético da inteligência artificial na sociedade brasileira",
    palavrasChave: ["inteligência artificial", "ia", "tecnologia", "ética", "algoritmo", "dados", "deepfake", "regulação"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Ferramentas de inteligência artificial generativa produzem textos, imagens, vozes e vídeos em segundos. Elas já são usadas para estudar, trabalhar e criar — mas também para fabricar conteúdos falsos, como os deepfakes, proibidos pelo Tribunal Superior Eleitoral na propaganda eleitoral desde 2024.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Sistemas de IA aprendem a partir de grandes volumes de dados. Quando esses dados refletem desigualdades da sociedade, os sistemas podem reproduzir preconceitos — por exemplo, em processos de seleção de emprego ou de reconhecimento facial.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante aos cidadãos direitos sobre suas informações pessoais. Tramita no Congresso Nacional o Projeto de Lei nº 2.338/2023, que propõe regras específicas para o desenvolvimento e o uso da inteligência artificial no país.",
      },
    ],
  },
  {
    id: "R2",
    titulo: "Caminhos para enfrentar os impactos dos eventos climáticos extremos no Brasil",
    palavrasChave: ["clima", "climático", "climáticos", "enchente", "enchentes", "seca", "chuva", "aquecimento", "desastre", "eventos extremos"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "Em maio de 2024, chuvas intensas causaram enchentes históricas no Rio Grande do Sul, atingindo centenas de municípios e deixando milhares de pessoas desalojadas. No mesmo ano, rios da Amazônia registraram secas severas, isolando comunidades ribeirinhas.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "Em novembro de 2025, Belém (PA) sediou a COP30, conferência da ONU sobre mudanças climáticas. Cientistas alertam que o aquecimento global torna eventos extremos — ondas de calor, secas e chuvas intensas — mais frequentes e mais fortes.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "A Política Nacional de Proteção e Defesa Civil (Lei nº 12.608/2012) prevê ações de prevenção, mitigação, preparação, resposta e recuperação de desastres, incluindo o mapeamento de áreas de risco.",
      },
    ],
  },
  {
    id: "R3",
    titulo: "Os impactos das apostas online na vida dos jovens brasileiros",
    palavrasChave: ["aposta", "apostas", "bets", "jogo", "jogos", "vício", "endividamento", "jovens", "jovem"],
    textos: [
      {
        titulo: "Texto I",
        conteudo:
          "A Lei nº 14.790/2023 regulamentou as apostas de quota fixa no Brasil, as chamadas 'bets', e proibiu a participação de menores de 18 anos. Mesmo assim, a publicidade dessas plataformas se espalhou por redes sociais, transmissões esportivas e perfis de influenciadores.",
      },
      {
        titulo: "Texto II",
        conteudo:
          "A Organização Mundial da Saúde reconhece o transtorno do jogo como uma doença, caracterizada pela perda de controle sobre o hábito de jogar, mesmo diante de prejuízos financeiros, familiares e emocionais.",
      },
      {
        titulo: "Texto III",
        conteudo:
          "Com o Pix, transferir dinheiro para uma plataforma de apostas leva poucos segundos. Especialistas em educação financeira alertam que a promessa de ganho rápido atrai principalmente jovens e famílias de baixa renda, que acabam se endividando.",
      },
    ],
  },
];

/** Temas oficiais das redações do ENEM (provas regulares) de 2016 a 2025. Textos motivadores elaborados para treino. */
export const temasAnteriores: TemaRedacao[] = [
  {
    id: "E2016",
    ano: 2016,
    titulo: "Caminhos para combater a intolerância religiosa no Brasil",
    palavrasChave: ["intolerância", "religiosa", "religião", "religiões", "crença", "fé", "liberdade", "respeito"],
    textos: [
      { titulo: "Texto I", conteudo: "A Constituição Federal, em seu artigo 5º, inciso VI, declara inviolável a liberdade de consciência e de crença, assegurando o livre exercício dos cultos religiosos." },
      { titulo: "Texto II", conteudo: "Ataques a templos, ofensas verbais e discriminação contra praticantes de religiões de matriz africana estão entre os casos mais denunciados de intolerância religiosa no país." },
    ],
  },
  {
    id: "E2017",
    ano: 2017,
    titulo: "Desafios para a formação educacional de surdos no Brasil",
    palavrasChave: ["surdo", "surdos", "libras", "deficiência auditiva", "inclusão", "educação", "escola", "intérprete"],
    textos: [
      { titulo: "Texto I", conteudo: "A Lei nº 10.436/2002 reconhece a Língua Brasileira de Sinais (Libras) como meio legal de comunicação e expressão." },
      { titulo: "Texto II", conteudo: "A falta de professores bilíngues e de intérpretes nas escolas ainda é um obstáculo para que estudantes surdos tenham acesso pleno ao conhecimento." },
    ],
  },
  {
    id: "E2018",
    ano: 2018,
    titulo: "Manipulação do comportamento do usuário pelo controle de dados na internet",
    palavrasChave: ["dados", "internet", "algoritmo", "usuário", "manipulação", "privacidade", "redes sociais", "comportamento"],
    textos: [
      { titulo: "Texto I", conteudo: "Plataformas digitais registram cliques, buscas e tempo de visualização para oferecer conteúdos e anúncios personalizados." },
      { titulo: "Texto II", conteudo: "As chamadas 'bolhas' de informação fazem com que o usuário veja, principalmente, conteúdos que confirmam aquilo em que já acredita." },
    ],
  },
  {
    id: "E2019",
    ano: 2019,
    titulo: "Democratização do acesso ao cinema no Brasil",
    palavrasChave: ["cinema", "filme", "filmes", "cultura", "acesso", "democratização", "salas", "audiovisual"],
    textos: [
      { titulo: "Texto I", conteudo: "As salas de cinema estão concentradas em grandes cidades e shoppings, e muitos municípios brasileiros não têm nenhuma." },
      { titulo: "Texto II", conteudo: "O preço dos ingressos e a distância das salas afastam parte da população, sobretudo nas periferias e no interior." },
    ],
  },
  {
    id: "E2020",
    ano: 2020,
    titulo: "O estigma associado às doenças mentais na sociedade brasileira",
    palavrasChave: ["doença mental", "doenças mentais", "saúde mental", "estigma", "preconceito", "depressão", "ansiedade", "psicológico"],
    textos: [
      { titulo: "Texto I", conteudo: "O artigo 196 da Constituição estabelece que a saúde é direito de todos e dever do Estado." },
      { titulo: "Texto II", conteudo: "Muitas pessoas com transtornos mentais evitam procurar ajuda por medo de serem rotuladas como 'fracas' ou 'loucas'." },
    ],
  },
  {
    id: "E2021",
    ano: 2021,
    titulo: "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil",
    palavrasChave: ["registro", "certidão", "cidadania", "invisibilidade", "documento", "nascimento", "civil", "direitos"],
    textos: [
      { titulo: "Texto I", conteudo: "A Lei nº 9.534/1997 garante a gratuidade do registro civil de nascimento e da primeira certidão." },
      { titulo: "Texto II", conteudo: "Sem certidão de nascimento, uma pessoa tem dificuldade para se matricular na escola, acessar serviços de saúde e programas sociais." },
    ],
  },
  {
    id: "E2022",
    ano: 2022,
    titulo: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    palavrasChave: ["povos tradicionais", "comunidades tradicionais", "indígenas", "quilombolas", "ribeirinhos", "território", "cultura", "valorização"],
    textos: [
      { titulo: "Texto I", conteudo: "Indígenas, quilombolas, ribeirinhos, quebradeiras de coco babaçu e caiçaras são exemplos de povos e comunidades tradicionais que mantêm formas próprias de organização social." },
      { titulo: "Texto II", conteudo: "Conflitos por território e a pressão de atividades econômicas ameaçam os modos de vida dessas comunidades." },
    ],
  },
  {
    id: "E2023",
    ano: 2023,
    titulo: "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
    palavrasChave: ["mulher", "mulheres", "cuidado", "trabalho doméstico", "invisibilidade", "gênero", "família", "desigualdade"],
    textos: [
      { titulo: "Texto I", conteudo: "Cuidar da casa, dos filhos e de familiares idosos ou doentes é um trabalho essencial, mas geralmente não remunerado e pouco reconhecido." },
      { titulo: "Texto II", conteudo: "Pesquisas sobre uso do tempo mostram que as mulheres dedicam, em média, muito mais horas semanais a afazeres domésticos e cuidados do que os homens." },
    ],
  },
  {
    id: "E2024",
    ano: 2024,
    titulo: "Desafios para a valorização da herança africana no Brasil",
    palavrasChave: ["africana", "africano", "afro-brasileira", "herança", "racismo", "cultura", "negro", "negros"],
    textos: [
      { titulo: "Texto I", conteudo: "A Lei nº 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas de ensino fundamental e médio." },
      { titulo: "Texto II", conteudo: "A culinária, a música, a religiosidade e a língua portuguesa falada no Brasil carregam marcas profundas das culturas africanas." },
    ],
  },
  {
    id: "E2025",
    ano: 2025,
    titulo: "Perspectivas acerca do envelhecimento na sociedade brasileira",
    palavrasChave: ["envelhecimento", "idoso", "idosos", "velhice", "pessoa idosa", "etarismo", "longevidade", "aposentadoria"],
    textos: [
      { titulo: "Texto I", conteudo: "O Estatuto da Pessoa Idosa (Lei nº 10.741/2003) assegura às pessoas com 60 anos ou mais direitos como saúde, transporte, lazer e proteção contra a violência." },
      { titulo: "Texto II", conteudo: "Com o aumento da expectativa de vida e a queda da natalidade, a população brasileira está envelhecendo, o que exige mudanças na saúde, na previdência e nas cidades." },
    ],
  },
];

export const todosOsTemas: TemaRedacao[] = [...temasDasProvas, ...temasPropostos, ...temasAnteriores];

export function buscarTema(id: string): TemaRedacao | undefined {
  return todosOsTemas.find((t) => t.id === id);
}
