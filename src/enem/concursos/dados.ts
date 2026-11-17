/**
 * Banco de questões dos concursos (questões inéditas, no estilo das bancas).
 * PF: itens de certo/errado (estilo Cebraspe). Receita: múltipla escolha A–E.
 * Cada item traz a explicação e o fundamento (artigo de lei, súmula ou conceito).
 */

export type Trilha = "PF" | "RFB";

export interface ItemCE {
  id: string;
  materia: string;
  afirmacao: string;
  gabarito: "C" | "E";
  explicacao: string;
  fundamento: string;
}

export interface QuestaoME {
  id: string;
  materia: string;
  enunciado: string;
  alternativas: [string, string, string, string, string];
  correta: 0 | 1 | 2 | 3 | 4;
  explicacao: string;
  fundamento: string;
}

export interface TopicoDiscursiva {
  titulo: string;
  /** O que a banca espera encontrar (mostrado na correção como padrão de resposta). */
  esperado: string;
  palavrasChave: string[];
}

export interface Discursiva {
  trilha: Trilha;
  tema: string;
  comando: string;
  linhasMax: number;
  topicos: TopicoDiscursiva[];
}

export const TRILHAS: Record<Trilha, { nome: string; cargo: string; formato: string; cor: string }> = {
  PF: {
    nome: "Polícia Federal",
    cargo: "Agente e Escrivão",
    formato: "Itens de certo/errado (estilo Cebraspe): cada erro anula um acerto; deixar em branco não desconta.",
    cor: "#1d4ed8",
  },
  RFB: {
    nome: "Receita Federal",
    cargo: "Auditor-Fiscal e Analista-Tributário",
    formato: "Questões de múltipla escolha (A a E), uma única correta.",
    cor: "#047857",
  },
};

// ======================= POLÍCIA FEDERAL (certo/errado) =======================

export const ITENS_PF: ItemCE[] = [
  // Língua Portuguesa
  { id: "PF01", materia: "Língua Portuguesa", afirmacao: "Na frase “Fazem dois anos que o inquérito foi instaurado”, a concordância verbal está de acordo com a norma-padrão.", gabarito: "E", explicacao: "O verbo fazer, indicando tempo decorrido, é impessoal e fica no singular: “Faz dois anos que...”.", fundamento: "Concordância verbal — verbos impessoais." },
  { id: "PF02", materia: "Língua Portuguesa", afirmacao: "Em “Houveram muitas apreensões na fronteira”, o verbo haver está corretamente flexionado no plural.", gabarito: "E", explicacao: "Haver no sentido de existir é impessoal: “Houve muitas apreensões”.", fundamento: "Concordância verbal — verbo haver impessoal." },
  { id: "PF03", materia: "Língua Portuguesa", afirmacao: "Em “Os agentes chegaram à delegacia às 8h”, o emprego do acento indicativo de crase é obrigatório nas duas ocorrências.", gabarito: "C", explicacao: "“Chegar a” + “a delegacia” = à; e há crase na indicação de hora determinada (às 8h).", fundamento: "Crase — regência + artigo; locução de hora." },
  { id: "PF04", materia: "Língua Portuguesa", afirmacao: "No período “Embora houvesse provas, o juiz absolveu o réu”, a oração iniciada por “Embora” expressa concessão e poderia ser substituída por “Apesar de haver provas” sem prejuízo do sentido.", gabarito: "C", explicacao: "“Embora” e “apesar de” introduzem ideia concessiva: um fato contrário que não impede o principal.", fundamento: "Orações subordinadas adverbiais concessivas." },
  { id: "PF05", materia: "Língua Portuguesa", afirmacao: "Em “Prefiro investigar do que esperar”, a regência do verbo preferir está de acordo com a norma-padrão.", gabarito: "E", explicacao: "Preferir rege “algo a algo”: “Prefiro investigar a esperar”. “Do que” e “mais” são inadequados.", fundamento: "Regência verbal do verbo preferir." },
  // Direito Constitucional
  { id: "PF06", materia: "Direito Constitucional", afirmacao: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.", gabarito: "C", explicacao: "É a reprodução do texto constitucional sobre a inviolabilidade do domicílio.", fundamento: "CF/88, art. 5º, XI." },
  { id: "PF07", materia: "Direito Constitucional", afirmacao: "O mandado judicial de busca e apreensão domiciliar pode ser cumprido durante a noite, desde que haja urgência devidamente justificada.", gabarito: "E", explicacao: "Por determinação judicial, a entrada só pode ocorrer durante o dia. À noite, só com consentimento, em flagrante, desastre ou para prestar socorro.", fundamento: "CF/88, art. 5º, XI." },
  { id: "PF08", materia: "Direito Constitucional", afirmacao: "A Polícia Federal destina-se, entre outras funções, a exercer, com exclusividade, as funções de polícia judiciária da União.", gabarito: "C", explicacao: "A exclusividade da polícia judiciária da União é atribuição expressa da PF.", fundamento: "CF/88, art. 144, §1º, IV." },
  { id: "PF09", materia: "Direito Constitucional", afirmacao: "Compete à Polícia Federal prevenir e reprimir o tráfico ilícito de entorpecentes e drogas afins, o contrabando e o descaminho, sem prejuízo da ação fazendária e de outros órgãos públicos nas respectivas áreas de competência.", gabarito: "C", explicacao: "Texto literal da Constituição sobre as atribuições da PF.", fundamento: "CF/88, art. 144, §1º, II." },
  { id: "PF10", materia: "Direito Constitucional", afirmacao: "O habeas data é o remédio constitucional adequado para proteger o direito de locomoção.", gabarito: "E", explicacao: "A liberdade de locomoção é protegida pelo habeas corpus. O habeas data assegura o conhecimento e a retificação de informações pessoais em registros públicos.", fundamento: "CF/88, art. 5º, LXVIII e LXXII." },
  { id: "PF11", materia: "Direito Constitucional", afirmacao: "São inadmissíveis, no processo, as provas obtidas por meios ilícitos.", gabarito: "C", explicacao: "Garantia fundamental expressa na Constituição.", fundamento: "CF/88, art. 5º, LVI." },
  // Direito Administrativo
  { id: "PF12", materia: "Direito Administrativo", afirmacao: "Os princípios expressos no caput do art. 37 da Constituição são legalidade, impessoalidade, moralidade, publicidade e eficiência.", gabarito: "C", explicacao: "São os cinco princípios expressos (LIMPE).", fundamento: "CF/88, art. 37, caput." },
  { id: "PF13", materia: "Direito Administrativo", afirmacao: "A presunção de legitimidade dos atos administrativos é absoluta e não admite prova em contrário.", gabarito: "E", explicacao: "A presunção é relativa (juris tantum): admite prova em contrário, cabendo o ônus a quem alega a ilegalidade.", fundamento: "Atributos do ato administrativo." },
  { id: "PF14", materia: "Direito Administrativo", afirmacao: "A administração pode anular seus próprios atos quando eivados de vícios que os tornem ilegais e revogá-los por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos.", gabarito: "C", explicacao: "É o princípio da autotutela: anulação por ilegalidade e revogação por mérito.", fundamento: "Súmula 473 do STF; Lei nº 9.784/1999, art. 53." },
  { id: "PF15", materia: "Direito Administrativo", afirmacao: "Conforme a Lei nº 8.112/1990, a posse ocorrerá no prazo de trinta dias contados da publicação do ato de provimento.", gabarito: "C", explicacao: "O prazo de posse é de 30 dias da publicação do ato de provimento.", fundamento: "Lei nº 8.112/1990, art. 13, §1º." },
  { id: "PF16", materia: "Direito Administrativo", afirmacao: "A demissão está entre as penalidades disciplinares previstas na Lei nº 8.112/1990.", gabarito: "C", explicacao: "São penalidades: advertência, suspensão, demissão, cassação de aposentadoria ou disponibilidade, destituição de cargo em comissão e de função comissionada.", fundamento: "Lei nº 8.112/1990, art. 127." },
  { id: "PF17", materia: "Direito Administrativo", afirmacao: "A responsabilidade civil do Estado por danos que seus agentes causarem a terceiros é, em regra, subjetiva, exigindo da vítima a comprovação de dolo ou culpa do agente.", gabarito: "E", explicacao: "A regra é a responsabilidade objetiva (teoria do risco administrativo): basta provar conduta, dano e nexo. Dolo ou culpa só importam na ação de regresso contra o agente.", fundamento: "CF/88, art. 37, §6º." },
  // Direito Penal
  { id: "PF18", materia: "Direito Penal", afirmacao: "Considera-se praticado o crime no momento da ação ou omissão, ainda que outro seja o momento do resultado.", gabarito: "C", explicacao: "O Código Penal adota a teoria da atividade para o tempo do crime.", fundamento: "Código Penal, art. 4º." },
  { id: "PF19", materia: "Direito Penal", afirmacao: "Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.", gabarito: "C", explicacao: "Princípio da legalidade (reserva legal e anterioridade).", fundamento: "Código Penal, art. 1º; CF/88, art. 5º, XXXIX." },
  { id: "PF20", materia: "Direito Penal", afirmacao: "A legítima defesa é causa de exclusão da culpabilidade.", gabarito: "E", explicacao: "Legítima defesa, estado de necessidade, estrito cumprimento do dever legal e exercício regular de direito excluem a ilicitude (antijuridicidade), não a culpabilidade.", fundamento: "Código Penal, art. 23." },
  { id: "PF21", materia: "Direito Penal", afirmacao: "O peculato está entre os crimes praticados por funcionário público contra a administração em geral.", gabarito: "C", explicacao: "O peculato está no capítulo dos crimes praticados por funcionário público contra a administração em geral.", fundamento: "Código Penal, art. 312." },
  { id: "PF22", materia: "Direito Penal", afirmacao: "A embriaguez voluntária pelo álcool exclui a imputabilidade penal.", gabarito: "E", explicacao: "A embriaguez voluntária ou culposa não exclui a imputabilidade. Só a embriaguez completa por caso fortuito ou força maior pode isentar de pena.", fundamento: "Código Penal, art. 28, II e §1º." },
  // Processo Penal
  { id: "PF23", materia: "Direito Processual Penal", afirmacao: "O inquérito policial é procedimento de natureza administrativa e caráter inquisitivo.", gabarito: "C", explicacao: "O inquérito é administrativo, inquisitivo, escrito, sigiloso e dispensável para a ação penal.", fundamento: "CPP, arts. 4º a 23 (características do inquérito)." },
  { id: "PF24", materia: "Direito Processual Penal", afirmacao: "A autoridade policial poderá mandar arquivar autos de inquérito.", gabarito: "E", explicacao: "A autoridade policial não pode arquivar o inquérito.", fundamento: "CPP, art. 17." },
  { id: "PF25", materia: "Direito Processual Penal", afirmacao: "Qualquer do povo poderá e as autoridades policiais e seus agentes deverão prender quem quer que seja encontrado em flagrante delito.", gabarito: "C", explicacao: "Flagrante facultativo (qualquer do povo) e obrigatório (autoridades policiais e seus agentes).", fundamento: "CPP, art. 301." },
  { id: "PF26", materia: "Direito Processual Penal", afirmacao: "Pela regra geral do Código de Processo Penal, estando o indiciado preso, o inquérito deve terminar em 10 dias.", gabarito: "C", explicacao: "Regra geral do CPP: 10 dias preso e 30 dias solto. Atenção: nos inquéritos da Justiça Federal, a lei específica prevê 15 dias, prorrogáveis por mais 15, para o indiciado preso.", fundamento: "CPP, art. 10; Lei nº 5.010/1966, art. 66." },
  { id: "PF27", materia: "Direito Processual Penal", afirmacao: "A prisão temporária pode ser decretada de ofício pelo juiz.", gabarito: "E", explicacao: "A prisão temporária depende de representação da autoridade policial ou de requerimento do Ministério Público.", fundamento: "Lei nº 7.960/1989, art. 2º." },
  // Legislação Especial
  { id: "PF28", materia: "Legislação Especial", afirmacao: "Segundo a Lei nº 11.343/2006, quem adquire ou guarda droga para consumo pessoal está sujeito à pena de prisão.", gabarito: "E", explicacao: "As penas para porte para consumo pessoal são advertência, prestação de serviços à comunidade e medida educativa. Não há pena privativa de liberdade.", fundamento: "Lei nº 11.343/2006, art. 28." },
  { id: "PF29", materia: "Legislação Especial", afirmacao: "A Lei nº 13.869/2019 dispõe sobre os crimes de abuso de autoridade.", gabarito: "C", explicacao: "É a Nova Lei de Abuso de Autoridade, que revogou a Lei nº 4.898/1965.", fundamento: "Lei nº 13.869/2019." },
  { id: "PF30", materia: "Legislação Especial", afirmacao: "O porte ilegal de arma de fogo de uso restrito é tipificado como crime no Estatuto do Desarmamento.", gabarito: "C", explicacao: "O Estatuto do Desarmamento tipifica a posse ou o porte ilegal de arma de fogo de uso restrito.", fundamento: "Lei nº 10.826/2003, art. 16." },
  { id: "PF31", materia: "Legislação Especial", afirmacao: "A tortura é crime inafiançável e insuscetível de graça ou anistia.", gabarito: "C", explicacao: "A Constituição e a Lei de Tortura vedam fiança, graça e anistia.", fundamento: "CF/88, art. 5º, XLIII; Lei nº 9.455/1997, art. 1º, §6º." },
  // Informática
  { id: "PF32", materia: "Informática", afirmacao: "Phishing é uma técnica que busca obter dados pessoais e financeiros do usuário por meio de mensagens e páginas falsas que se passam por instituições confiáveis.", gabarito: "C", explicacao: "O phishing usa engenharia social: e-mails, SMS e sites falsos que imitam bancos e órgãos públicos.", fundamento: "Segurança da informação — golpes e engenharia social." },
  { id: "PF33", materia: "Informática", afirmacao: "O protocolo HTTPS utiliza criptografia para proteger os dados transmitidos entre o navegador e o servidor.", gabarito: "C", explicacao: "HTTPS é o HTTP sobre TLS: os dados trafegam cifrados.", fundamento: "Redes — protocolos HTTP/HTTPS e TLS." },
  { id: "PF34", materia: "Informática", afirmacao: "O firewall é um software cuja única função é remover vírus já instalados no computador.", gabarito: "E", explicacao: "O firewall controla o tráfego de rede segundo regras (bloqueia ou permite conexões). Quem remove vírus é o antivírus.", fundamento: "Segurança da informação — firewall x antivírus." },
  { id: "PF35", materia: "Informática", afirmacao: "O backup incremental copia apenas os arquivos criados ou alterados desde o último backup, seja ele completo ou incremental.", gabarito: "C", explicacao: "O incremental copia o que mudou desde o último backup de qualquer tipo. O diferencial copia o que mudou desde o último backup completo.", fundamento: "Tipos de backup: completo, incremental e diferencial." },
  // Raciocínio Lógico e Estatística
  { id: "PF36", materia: "Raciocínio Lógico", afirmacao: "A negação da proposição “Todo agente é concursado” é “Nenhum agente é concursado”.", gabarito: "E", explicacao: "Para negar “todo”, basta um contraexemplo: “Algum agente não é concursado”.", fundamento: "Negação de proposições categóricas." },
  { id: "PF37", materia: "Raciocínio Lógico", afirmacao: "A proposição “Se chove, então a rua fica molhada” é equivalente a “Se a rua não fica molhada, então não chove”.", gabarito: "C", explicacao: "É a contrapositiva: p → q equivale a ~q → ~p.", fundamento: "Equivalências lógicas — contrapositiva." },
  { id: "PF38", materia: "Raciocínio Lógico", afirmacao: "A negação de “João é agente e Maria é escrivã” é “João não é agente ou Maria não é escrivã”.", gabarito: "C", explicacao: "Lei de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q.", fundamento: "Leis de De Morgan." },
  { id: "PF39", materia: "Estatística", afirmacao: "Para o conjunto de dados 2, 4, 4, 6 e 9, a mediana é igual a 5.", gabarito: "E", explicacao: "Com os dados em ordem, o termo central (3º) é 4. Então a mediana é 4; 5 é a média (25 ÷ 5).", fundamento: "Medidas de tendência central." },
  { id: "PF40", materia: "Estatística", afirmacao: "Ao lançar um dado honesto de seis faces, a probabilidade de obter um número par é igual a 1/2.", gabarito: "C", explicacao: "Casos favoráveis: 2, 4 e 6 (3 de 6) = 1/2.", fundamento: "Probabilidade clássica." },
];

// ======================= RECEITA FEDERAL (A–E) =======================

const QUESTOES_RFB_BASE: QuestaoME[] = [
  { id: "RF01", materia: "Direito Tributário", enunciado: "Segundo o conceito de tributo do Código Tributário Nacional, NÃO é característica do tributo:", alternativas: ["ser prestação pecuniária.", "ser compulsório.", "ser instituído em lei.", "constituir sanção de ato ilícito.", "ser cobrado mediante atividade administrativa plenamente vinculada."], correta: 3, explicacao: "Tributo é prestação pecuniária compulsória, instituída em lei, que NÃO constitui sanção de ato ilícito (multa não é tributo), cobrada por atividade plenamente vinculada.", fundamento: "CTN, art. 3º." },
  { id: "RF02", materia: "Direito Tributário", enunciado: "O tributo que tem como fato gerador o exercício regular do poder de polícia ou a utilização de serviço público específico e divisível é:", alternativas: ["o imposto.", "a taxa.", "a contribuição de melhoria.", "o empréstimo compulsório.", "a contribuição social."], correta: 1, explicacao: "Taxa é tributo vinculado a uma atuação estatal: poder de polícia ou serviço público específico e divisível.", fundamento: "CTN, art. 77; CF/88, art. 145, II." },
  { id: "RF03", materia: "Direito Tributário", enunciado: "Imposto é o tributo cuja obrigação tem por fato gerador:", alternativas: ["a valorização imobiliária decorrente de obra pública.", "o exercício do poder de polícia.", "uma situação independente de qualquer atividade estatal específica relativa ao contribuinte.", "a prestação de serviço público divisível.", "uma calamidade pública ou guerra externa."], correta: 2, explicacao: "O imposto é tributo não vinculado: o fato gerador é uma situação do contribuinte (renda, propriedade, consumo), sem contraprestação estatal específica.", fundamento: "CTN, art. 16." },
  { id: "RF04", materia: "Direito Tributário", enunciado: "A modalidade de lançamento em que o sujeito passivo apura e antecipa o pagamento do tributo sem prévio exame da autoridade administrativa, que depois o confirma, é o lançamento:", alternativas: ["de ofício.", "por declaração.", "por homologação.", "por arbitramento.", "direto."], correta: 2, explicacao: "No lançamento por homologação (autolançamento), o contribuinte calcula e paga; a autoridade homologa, expressa ou tacitamente.", fundamento: "CTN, art. 150." },
  { id: "RF05", materia: "Direito Tributário", enunciado: "Segundo o CTN, o direito da Fazenda Pública de constituir o crédito tributário extingue-se, em regra, após:", alternativas: ["2 anos.", "3 anos.", "5 anos.", "10 anos.", "20 anos."], correta: 2, explicacao: "A decadência é de 5 anos, contados, em regra, do primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado.", fundamento: "CTN, art. 173, I." },
  { id: "RF06", materia: "Direito Tributário", enunciado: "É causa de SUSPENSÃO da exigibilidade do crédito tributário:", alternativas: ["o pagamento.", "a remissão.", "o parcelamento.", "a anistia.", "a isenção."], correta: 2, explicacao: "Suspendem a exigibilidade: moratória, depósito integral, reclamações e recursos, liminar em mandado de segurança, liminar ou tutela antecipada em outras ações e parcelamento. Pagamento e remissão extinguem; isenção e anistia excluem.", fundamento: "CTN, art. 151 (suspensão), art. 156 (extinção) e art. 175 (exclusão)." },
  { id: "RF07", materia: "Direito Tributário", enunciado: "São causas de EXCLUSÃO do crédito tributário:", alternativas: ["moratória e parcelamento.", "isenção e anistia.", "pagamento e compensação.", "decadência e prescrição.", "transação e remissão."], correta: 1, explicacao: "O CTN prevê só duas causas de exclusão: isenção (atinge o tributo) e anistia (atinge as penalidades).", fundamento: "CTN, art. 175." },
  { id: "RF08", materia: "Direito Tributário", enunciado: "Entre os impostos abaixo, NÃO se submete ao princípio da anterioridade do exercício financeiro (anterioridade anual):", alternativas: ["o imposto sobre a renda.", "o imposto territorial rural.", "o imposto sobre a propriedade predial e territorial urbana.", "o imposto sobre importação.", "o imposto sobre transmissão causa mortis e doação."], correta: 3, explicacao: "O imposto de importação é exceção às anterioridades anual e nonagesimal, por ter função extrafiscal (regular o comércio exterior). O IR é exceção apenas à noventena.", fundamento: "CF/88, art. 150, III, b e c, e §1º." },
  { id: "RF09", materia: "Direito Tributário", enunciado: "É de competência da União instituir imposto sobre:", alternativas: ["a propriedade de veículos automotores.", "a propriedade predial e territorial urbana.", "a propriedade territorial rural.", "a transmissão causa mortis e doação.", "a transmissão inter vivos de bens imóveis."], correta: 2, explicacao: "O ITR é federal. IPVA e ITCMD são estaduais; IPTU e ITBI são municipais.", fundamento: "CF/88, arts. 153, VI; 155; 156." },
  { id: "RF10", materia: "Direito Tributário", enunciado: "A imunidade recíproca, que veda à União, aos Estados, ao DF e aos Municípios tributar o patrimônio, a renda ou os serviços uns dos outros, alcança:", alternativas: ["impostos, apenas.", "taxas, apenas.", "todos os tributos.", "contribuições de melhoria, apenas.", "impostos e taxas."], correta: 0, explicacao: "As imunidades do art. 150, VI, referem-se apenas a impostos. Taxas e contribuições podem ser cobradas entre os entes.", fundamento: "CF/88, art. 150, VI, a." },
  { id: "RF11", materia: "Contabilidade", enunciado: "Uma empresa possui ativo total de R$ 500.000 e passivo exigível de R$ 320.000. O patrimônio líquido é de:", alternativas: ["R$ 820.000.", "R$ 320.000.", "R$ 180.000.", "R$ 500.000.", "– R$ 180.000."], correta: 2, explicacao: "Equação patrimonial: Ativo = Passivo + PL. Logo, PL = 500.000 − 320.000 = 180.000.", fundamento: "Equação fundamental do patrimônio." },
  { id: "RF12", materia: "Contabilidade", enunciado: "Das contas abaixo, a que apresenta normalmente saldo CREDOR é:", alternativas: ["Caixa.", "Estoques.", "Clientes.", "Fornecedores.", "Despesas com salários."], correta: 3, explicacao: "Contas de passivo (como Fornecedores), PL e receitas têm saldo credor. Ativo e despesas têm saldo devedor.", fundamento: "Natureza dos saldos — método das partidas dobradas." },
  { id: "RF13", materia: "Contabilidade", enunciado: "Uma máquina foi adquirida por R$ 100.000, com valor residual de R$ 10.000 e vida útil de 10 anos. Pelo método linear, a depreciação anual é de:", alternativas: ["R$ 10.000.", "R$ 9.000.", "R$ 11.000.", "R$ 1.000.", "R$ 90.000."], correta: 1, explicacao: "Valor depreciável = 100.000 − 10.000 = 90.000. Por ano: 90.000 ÷ 10 = 9.000.", fundamento: "CPC 27 — Ativo Imobilizado." },
  { id: "RF14", materia: "Contabilidade", enunciado: "Pelo regime de competência, receitas e despesas devem ser reconhecidas:", alternativas: ["quando há entrada ou saída de dinheiro.", "no período em que ocorrem, independentemente de recebimento ou pagamento.", "somente no fim do exercício social.", "apenas quando houver nota fiscal paga.", "no exercício seguinte ao da ocorrência."], correta: 1, explicacao: "Competência: registra-se no período em que o fato ocorre. O regime de caixa considera recebimentos e pagamentos.", fundamento: "Estrutura Conceitual (CPC 00)." },
  { id: "RF15", materia: "Contabilidade", enunciado: "No balanço patrimonial, a conta Estoques de mercadorias para revenda é classificada no:", alternativas: ["ativo circulante.", "ativo não circulante — imobilizado.", "passivo circulante.", "patrimônio líquido.", "ativo não circulante — intangível."], correta: 0, explicacao: "Estoques são realizados no ciclo operacional da empresa: ativo circulante.", fundamento: "Lei nº 6.404/1976, art. 179, I." },
  { id: "RF16", materia: "Direito Administrativo", enunciado: "O atributo do poder de polícia que permite à Administração executar suas decisões sem necessidade de prévia autorização judicial é a:", alternativas: ["coercibilidade.", "autoexecutoriedade.", "discricionariedade.", "imperatividade.", "tipicidade."], correta: 1, explicacao: "Autoexecutoriedade: a Administração executa diretamente seus atos, sem precisar do Judiciário.", fundamento: "Atributos do poder de polícia." },
  { id: "RF17", materia: "Direito Administrativo", enunciado: "Salvo disposição legal específica, o prazo para interposição de recurso administrativo, segundo a Lei nº 9.784/1999, é de:", alternativas: ["5 dias.", "10 dias.", "15 dias.", "30 dias.", "60 dias."], correta: 1, explicacao: "O prazo geral é de 10 dias, contados da ciência ou divulgação oficial da decisão.", fundamento: "Lei nº 9.784/1999, art. 59." },
  { id: "RF18", materia: "Direito Administrativo", enunciado: "NÃO é modalidade de licitação prevista na Lei nº 14.133/2021:", alternativas: ["pregão.", "concorrência.", "leilão.", "diálogo competitivo.", "tomada de preços."], correta: 4, explicacao: "A nova lei prevê pregão, concorrência, concurso, leilão e diálogo competitivo. Tomada de preços e convite foram extintos.", fundamento: "Lei nº 14.133/2021, art. 28." },
  { id: "RF19", materia: "Língua Portuguesa", enunciado: "Assinale a frase que está de acordo com a norma-padrão:", alternativas: ["Faziam anos que não havia fiscalização.", "Fazia anos que não havia fiscalização.", "Haviam muitos processos pendentes.", "Devem haver recursos suficientes.", "Existe muitos tributos indiretos."], correta: 1, explicacao: "Fazer (tempo) e haver (existir) são impessoais: ficam no singular, e o auxiliar acompanha (“deve haver”). Existir é pessoal: “existem muitos tributos”.", fundamento: "Concordância verbal." },
  { id: "RF20", materia: "Língua Portuguesa", enunciado: "Preenchem corretamente as lacunas de “Entreguei o relatório ___ auditora e ___ ela expliquei os cálculos”:", alternativas: ["a / à", "à / a", "à / à", "a / a", "há / a"], correta: 1, explicacao: "Entregar algo “a” alguém + artigo “a” (a auditora) = à. Antes de pronome pessoal (ela) não há crase: “a ela”.", fundamento: "Crase." },
  { id: "RF21", materia: "Raciocínio Lógico", enunciado: "O preço de um produto aumentou 20% e, em seguida, diminuiu 20%. Em relação ao preço inicial, o preço final:", alternativas: ["não se alterou.", "aumentou 4%.", "diminuiu 4%.", "diminuiu 2%.", "aumentou 2%."], correta: 2, explicacao: "1,20 × 0,80 = 0,96, ou seja, 4% abaixo do preço inicial.", fundamento: "Porcentagens sucessivas." },
  { id: "RF22", materia: "Raciocínio Lógico", enunciado: "A proposição “Se o contribuinte declara, então não é multado” é equivalente a:", alternativas: ["Se não declara, então é multado.", "Se é multado, então não declarou.", "O contribuinte declara e é multado.", "Se não é multado, então declarou.", "O contribuinte não declara e não é multado."], correta: 1, explicacao: "Contrapositiva: p → ~q equivale a q → ~p (“Se é multado, então não declarou”).", fundamento: "Equivalências lógicas." },
  { id: "RF23", materia: "Legislação Aduaneira", enunciado: "Segundo o CTN, o fato gerador do imposto sobre a importação é:", alternativas: ["a saída de produtos nacionais do território.", "a entrada de produtos estrangeiros no território nacional.", "o desembarque do importador no país.", "o pagamento da fatura comercial ao exportador.", "a emissão da licença de importação."], correta: 1, explicacao: "O II tem como fato gerador a entrada de produtos estrangeiros no território nacional. A saída de produtos nacionais é fato gerador do imposto de exportação.", fundamento: "CTN, arts. 19 e 23." },
  { id: "RF24", materia: "Comércio Internacional", enunciado: "No Incoterm FOB, a responsabilidade do vendedor termina quando a mercadoria:", alternativas: ["é colocada à disposição do comprador no estabelecimento do vendedor.", "é colocada a bordo do navio no porto de embarque.", "chega ao porto de destino, com frete e seguro pagos.", "é entregue no estabelecimento do comprador, com tributos pagos.", "é desembaraçada na importação."], correta: 1, explicacao: "FOB (Free on Board): o risco passa ao comprador quando a mercadoria está a bordo do navio no porto de embarque. As outras opções descrevem EXW (no estabelecimento do vendedor), CIF (frete e seguro até o destino) e DDP (entregue com tributos pagos).", fundamento: "Incoterms 2020." },
];

/**
 * Distribui o gabarito entre A e E (a posição da correta segue a ordem 0,1,2,3,4,...),
 * girando as alternativas. Evita que "chutar sempre a mesma letra" funcione.
 */
export const QUESTOES_RFB: QuestaoME[] = QUESTOES_RFB_BASE.map((q, i) => {
  const alvo = ((i * 3) % 5) as QuestaoME["correta"];
  const desloc = (alvo - q.correta + 5) % 5;
  const alternativas = q.alternativas.map((_, idx) => q.alternativas[(idx - desloc + 5) % 5]) as QuestaoME["alternativas"];
  return { ...q, alternativas, correta: alvo };
});

// ======================= DISCURSIVAS =======================

export const DISCURSIVAS: Record<Trilha, Discursiva> = {
  PF: {
    trilha: "PF",
    tema: "A Polícia Federal e o enfrentamento ao crime organizado transnacional",
    comando:
      "Redija um texto dissertativo sobre a atuação da Polícia Federal no enfrentamento ao crime organizado transnacional. Aborde, necessariamente, os seguintes aspectos:",
    linhasMax: 30,
    topicos: [
      {
        titulo: "1. Natureza e previsão constitucional da Polícia Federal",
        esperado:
          "A PF é órgão permanente, instituído por lei, organizado e mantido pela União e estruturado em carreira (CF, art. 144, §1º). Integra o sistema de segurança pública.",
        palavrasChave: ["144", "constituição", "órgão permanente", "permanente", "união", "carreira", "segurança pública"],
      },
      {
        titulo: "2. Atribuições relacionadas ao tema",
        esperado:
          "Polícia judiciária da União com exclusividade; apuração de infrações com repercussão interestadual ou internacional que exijam repressão uniforme; prevenção e repressão ao tráfico de drogas, ao contrabando e ao descaminho; polícia marítima, aeroportuária e de fronteiras (CF, art. 144, §1º, I a IV).",
        palavrasChave: ["polícia judiciária", "tráfico", "contrabando", "descaminho", "fronteira", "fronteiras", "interestadual", "internacional", "aeroportuária", "marítima"],
      },
      {
        titulo: "3. Estratégias de enfrentamento",
        esperado:
          "Cooperação internacional (Interpol, acordos e adidos policiais), atividade de inteligência, integração com outros órgãos (Receita Federal, Forças Armadas, polícias estaduais, COAF), investigação patrimonial e asfixia financeira (lavagem de dinheiro), uso de tecnologia.",
        palavrasChave: ["cooperação", "interpol", "inteligência", "integração", "lavagem", "coaf", "receita federal", "tecnologia", "patrimonial", "financeira"],
      },
    ],
  },
  RFB: {
    trilha: "RFB",
    tema: "Decadência e prescrição no Direito Tributário",
    comando:
      "Redija um texto dissertativo sobre decadência e prescrição no Direito Tributário. Aborde, necessariamente, os seguintes aspectos:",
    linhasMax: 30,
    topicos: [
      {
        titulo: "1. Conceito e prazo da decadência",
        esperado:
          "A decadência é a perda do direito de a Fazenda constituir o crédito tributário pelo lançamento. Prazo de 5 anos, contado, em regra, do primeiro dia do exercício seguinte àquele em que o lançamento poderia ter sido efetuado (CTN, art. 173, I). Nos tributos lançados por homologação, conta-se do fato gerador (art. 150, §4º), salvo dolo, fraude ou simulação.",
        palavrasChave: ["decadência", "constituir", "lançamento", "173", "cinco anos", "5 anos", "primeiro dia do exercício", "150"],
      },
      {
        titulo: "2. Conceito e prazo da prescrição",
        esperado:
          "A prescrição é a perda do direito de a Fazenda cobrar judicialmente o crédito já constituído (ação de cobrança/execução fiscal). Prazo de 5 anos, contados da constituição definitiva do crédito (CTN, art. 174).",
        palavrasChave: ["prescrição", "cobrança", "cobrar", "execução fiscal", "174", "constituição definitiva", "ação"],
      },
      {
        titulo: "3. Interrupção da prescrição e efeitos",
        esperado:
          "A prescrição se interrompe pelo despacho do juiz que ordenar a citação em execução fiscal, pelo protesto judicial ou extrajudicial, por qualquer ato judicial que constitua em mora o devedor e por ato inequívoco de reconhecimento do débito (CTN, art. 174, parágrafo único). Decadência e prescrição extinguem o crédito tributário (art. 156, V).",
        palavrasChave: ["interrup", "despacho", "citação", "protesto", "reconhecimento", "mora", "extinção", "extingue", "156"],
      },
    ],
  },
};
