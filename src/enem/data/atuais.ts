import type { Questao } from "../types";

/** Questões com contextos atuais (2024–2026), no formato das habilidades mais cobradas pelo ENEM. */
export const atuais: Questao[] = [
  // ---------------- Linguagens ----------------
  {
    id: "L13",
    area: "linguagens",
    disciplina: "Língua Portuguesa",
    assunto: "Leitura crítica — deepfakes e inteligência artificial",
    dificuldade: 1,
    recorrencia: "Tecnologias da informação e leitura crítica de conteúdos digitais estão entre os temas mais frequentes de Linguagens.",
    texto:
      "Com ferramentas de inteligência artificial, já é possível criar vídeos e áudios em que pessoas reais aparecem dizendo frases que nunca disseram — os chamados deepfakes. Em 2024, o Tribunal Superior Eleitoral proibiu o uso desse tipo de conteúdo na propaganda eleitoral.",
    enunciado: "Diante do fenômeno descrito, a atitude de leitura mais adequada ao receber um vídeo polêmico de uma figura pública é",
    alternativas: [
      "acreditar no conteúdo, já que vídeos são provas mais confiáveis que textos.",
      "compartilhar o vídeo imediatamente para alertar outras pessoas.",
      "verificar a origem do conteúdo em veículos confiáveis e agências de checagem antes de compartilhá-lo.",
      "considerar o vídeo verdadeiro se ele tiver muitas visualizações e curtidas.",
      "deixar de assistir a qualquer vídeo sobre política nas redes sociais.",
    ],
    correta: 2,
    resolucao:
      "O texto mostra que a IA consegue imitar rosto e voz de forma realista. Portanto, ver não é mais garantia de verdade. A postura do leitor crítico é checar a fonte: quem publicou, se veículos sérios noticiaram e o que dizem as agências de checagem.",
    comentarios: [
      "Errada: o texto mostra justamente que vídeos podem ser fabricados por IA.",
      "Errada: compartilhar sem verificar é o que faz a desinformação se espalhar.",
      "Correta: verificar a origem e consultar fontes confiáveis é a atitude de um leitor crítico.",
      "Errada: popularidade não comprova veracidade; conteúdos falsos costumam viralizar.",
      "Errada: a solução não é evitar informação, mas aprender a avaliá-la.",
    ],
  },
  {
    id: "L14",
    area: "linguagens",
    disciplina: "Língua Portuguesa",
    assunto: "Variação linguística — linguagem da internet",
    dificuldade: 1,
    recorrencia: "Variação linguística e adequação ao contexto de uso caem praticamente todos os anos.",
    texto: "kkkkk mano, n acredito q a prova foi adiada 😂 bora estudar msm assim, amanhã tô aí\n\n(Mensagem enviada em um grupo de amigos)",
    enunciado: "Sobre a linguagem usada na mensagem, é correto afirmar que ela",
    alternativas: [
      "comprova que os jovens não sabem mais escrever em língua portuguesa.",
      "é adequada à situação informal entre amigos, mas não seria adequada em um texto formal, como a redação do ENEM.",
      "segue a norma-padrão, pois foi compreendida por todos do grupo.",
      "deveria ser proibida, porque empobrece a língua portuguesa.",
      "vai substituir a escrita formal nos próximos anos.",
    ],
    correta: 1,
    resolucao:
      "O ENEM cobra o conceito de adequação: não existe 'certo' ou 'errado' absoluto, e sim linguagem adequada ou inadequada à situação. Abreviações, risos e emojis funcionam bem numa conversa rápida entre amigos, mas seriam inadequados num texto formal.",
    comentarios: [
      "Errada: usar linguagem informal num grupo de amigos não significa não saber escrever formalmente.",
      "Correta: a linguagem está adequada ao contexto informal, mas não serviria para situações formais.",
      "Errada: ser compreendida não torna a mensagem norma-padrão; abreviações como 'q' e 'msm' são informais.",
      "Errada: o ENEM rejeita o preconceito linguístico; variedades informais são legítimas em seus contextos.",
      "Errada: as variedades convivem; uma não substitui a outra.",
    ],
  },
  {
    id: "L15",
    area: "linguagens",
    disciplina: "Inglês",
    assunto: "Interpretação de texto em língua inglesa",
    dificuldade: 2,
    recorrencia: "As questões de língua estrangeira cobram compreensão global e de informações específicas do texto.",
    texto:
      "Many students now use AI chatbots to help with their homework. Teachers say the tools can explain difficult topics in a simple way, but they worry that some students copy the answers without learning anything. As a result, some schools now ask students to show, step by step, how they reached their answers.",
    enunciado: "Segundo o texto, algumas escolas passaram a pedir que os alunos",
    alternativas: [
      "parem de usar a internet para fazer as tarefas.",
      "mostrem o passo a passo de como chegaram às respostas.",
      "usem os chatbots apenas para traduzir textos.",
      "façam as tarefas exclusivamente em grupo.",
      "entreguem as tarefas escritas à mão.",
    ],
    correta: 1,
    resolucao:
      "Localize a expressão 'As a result' (como resultado): ela introduz a medida adotada pelas escolas — 'ask students to show, step by step, how they reached their answers', ou seja, pedir que os alunos mostrem o passo a passo do raciocínio.",
    comentarios: [
      "Errada: o texto não fala em proibir a internet.",
      "Correta: 'show, step by step, how they reached their answers'.",
      "Errada: tradução não é mencionada; os chatbots explicam conteúdos.",
      "Errada: trabalho em grupo não aparece no texto.",
      "Errada: o texto não fala em escrever à mão.",
    ],
  },

  // ---------------- Humanas ----------------
  {
    id: "H13",
    area: "humanas",
    disciplina: "Geografia",
    assunto: "Mudanças climáticas — emissões brasileiras",
    dificuldade: 2,
    recorrencia: "Questões ambientais, acordos climáticos e o papel do Brasil são cobrados com frequência.",
    texto:
      "Em novembro de 2025, Belém (PA) sediou a COP30, a conferência da ONU sobre mudanças climáticas. Diferentemente da maioria dos países industrializados, onde a queima de combustíveis fósseis para gerar energia é a principal fonte de gases de efeito estufa, o Brasil tem um perfil de emissões distinto.",
    enunciado: "No Brasil, a maior parte das emissões de gases de efeito estufa está associada",
    alternativas: [
      "às usinas nucleares de Angra dos Reis.",
      "à mudança do uso da terra, sobretudo o desmatamento, e à agropecuária.",
      "às termelétricas a carvão, principal fonte da matriz elétrica nacional.",
      "ao transporte aéreo internacional.",
      "à produção de energia solar e eólica.",
    ],
    correta: 1,
    resolucao:
      "Como a eletricidade brasileira vem principalmente de fontes renováveis (hidrelétricas, eólica, solar), o setor de energia pesa menos que em outros países. As maiores emissões vêm do desmatamento (que libera o carbono das florestas) e da agropecuária (como o metano do rebanho bovino). Por isso a COP30 na Amazônia teve tanto simbolismo.",
    comentarios: [
      "Errada: usinas nucleares praticamente não emitem gases de efeito estufa na operação.",
      "Correta: desmatamento e agropecuária respondem pela maior parte das emissões brasileiras.",
      "Errada: o carvão tem participação pequena na matriz elétrica do Brasil.",
      "Errada: o transporte aéreo tem participação pequena no total.",
      "Errada: energia solar e eólica são fontes de baixa emissão.",
    ],
  },
  {
    id: "H14",
    area: "humanas",
    disciplina: "Sociologia",
    assunto: "Trabalho por aplicativo",
    dificuldade: 2,
    recorrencia: "Transformações do mundo do trabalho e direitos trabalhistas são temas recorrentes de Sociologia e História.",
    texto:
      "Motoristas e entregadores de aplicativo, em geral, não têm jornada fixa, são pagos por corrida ou entrega, arcam com os custos do veículo, do combustível e do celular e, na maioria dos casos, não têm direito a férias remuneradas nem a 13º salário.",
    enunciado: "A situação descrita é um exemplo de",
    alternativas: [
      "fordismo, com trabalho em linha de montagem e jornada rígida.",
      "precarização do trabalho, com transferência de custos e riscos para o trabalhador.",
      "ampliação dos direitos garantidos pela CLT.",
      "estatização dos serviços de transporte urbano.",
      "fim da informalidade no mercado de trabalho brasileiro.",
    ],
    correta: 1,
    resolucao:
      "O texto mostra flexibilidade (sem jornada fixa), mas também ausência de direitos e custos pagos pelo próprio trabalhador. Esse processo — muitas vezes chamado de 'uberização' — é uma forma de precarização: o risco do negócio sai da empresa e vai para quem trabalha.",
    comentarios: [
      "Errada: o fordismo tem jornada rígida em fábricas, o oposto do trabalho por aplicativo.",
      "Correta: sem direitos e com custos assumidos pelo trabalhador = precarização.",
      "Errada: o texto descreve justamente a falta de direitos da CLT.",
      "Errada: os aplicativos são empresas privadas.",
      "Errada: trabalhadores sem vínculo formal reforçam a informalidade.",
    ],
  },
  {
    id: "H15",
    area: "humanas",
    disciplina: "Geografia",
    assunto: "Eventos climáticos extremos e espaço urbano",
    dificuldade: 2,
    recorrencia: "Enchentes, deslizamentos e a relação entre urbanização e meio ambiente aparecem em várias edições.",
    texto:
      "Em maio de 2024, chuvas intensas provocaram enchentes históricas no Rio Grande do Sul, atingindo centenas de municípios. Em Porto Alegre, bairros inteiros ficaram alagados após a cheia do Guaíba.",
    enunciado: "Um fator que agrava os impactos de eventos como esse nas cidades é",
    alternativas: [
      "o excesso de áreas verdes, que retêm a água da chuva.",
      "a impermeabilização do solo e a ocupação de áreas de várzea e margens de rios.",
      "a baixa densidade populacional das capitais brasileiras.",
      "o relevo montanhoso, que impede o acúmulo de água em áreas baixas.",
      "o aquecimento global, que reduz o volume de chuvas em todo o país.",
    ],
    correta: 1,
    resolucao:
      "Asfalto e concreto impedem a infiltração da água, que escorre rapidamente para rios e canais. Quando as cidades ocupam várzeas (áreas que o rio naturalmente inunda nas cheias), mais pessoas ficam expostas. Somam-se a isso eventos extremos mais frequentes e falhas em sistemas de proteção.",
    comentarios: [
      "Errada: áreas verdes ajudam a água a infiltrar no solo, reduzindo enchentes.",
      "Correta: solo impermeável + ocupação de áreas de risco ampliam os danos.",
      "Errada: as capitais têm alta densidade, o que aumenta o número de afetados.",
      "Errada: água se acumula justamente nas áreas baixas; o relevo não impede isso.",
      "Errada: o aquecimento global tende a tornar as chuvas extremas mais intensas e frequentes, não menores.",
    ],
  },

  // ---------------- Natureza ----------------
  {
    id: "N13",
    area: "natureza",
    disciplina: "Biologia",
    assunto: "Vacinas de RNA mensageiro",
    dificuldade: 2,
    recorrencia: "Imunização, biotecnologia e combate à desinformação em saúde são temas frequentes.",
    texto:
      "As vacinas de RNA mensageiro (mRNA), usadas em larga escala contra a covid-19, levam às células uma 'receita' para produzir temporariamente uma proteína do vírus. Depois de lida, essa molécula é degradada pelo organismo.",
    enunciado: "Essas vacinas protegem o organismo porque",
    alternativas: [
      "alteram o DNA das células, tornando-as resistentes ao vírus.",
      "contêm o vírus vivo, que provoca uma forma leve da doença.",
      "a proteína produzida estimula o sistema imune a criar anticorpos e células de memória.",
      "contêm anticorpos prontos, como um soro.",
      "funcionam como antibióticos, destruindo o vírus diretamente.",
    ],
    correta: 2,
    resolucao:
      "O mRNA é lido pelos ribossomos, que produzem a proteína do vírus. O sistema imune reconhece essa proteína como estranha e produz anticorpos e células de memória (imunização ativa). O mRNA não entra no núcleo nem altera o DNA, e é degradado depois de usado.",
    comentarios: [
      "Errada: o mRNA não altera o DNA; ele age no citoplasma e é degradado.",
      "Errada: as vacinas de mRNA não contêm vírus.",
      "Correta: a proteína produzida funciona como antígeno e gera resposta imune com memória.",
      "Errada: soro é que tem anticorpos prontos; a vacina faz o corpo produzi-los.",
      "Errada: antibióticos agem contra bactérias, não contra vírus.",
    ],
  },
  {
    id: "N14",
    area: "natureza",
    disciplina: "Física",
    assunto: "Carros elétricos — frenagem regenerativa",
    dificuldade: 2,
    recorrencia: "Transformações de energia em tecnologias do cotidiano são uma das habilidades de Física mais cobradas.",
    texto:
      "Carros elétricos e híbridos usam a frenagem regenerativa: ao frear, o motor elétrico passa a funcionar como gerador, desacelerando o carro e recarregando parte da bateria.",
    enunciado: "Na frenagem regenerativa, a principal transformação de energia é de",
    alternativas: [
      "energia química em energia térmica.",
      "energia cinética em energia elétrica.",
      "energia elétrica em energia luminosa.",
      "energia potencial elástica em energia sonora.",
      "energia térmica em energia química.",
    ],
    correta: 1,
    resolucao:
      "O carro em movimento tem energia cinética. Ao frear, essa energia, que nos freios comuns seria perdida como calor, gira o gerador e vira energia elétrica, armazenada na bateria (como energia química).",
    comentarios: [
      "Errada: isso acontece na queima de combustível, não na frenagem regenerativa.",
      "Correta: o movimento (cinética) é convertido em eletricidade pelo gerador.",
      "Errada: luz não é o objetivo do processo.",
      "Errada: não há molas envolvidas no processo descrito.",
      "Errada: a energia térmica é justamente a 'perda' que o sistema tenta evitar.",
    ],
  },
  {
    id: "N15",
    area: "natureza",
    disciplina: "Química",
    assunto: "Efeito estufa e aquecimento global",
    dificuldade: 2,
    recorrencia: "Efeito estufa, camada de ozônio e ciclo do carbono são cobrados com frequência — e costumam ser confundidos.",
    enunciado:
      "O efeito estufa é um fenômeno natural, essencial para manter a Terra aquecida. O problema atual é sua intensificação pela atividade humana. Esse fenômeno ocorre porque gases como o CO₂ e o metano",
    alternativas: [
      "destroem a camada de ozônio, deixando entrar mais calor.",
      "absorvem parte da radiação infravermelha (calor) emitida pela superfície terrestre.",
      "bloqueiam a luz do Sol, resfriando o planeta.",
      "reagem com o oxigênio, produzindo calor na atmosfera.",
      "aumentam a quantidade de oxigênio, o principal gás estufa.",
    ],
    correta: 1,
    resolucao:
      "A superfície aquecida pelo Sol emite radiação infravermelha. Gases como CO₂, CH₄ e vapor d'água absorvem e reemitem parte desse calor, mantendo a atmosfera aquecida. Mais gases estufa = mais calor retido = aquecimento global. Atenção: o 'buraco' na camada de ozônio é outro problema (aumenta a radiação ultravioleta).",
    comentarios: [
      "Errada: essa é a confusão mais comum. O ozônio filtra raios ultravioleta; sua destruição é outro problema ambiental.",
      "Correta: os gases estufa retêm o calor (infravermelho) emitido pela superfície.",
      "Errada: o efeito é de aquecimento, não de resfriamento.",
      "Errada: o efeito estufa não depende de reações químicas com o oxigênio.",
      "Errada: o oxigênio (O₂) não é um gás estufa relevante.",
    ],
  },

  // ---------------- Matemática ----------------
  {
    id: "M13",
    area: "matematica",
    disciplina: "Matemática",
    assunto: "Probabilidade e valor esperado — apostas online",
    dificuldade: 3,
    recorrencia: "Probabilidade aplicada a situações reais é cobrada todo ano, em geral entre as questões mais difíceis.",
    texto:
      "Em um jogo de apostas online, cada aposta custa R$ 10,00. Em cada rodada, o jogador tem 20% de chance de ganhar um prêmio de R$ 40,00; caso contrário, perde o valor apostado.",
    enunciado: "Se uma pessoa fizer 50 apostas, o resultado financeiro esperado será",
    alternativas: [
      "lucro de R$ 300,00.",
      "lucro de R$ 100,00.",
      "nem lucro nem prejuízo.",
      "prejuízo de R$ 100,00.",
      "prejuízo de R$ 400,00.",
    ],
    correta: 3,
    resolucao:
      "Calcule o valor esperado de uma aposta: ganho médio − custo.\nGanho médio = 0,20 × R$ 40 = R$ 8,00. Custo = R$ 10,00.\nResultado esperado por aposta = 8 − 10 = −R$ 2,00.\nEm 50 apostas: 50 × (−2) = prejuízo de R$ 100,00.\nPor isso, em jogos assim, quem aposta muitas vezes tende a perder dinheiro — o lucro fica com a empresa.",
    comentarios: [
      "Errada: R$ 300 considera só as vitórias (50 × 0,2 × R$ 30) e ignora as perdas.",
      "Errada: o sinal está trocado — o valor esperado é negativo.",
      "Errada: o jogo só seria 'justo' se o prêmio médio (R$ 8) fosse igual ao custo (R$ 10).",
      "Correta: −R$ 2 por aposta × 50 = prejuízo de R$ 100.",
      "Errada: R$ 400 considera só as derrotas (50 × 0,8 × R$ 10) e ignora os prêmios.",
    ],
  },
  {
    id: "M14",
    area: "matematica",
    disciplina: "Matemática",
    assunto: "Porcentagem — tarifa dinâmica",
    dificuldade: 2,
    recorrencia: "Porcentagens sucessivas em situações de consumo são a habilidade de Matemática mais cobrada.",
    texto:
      "Uma corrida por aplicativo custa normalmente R$ 24,00. Em horário de pico, o aplicativo aplica uma tarifa dinâmica de 1,5 vez o valor normal. Um passageiro tem um cupom de 20% de desconto, aplicado sobre o valor final da corrida.",
    enunciado: "Com o cupom, quanto o passageiro pagará por essa corrida no horário de pico?",
    alternativas: ["R$ 19,20.", "R$ 28,80.", "R$ 31,20.", "R$ 36,00.", "R$ 43,20."],
    correta: 1,
    resolucao:
      "1) Tarifa dinâmica: 24 × 1,5 = R$ 36,00.\n2) Desconto de 20% sobre o valor final: 36 × 0,80 = R$ 28,80.\nAtalho: 24 × 1,5 × 0,8 = 24 × 1,2 = R$ 28,80.",
    comentarios: [
      "Errada: R$ 19,20 aplica o desconto sobre o preço normal, esquecendo a tarifa dinâmica.",
      "Correta: 24 × 1,5 × 0,8 = R$ 28,80.",
      "Errada: R$ 31,20 soma as porcentagens (+50% − 20% = +30%). Porcentagens sucessivas se multiplicam.",
      "Errada: R$ 36,00 é o valor com tarifa dinâmica, antes do cupom.",
      "Errada: R$ 43,20 aplica os 20% como aumento, não como desconto.",
    ],
  },
  {
    id: "M15",
    area: "matematica",
    disciplina: "Matemática",
    assunto: "Razão e tempo de retorno — energia solar",
    dificuldade: 1,
    recorrencia: "Problemas de economia doméstica e tempo de retorno de investimento aparecem com frequência.",
    texto:
      "Uma família instalou painéis de energia solar por R$ 18 000,00. Com isso, a conta de luz caiu de R$ 400,00 para R$ 100,00 por mês.",
    enunciado: "Considerando que a economia mensal se mantenha, o investimento será recuperado em",
    alternativas: ["3 anos e 9 meses.", "5 anos.", "15 anos.", "18 meses.", "60 anos."],
    correta: 1,
    resolucao:
      "1) Economia mensal: 400 − 100 = R$ 300,00.\n2) Tempo de retorno: 18 000 ÷ 300 = 60 meses.\n3) 60 meses ÷ 12 = 5 anos.",
    comentarios: [
      "Errada: 3 anos e 9 meses (45 meses) divide pelo valor da conta antiga (R$ 400), e não pela economia.",
      "Correta: 18 000 ÷ 300 = 60 meses = 5 anos.",
      "Errada: 15 anos (180 meses) divide pelo valor da conta nova (R$ 100).",
      "Errada: 18 meses não corresponde a nenhuma divisão correta dos dados.",
      "Errada: 60 é o número de meses, não de anos. Faltou converter.",
    ],
  },
];
