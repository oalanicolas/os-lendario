// =============================================================================
// PSYCHOMETRIC DOMAINS - Classification of Mapping Systems
// =============================================================================
// These are the 6 domains of psychological assessment systems (mapping_systems).
// Each domain contains instruments that measure specific aspects of a person
// and produce components that map to conceptual drivers.
//
// NOTE: This is different from the 5-Layer Tool Taxonomy (Philosophy → Methodology)
// which classifies cognitive artifacts in the `tools` table.
// =============================================================================

export interface PsychometricDomain {
    tier: number;
    title: string;
    description: string;
    artifacts: string[];  // These are mapping_system names
    color: string;
    role: 'Analyzer' | 'Synthesizer' | 'Hybrid';
    driverExamples: string[];  // Drivers this domain typically maps to
    tableMapping: string;  // How this maps to mapping_systems.layer or .category
}

export const PSYCHOMETRIC_DOMAINS: PsychometricDomain[] = [
    {
        tier: 1,
        title: "Core Psychometrics",
        role: "Analyzer",
        description: "Foundational personality measurement systems. These provide the primary trait scores from which drivers are inferred.",
        artifacts: ["Big Five (OCEAN)", "HEXACO", "Enneagram", "DISC"],
        driverExamples: ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"],
        color: "#6366f1", // indigo
        tableMapping: "layer = 'personality' OR category = 'core'"
    },
    {
        tier: 2,
        title: "Clinical & Therapeutic",
        role: "Analyzer",
        description: "Clinical instruments for deep psychological patterns. Identify core needs, attachment styles, and defense mechanisms.",
        artifacts: ["Schema Therapy", "IFS (Internal Family Systems)", "Attachment Styles", "Defense Mechanisms"],
        driverExamples: ["need_for_autonomy", "need_for_connection", "emotional_regulation", "self_worth"],
        color: "#ec4899", // pink
        tableMapping: "layer = 'clinical'"
    },
    {
        tier: 3,
        title: "Developmental Models",
        role: "Analyzer",
        description: "Stage-based systems measuring cognitive and moral development. Define the complexity level of a person's meaning-making.",
        artifacts: ["Spiral Dynamics", "Kegan Stages", "Kohlberg Moral Development", "Loevinger Ego Development"],
        driverExamples: ["perspective_taking", "systems_thinking", "value_complexity", "meaning_making"],
        color: "#8b5cf6", // violet
        tableMapping: "layer = 'developmental'"
    },
    {
        tier: 4,
        title: "Positive Psychology",
        role: "Analyzer",
        description: "Strengths-based and well-being focused assessments. Identify what energizes and motivates a person.",
        artifacts: ["VIA Character Strengths", "PERMA", "Gallup StrengthsFinder", "Values in Action"],
        driverExamples: ["curiosity", "zest", "gratitude", "hope", "self_regulation"],
        color: "#10b981", // emerald
        tableMapping: "layer = 'positive'"
    },
    {
        tier: 5,
        title: "Cognitive & Behavioral",
        role: "Hybrid",
        description: "Systems measuring cognitive style, decision-making, and action patterns. Bridge traits to observable behavior.",
        artifacts: ["Jung Functions (MBTI)", "Kolbe A Index", "ZTPI (Time Perspective)", "Cognitive Style Index"],
        driverExamples: ["analytical_depth", "intuitive_processing", "future_orientation", "action_bias"],
        color: "#06b6d4", // cyan
        tableMapping: "layer = 'cognitive'"
    },
    {
        tier: 6,
        title: "Worldview & Values",
        role: "Synthesizer",
        description: "Systems measuring belief structures and life narratives. Used to match compatible philosophical tools to a person.",
        artifacts: ["Schwartz Values", "Moral Foundations", "Worldview Assessment", "Narrative Identity"],
        driverExamples: ["epistemic_stance", "locus_of_control", "meaning_hierarchy", "value_priority"],
        color: "#f59e0b", // amber
        tableMapping: "layer = 'existential' OR layer = 'values'"
    }
];

// =============================================================================
// NOTE: Philosophical systems like Stoicism, Existentialism, Pragmatism are
// NOT mapping_systems. They are TOOLS (Layer 1 - Philosophy) and belong in
// the `tools` table, not here.
// =============================================================================
