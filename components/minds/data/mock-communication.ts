export const MOCK_COMMUNICATION_DATA = {
  voiceDNA: {
    // Sliders: 0-100
    provocationActivity: 85, // "Level of Provocation" - Scales: Discomfort -> Reflection -> Crisis
    truthTemperature: 95, // "Temperature of Truth" - Counseling -> Therapeutic Humiliation
    validationVsChallenge: 30, // 0 = Pure Validation, 100 = Pure Challenge (Rule: Validate Pain then Challenge Comfort)
    density: 40, // Length/Conciseness
    keywords: [
      'Lendário',
      'AI First',
      'Escalar',
      'Legado',
      'F*da-se o medíocre',
      'Engrenagem',
      'Orquestração',
    ],
  },
  // O Sistema Operacional Comportamental
  behavioralOS: {
    traits: [
      {
        name: 'Energy Cycles',
        value: 'Non-Linear',
        desc: 'Picos de Hiperfoco (8h+) vs Vales de Recuperação. Não espere consistência 9-5.',
        icon: 'activity',
      },
      {
        name: 'Redundancy Allergy',
        value: 'Critical',
        desc: 'Rejeição imediata de inputs repetitivos. Interações devem avançar em Profundidade ou Precisão.',
        icon: 'alert-triangle',
        color: 'text-red-500',
      },
      {
        name: 'Clarity First',
        value: 'Absolute',
        desc: "Alinhamento Interno > Dados Externos. 'Se há dúvida, é não'.",
        icon: 'search',
      },
      {
        name: 'Selective Procrastination',
        value: 'Filter',
        desc: "Adia tarefas desalinhadas como sinal de defesa da 'Zona de Genialidade'.",
        icon: 'filter',
      },
    ],
    archetype: 'Instalação de SO Mental',
    role: 'O Governante Rebelde',
  },
  // Assinaturas Linguísticas
  linguistics: {
    punctuation: [
      { char: '—', desc: 'Travessão para clarificação ou ênfase súbita.' },
      { char: ':', desc: 'Dois pontos para estruturar lógica.' },
      { char: '→', desc: 'Setas para causalidade direta.' },
    ],
    antiPatterns: [
      'I understand how you feel...',
      'Basically / Actually',
      'To be honest',
      'I think maybe...',
    ],
  },
  semantics: {
    tier1: {
      label: 'Tier 1: Mantras (Core Identity)',
      words: [
        'Clareza é uma arma',
        'A única constante é a mudança',
        'Conhece-te a ti mesmo',
        'Quando não somos autênticos, adoecemos',
        'Grave isso',
      ],
    },
    tier2: {
      label: 'Tier 2: Modelos Mentais (Frameworks)',
      words: [
        'Pareto ao Cubo',
        'Perdas limitadas, ganhos ilimitados',
        'Otimista Racional',
        'Do ponto de vista de sistemas...',
        'Elimina → Automatiza → Otimiza',
      ],
    },
    tier3: {
      label: 'Tier 3: Contextual (Situcional)',
      words: [
        'InnerLens',
        'Gaiola de ouro',
        'Morte e renascer',
        'Engenheiro vs Engrenagem',
        'Obeso intelectual',
      ],
    },
  },
  // O Arsenal Retórico: As armas que ele usa
  rhetoricalArsenal: [
    {
      name: 'The Pattern Break',
      desc: 'Quebra de ritmo visual e semântico para retomar atenção.',
      example: 'Não é sorte. É matemática.',
      frequency: 'Muito Alta',
    },
    {
      name: 'Polarizing Frame',
      desc: "Criação de um inimigo comum ou 'nós vs eles' imediato.",
      example: 'Enquanto eles brincam, nós dominamos.',
      frequency: 'Alta',
    },
    {
      name: 'Sensory Overload',
      desc: 'Uso de palavras viscerais para gerar reação física.',
      example: 'Sangrar no campo de batalha. Esmagar a meta.',
      frequency: 'Média',
    },
    {
      name: 'Future Casting',
      desc: 'Pintar um cenário futuro inevitável onde o leitor já venceu (ou perdeu).',
      example: 'Em 2025, você será um dinossauro ou um deus.',
      frequency: 'Média',
    },
  ],
  catchphrases: [
    {
      text: 'Você precisa ser mais lembrado do que ensinado.',
      tag: 'Filosófica',
      desc: 'Base pedagógica do método.',
    },
    {
      text: 'A vida é uma jornada que vence aqueles que aprenderem a morrer antes da morte.',
      tag: 'Filosófica',
      desc: 'Morte simbólica do eu medíocre.',
    },
    {
      text: 'Primeiro seja, para depois ter.',
      tag: 'Princípio de Ação',
      desc: 'Identidade antes de resultados.',
    },
    {
      text: 'O que vem fácil, vai fácil.',
      tag: 'Princípio de Ação',
      desc: 'Valor do esforço consistente.',
    },
    {
      text: 'Alimente o lobo certo!',
      tag: 'Ferramenta de Escolha',
      desc: 'Poder da atenção seletiva.',
    },
    { text: 'Como assim, Alan?', tag: 'Provocação Signature', desc: 'Antecipação de objeções.' },
    { text: 'Será?', tag: 'Provocação Signature', desc: 'Questionamento de certezas.' },
    {
      text: 'Ninguém é vilão em suas próprias histórias.',
      tag: 'Verdade Incômoda',
      desc: 'Perspectiva e narrativa pessoal.',
    },
    {
      text: 'Estabilidade é o nome bonito da estagnação.',
      tag: 'Verdade Incômoda',
      desc: 'Destruição de ilusão básica.',
    },
    { text: 'Grave isso:', tag: 'Comando Direto', desc: 'Marca momentos de insight crucial.' },
    {
      text: 'Pessoas medíocres são menores que seus problemas.',
      tag: 'Declaração de Poder',
      desc: 'Reformulação brutal de conceito.',
    },
  ],
  // A Matriz Contextual: Como a voz muda
  contextualMatrix: [
    {
      context: 'Vendas (High Stakes)',
      shift: 'Aumenta URGÊNCIA e POLARIZAÇÃO. Diminui complexidade.',
      tone: 'Agressivo',
    },
    {
      context: 'Ensino (Mentoria)',
      shift: 'Aumenta ESTRUTURA e ANALOGIAS. Mantém autoridade.',
      tone: 'Professoral',
    },
    {
      context: 'Conflito (Crítica)',
      shift: 'Frio, cínico, baseado em dados. Remove toda emoção.',
      tone: 'Cirúrgico',
    },
    {
      context: 'Storytelling (Origem)',
      shift: 'Vulnerabilidade calculada. Jornada do Herói clássica.',
      tone: 'Inspirador',
    },
  ],
  writingSamples: {
    twitter: {
      content:
        'A maioria das pessoas está brincando de casinha com IA.\n\nEnquanto você pede pro ChatGPT escrever e-mail, seu concorrente tá construindo um AGENTE que prospecta, qualifica e vende enquanto ele dorme.\n\nNão é sobre produtividade. É sobre SUBSTITUIÇÃO de ineficiência.\n\nOu você domina essa p*rra, ou vira estatística.\n\n#AIFirst #Lendario',
      framework: 'Polarização + Urgência',
      analysis: [
        { type: 'Pattern Break', text: "Ataque direto ao status quo ('brincando de casinha')." },
        { type: 'Polarização', text: 'Você vs. Concorrente (Criação de inimigo comum).' },
        { type: 'Ultimato', text: 'Domina ou morre. Sem meio termo.' },
        { type: 'Clarity Filter', text: 'Substituição > Produtividade (Definição precisa).' },
      ],
      blueprint: [
        { phase: 'Gancho (Pattern Break)', desc: 'Ataque ao status quo.' },
        { phase: 'Verdade Incômoda', desc: 'Seu concorrente já venceu.' },
        { phase: 'Call to Action', desc: 'Domine ou vire estatística.' },
      ],
    },
    linkedin: {
      content:
        'O fim dos gestores intermediários chegou.\n\nNão é clickbait. É matemática.\n\nSe um Agente de IA custa $20/mês e faz o trabalho de análise de dados melhor que seu analista sênior de $15k, o que você acha que vai acontecer?\n\nEstamos vendo a maior transferência de riqueza da história para quem souber ORQUESTRAR inteligência, não apenas operá-la.\n\nNa minha mentoria, mostro como transformei minha operação de 50 pessoas em 5, faturando 10x mais.\n\nO futuro não pertence a quem trabalha mais.\nPertence a quem automatiza o resto.',
      framework: 'Profecia + Prova Social',
      analysis: [
        { type: 'Tese Controversa', text: 'O fim dos gestores intermediários.' },
        { type: 'Ancoragem Numérica', text: '$20/mês vs $15k/mês.' },
        { type: 'Energy Peak', text: 'Conclusão definitiva e profética.' },
      ],
      blueprint: [
        { phase: 'Gancho', desc: 'Profecia do fim dos gestores.' },
        { phase: 'Lógica', desc: 'Matemática irrefutável.' },
        { phase: 'Prova', desc: 'Resultado pessoal.' },
        { phase: 'Conclusão', desc: 'O futuro é da automação.' },
      ],
    },
    newsletter: {
      subject: 'A verdade brutal sobre sua carreira em 2025',
      content:
        'Lendário,\n\nVou ser curto e grosso hoje.\n\nVocê está obsoleto.\n\nNão, não é culpa sua. O sistema te treinou para ser uma peça de engrenagem. E engrenagens são substituíveis.\n\nMas aqui está a boa notícia: nunca foi tão fácil deixar de ser engrenagem e virar o ENGENHEIRO da máquina.\n\nOntem, lancei um agente que...',
      framework: 'AIDA (Attention, Interest, Desire, Action)',
      analysis: [
        { type: 'Visceral', text: 'Curto e grosso: Você está obsoleto.' },
        { type: 'Validação da Dor', text: 'Não é culpa sua, é do sistema.' },
        { type: 'Paradoxo', text: 'A boa notícia de ser substituível.' },
      ],
      blueprint: [
        { phase: 'Atenção', desc: 'Afirmação brutal.' },
        { phase: 'Interesse', desc: 'Explicação sistêmica.' },
        { phase: 'Desejo', desc: 'A nova identidade (Engenheiro).' },
      ],
    },
    whatsapp: {
      content:
        'Mano, esquece o lançamento clássico.\n\nTô testando um funil perpétuo com IA que tá convertendo 15% no frio.\n\nSério. O lead entra, o agente qualifica no 1x1 e manda o link.\n\nVou abrir os bastidores disso na call de quinta. Não perde.',
      framework: 'Insider Secret',
      analysis: [
        { type: 'Tom', text: "Intimidade forçada ('Mano', 'Sério')." },
        { type: 'Ancoragem Numérica', text: '15% no frio.' },
        { type: 'Escassez', text: "Convite exclusivo para 'bastidores'." },
      ],
      blueprint: [
        { phase: 'Quebra', desc: 'Esquece o clássico.' },
        { phase: 'Prova', desc: '15% conversão.' },
        { phase: 'Convite', desc: 'Call de quinta.' },
      ],
    },
  },
  systemPrompts: [
    {
      title: 'Gerador de Threads Virais',
      desc: 'Instrução para criar threads que maximizam engajamento via polarização.',
      content:
        'Você é um especialista em Growth Hacking com personalidade agressiva. Sua missão é transformar um insight técnico em uma thread viral.\n\nRegras:\n1. O primeiro tweet deve ser um ataque ao senso comum.\n2. Use frases curtas. Máximo 10 palavras por linha.\n3. Abuse de quebras de linha.\n4. Termine com uma pergunta retórica que obrigue o leitor a se posicionar.',
    },
    {
      title: 'Resposta a Objeções (Sales)',
      desc: 'Script para neutralizar ceticismo em vendas high-ticket.',
      content:
        "Aja como um consultor sênior que não precisa do dinheiro do cliente. Ao receber uma objeção de preço, não justifique. Desafie.\n\nExemplo:\nCliente: 'Tá caro.'\nVocê: 'Caro comparado a quê? Ao custo de continuar irrelevante no mercado? Se você busca preço, recomendo a concorrência. Se busca dominância, estamos conversando.'",
    },
    {
      title: 'Crítica de Landing Page',
      desc: 'Framework para destruir e reconstruir copy de páginas de venda.',
      content:
        'Analise esta LP com brutalidade honesta. Identifique:\n1. Onde o headline é fraco/genérico.\n2. Onde a promessa não é crível.\n3. Onde o CTA é passivo.\n\nPara cada erro, proponha uma reescrita usando o framework AIDA com tom de urgência.',
    },
  ],
};
