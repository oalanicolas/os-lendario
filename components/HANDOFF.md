# Component Reorganization Handoff

**Data:** 2025-12-16
**Sessão:** UX Design Expert (@ux-design-expert)

---

## O QUE FOI FEITO

### 1. Audit da Estrutura (174 componentes)

- Identificados 7 arquivos duplicados (Sales templates)
- Identificados 26 componentes órfãos na raiz
- Mapeada inconsistência de estrutura entre domains

### 2. Reorganização Executada

| Ação                                       | Arquivos | Status |
| ------------------------------------------ | -------- | ------ |
| Duplicatas Sales removidas                 | 7        | ✅     |
| Sections → design-system/                  | 22       | ✅     |
| Marketing templates → marketing/templates/ | 12       | ✅     |
| Shared templates → shared/templates/       | 3        | ✅     |
| Layout → shared/layout/                    | 2        | ✅     |
| SalesPageTemplate → sales/templates/       | 1        | ✅     |
| Imports App.tsx atualizados                | 1        | ✅     |
| Imports design-system/\* corrigidos        | 22       | ✅     |
| Imports marketing/\* corrigidos            | 11       | ✅     |
| Imports shared/\* corrigidos               | 3        | ✅     |

### 3. Nova Estrutura

```
components/
├── ui/                      # 56 atomic components (Shadcn)
├── design-system/           # 22 Section components (DS docs)
│   ├── ButtonSection.tsx
│   ├── ColorSection.tsx
│   ├── ... (20 mais)
│   └── SidebarLegacy.tsx
├── shared/
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── index.ts
│   └── templates/           # Generic templates
│       ├── CmsTemplate.tsx
│       ├── KanbanTemplate.tsx
│       └── SaasSettingsTemplate.tsx
├── marketing/templates/     # Funnel/marketing pages
│   ├── LandingPageTemplate.tsx
│   ├── VSLTemplate.tsx
│   ├── ... (10 mais)
│   └── MarketingTemplatesPage.tsx
├── creator/                 # Course Creator domain
│   ├── templates/
│   ├── views/
│   └── ...
├── minds/                   # Synthetic Minds domain
│   ├── templates/
│   └── ui/
├── prd/                     # PRD Studio domain
│   ├── templates/
│   ├── views/
│   └── sections/
├── sales/                   # Sales Intelligence domain
│   └── templates/
└── studio/                  # Studio components
```

---

## PENDENTE (AÇÃO MANUAL)

### 1. Deletar arquivos antigos na raiz

```bash
rm /Users/alan/Code/mmos/app/components/Sidebar.tsx
rm /Users/alan/Code/mmos/app/components/Topbar.tsx
```

### 2. Git commit

```bash
cd /Users/alan/Code/mmos
git add -A
git commit -m "refactor(components): reorganize component structure

- Move 22 Section components to design-system/
- Move layout components to shared/layout/
- Move marketing templates to marketing/templates/
- Move shared templates to shared/templates/
- Remove 7 duplicate Sales templates
- Fix all import paths

🤖 Generated with Claude Code"
```

---

## PRÓXIMOS PASSOS (Próxima Sessão)

### 1. Criar DesignSystemRouter

Simplificar App.tsx removendo 22 imports de Section e criando um router dedicado:

```tsx
// components/design-system/DesignSystemRouter.tsx
// - Topbar horizontal com navegação interna
// - Carrega Sections sob demanda
// - Reduz App.tsx de ~500 linhas para ~200
```

### 2. Padronizar estrutura de domains

Cada domain deve ter:

```
{domain}/
├── {Domain}Router.tsx      # Router interno
├── {Domain}Topbar.tsx      # Navegação horizontal
├── templates/              # Page templates
├── views/                  # Sub-views/pages
└── ui/                     # Domain-specific UI (opcional)
```

**Domains para padronizar:**

- [ ] design-system (criar Router + Topbar)
- [ ] marketing (criar Router + Topbar)
- [ ] sales (já tem Topbar, falta Router)
- [x] creator (completo)
- [x] minds (completo)
- [x] prd (completo)

### 3. Componentizar templates repetitivos

Identificar padrões comuns nos marketing templates:

- Hero sections
- Testimonial cards
- CTA blocks
- Pricing tables
- FAQ accordions

### 4. Criar barrel exports (index.ts)

Adicionar index.ts em cada pasta para facilitar imports:

```tsx
// components/design-system/index.ts
export * from './ButtonSection';
export * from './ColorSection';
// ...
```

---

## ARQUIVOS CHAVE

| Arquivo                     | Descrição                                |
| --------------------------- | ---------------------------------------- |
| `App.tsx`                   | Router principal - imports atualizados   |
| `shared/layout/Sidebar.tsx` | Navegação lateral global                 |
| `shared/layout/Topbar.tsx`  | Topbar genérico                          |
| `types.ts`                  | Section enum (pode precisar atualização) |
| `routes.ts`                 | Mapeamento de rotas                      |

---

## COMANDOS ÚTEIS

```bash
# Ver estrutura atual
find app/components -type d | head -20

# Verificar imports quebrados
npm run build 2>&1 | grep "Failed to resolve"

# Contar componentes por pasta
find app/components -name "*.tsx" | cut -d'/' -f3 | sort | uniq -c | sort -rn
```

---

## NOTAS

- O Bash apresentou problemas na sessão anterior (exit code 1 em todos comandos)
- Subagentes foram usados em paralelo para corrigir imports (3 agentes)
- Design System sections têm imports corrigidos mas precisam de teste de build
- Sugestão do usuário: criar navegação horizontal no Design System (como PRD Studio)

---

_Handoff criado por @ux-design-expert (Uma)_
