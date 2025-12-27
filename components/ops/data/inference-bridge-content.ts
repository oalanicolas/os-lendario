// =============================================================================
// THE INFERENCE BRIDGE - CONNECTING DRIVERS, MAPPING SYSTEMS, AND TOOLS
// =============================================================================

export const INFERENCE_BRIDGE = {
    title: 'The Inference Bridge',
    subtitle: 'Como o MMOS conecta quem você é com o que você usa',

    overview: {
        description: 'O MMOS opera em três camadas ontológicas distintas que se conectam através de um sistema de inferência. Esta é a arquitetura fundamental que permite recomendações personalizadas de ferramentas cognitivas.',

        layers: [
            {
                id: 1,
                name: 'Drivers',
                subtitle: 'O que você É',
                description: 'Forças internas, traços de personalidade, motivações e valores fundamentais',
                nature: 'Interno',
                table: 'drivers',
                count: 849,
                examples: ['Openness', 'Conscientiousness', 'Curiosity', 'Autonomy', 'Empathy'],
                color: '#8b5cf6',
                icon: 'user'
            },
            {
                id: 2,
                name: 'Mapping Systems',
                subtitle: 'Como você é Medido',
                description: 'Instrumentos psicométricos que detectam e quantificam drivers através de comportamento observável',
                nature: 'Ponte (Interno → Externo)',
                table: 'mapping_systems',
                count: 121,
                examples: ['Big Five', 'MBTI', 'Enneagram', 'DISC', 'VIA Strengths'],
                color: '#3b82f6',
                icon: 'activity'
            },
            {
                id: 3,
                name: 'Tools',
                subtitle: 'O que você Usa',
                description: 'Artefatos cognitivos que você escolhe aplicar para pensar, decidir e agir de forma mais efetiva',
                nature: 'Externo',
                table: 'tools',
                count: 294,
                examples: ['First Principles', 'SWOT', 'Scrum', 'GTD', 'Stoicism'],
                color: '#10b981',
                icon: 'wrench'
            }
        ]
    },

    inferenceFlow: {
        title: 'O Fluxo de Inferência',
        description: 'Como o sistema recomenda tools baseado em drivers detectados',

        steps: [
            {
                step: 1,
                title: 'Detecção de Drivers',
                description: 'Mapping Systems analisam comportamento e geram scores em componentes específicos',
                example: 'Big Five detecta: Openness = 85/100',
                tables: ['mind_system_mappings', 'mind_component_scores']
            },
            {
                step: 2,
                title: 'Mapeamento para Drivers',
                description: 'Componentes são traduzidos em drivers conceituais através de relações estabelecidas',
                example: 'Openness (componente) → Curiosity, Creativity, Intellectual Humility (drivers)',
                tables: ['component_driver_map', 'drivers']
            },
            {
                step: 3,
                title: 'Cálculo de Afinidades',
                description: 'Sistema calcula fit entre drivers do mind e requirements/affinities de cada tool',
                example: 'High Curiosity + High Openness → Strong affinity com "First Principles Thinking"',
                tables: ['tool_driver_affinities', 'mind_drivers']
            },
            {
                step: 4,
                title: 'Recomendação Personalizada',
                description: 'Tools são ranqueadas por fit score e apresentadas ao usuário',
                example: 'Top 10 tools recomendadas para este perfil cognitivo',
                tables: ['tools', 'mind_tools']
            }
        ]
    },

    affinityTypes: {
        title: 'Tipos de Afinidade (Driver ↔ Tool)',
        description: 'Quatro tipos de relação entre drivers e tools que alimentam o sistema de recomendação',

        types: [
            {
                type: 'enables',
                label: 'Habilita',
                description: 'Driver facilita o uso efetivo da tool',
                direction: 'Driver → Tool',
                example: 'High Conscientiousness ENABLES GTD',
                rationale: 'Pessoas organizadas naturalmente se adaptam a sistemas estruturados',
                color: '#10b981',
                icon: 'check-circle'
            },
            {
                type: 'requires',
                label: 'Requer',
                description: 'Tool exige nível mínimo do driver para ser útil',
                direction: 'Tool → Driver',
                example: 'Meditation REQUIRES algum nível de Openness',
                rationale: 'Práticas contemplativas demandam abertura a experiências internas',
                color: '#f59e0b',
                icon: 'alert-circle'
            },
            {
                type: 'conflicts',
                label: 'Conflita',
                description: 'Driver dificulta a adoção ou uso da tool',
                direction: 'Driver ⊗ Tool',
                example: 'High Impulsivity CONFLICTS com Long-term Planning',
                rationale: 'Impulsividade torna difícil seguir planos de longo prazo',
                color: '#ef4444',
                icon: 'x-circle'
            },
            {
                type: 'develops',
                label: 'Desenvolve',
                description: 'Uso consistente da tool fortalece o driver',
                direction: 'Tool → Driver',
                example: 'Journaling DEVELOPS Self-Awareness',
                rationale: 'Prática reflexiva aumenta consciência de padrões internos',
                color: '#8b5cf6',
                icon: 'trending-up'
            }
        ]
    },

    realExample: {
        title: 'Exemplo Real: De Perfil a Recomendação',

        profile: {
            name: 'Perfil Exemplo',
            mappingResults: [
                { system: 'Big Five', component: 'Openness', score: 85 },
                { system: 'Big Five', component: 'Conscientiousness', score: 72 },
                { system: 'MBTI', component: 'Type', score: 'INTP' }
            ]
        },

        inferredDrivers: [
            { driver: 'Curiosity', strength: 9, source: 'Openness (85)' },
            { driver: 'Intellectual Humility', strength: 8, source: 'Openness (85)' },
            { driver: 'Need for Structure', strength: 7, source: 'Conscientiousness (72)' },
            { driver: 'Abstract Thinking', strength: 9, source: 'INTP' }
        ],

        recommendedTools: [
            {
                tool: 'First Principles Thinking',
                fitScore: 0.92,
                reasons: [
                    'Curiosity (9) ENABLES decomposição de problemas',
                    'Abstract Thinking (9) ENABLES raciocínio fundamental',
                    'Intellectual Humility (8) ENABLES questionar premissas'
                ]
            },
            {
                tool: 'Systems Thinking',
                fitScore: 0.88,
                reasons: [
                    'Abstract Thinking (9) ENABLES visualização de conexões',
                    'Curiosity (9) ENABLES exploração de relações',
                    'Openness ENABLES perspectivas múltiplas'
                ]
            },
            {
                tool: 'GTD (Getting Things Done)',
                fitScore: 0.75,
                reasons: [
                    'Need for Structure (7) ENABLES adoção do sistema',
                    'Conscientiousness (72) ENABLES manutenção de listas',
                    'WARNING: Pode ser rígido demais para alto Openness'
                ]
            }
        ]
    },

    technicalDetails: {
        title: 'Detalhes Técnicos da Inferência',

        algorithm: {
            name: 'Weighted Affinity Score',
            description: 'Cálculo do fit score entre um mind e uma tool',
            formula: 'fit_score = Σ(affinity.strength × driver.strength / 10) / count(affinities)',

            steps: [
                '1. Para cada tool, buscar todas as affinities (enables, requires, develops)',
                '2. Para cada affinity, verificar se o mind possui o driver correspondente',
                '3. Multiplicar affinity.strength (-1.0 a +1.0) por driver.strength (1-10)',
                '4. Somar todos os produtos e dividir pelo número de affinities',
                '5. Penalizar tools com conflicts (affinity_type = "conflicts")',
                '6. Ordenar tools por fit_score descendente'
            ]
        },

        sqlExample: `
-- Exemplo de query para calcular fit score
SELECT
  t.name,
  t.tool_type,
  SUM(a.strength * md.strength / 10.0) as fit_score,
  COUNT(*) as matching_drivers
FROM tools t
JOIN tool_driver_affinities a ON t.id = a.tool_id
JOIN mind_drivers md ON a.driver_id = md.driver_id
WHERE md.mind_id = 'uuid-do-mind'
  AND a.affinity_type IN ('enables', 'requires')
GROUP BY t.id, t.name, t.tool_type
HAVING SUM(a.strength * md.strength / 10.0) > 0
ORDER BY fit_score DESC
LIMIT 10;
    `
    }
};

export const LAYER_TAXONOMY = {
    title: 'Taxonomias Complementares',
    description: 'Cada camada possui sua própria taxonomia interna',

    taxonomies: [
        {
            layer: 'Drivers',
            taxonomy: 'Por Tipo',
            categories: [
                { name: 'Trait', count: 546, desc: 'Padrões estáveis de comportamento' },
                { name: 'Belief', count: 118, desc: 'Convicções sobre realidade' },
                { name: 'Mindset', count: 61, desc: 'Orientações mentais' },
                { name: 'Need', count: 56, desc: 'Motivações fundamentais' },
                { name: 'Value', count: 52, desc: 'Princípios norteadores' }
            ]
        },
        {
            layer: 'Mapping Systems',
            taxonomy: '6 Domínios de Conhecimento',
            categories: [
                { name: 'Core Personality', desc: 'Big Five, HEXACO' },
                { name: 'Typological', desc: 'MBTI, Enneagram' },
                { name: 'Strengths', desc: 'VIA, CliftonStrengths' },
                { name: 'Clinical', desc: 'Defense Mechanisms, Attachment' },
                { name: 'Developmental', desc: 'Spiral Dynamics, Ego Development' },
                { name: 'Worldview', desc: 'Moral Foundations, Political Psychology' }
            ]
        },
        {
            layer: 'Tools',
            taxonomy: '5 Layers (Paper)',
            categories: [
                { name: 'Philosophy', layer: 1, desc: 'Sistema de crenças e valores' },
                { name: 'Mental Model', layer: 2, desc: 'Representação de sistemas' },
                { name: 'Heuristic', layer: 3, desc: 'Regra prática de decisão' },
                { name: 'Framework', layer: 4, desc: 'Template externo estruturado' },
                { name: 'Methodology', layer: 5, desc: 'Sistema completo de processos' }
            ]
        }
    ]
};
