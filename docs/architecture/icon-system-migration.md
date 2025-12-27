# Plano de Migracao: Sistema de Icones para Iconoir

**Data:** 2025-12-27
**Status:** Aprovado
**Responsavel:** UX Design Expert (Uma)

---

## Contexto

**Decisao:** Migrar de Flaticon UIcons (icon font) para **Iconoir** (React SVG components)

**Motivos da escolha:**
- Visual minimalista e clean (estilo europeu)
- Menor bundle size (~6kb para 50 icones vs ~50kb font inteira)
- Tree-shaking real - so carrega icones usados
- TypeScript completo com autocomplete
- Diferenciacao visual vs apps que usam Lucide

---

## Estado Atual

| Item | Quantidade |
|------|------------|
| Usos do componente Icon | ~1.476 instancias |
| Icones documentados | ~60 icones |
| Arquivos com Lucide | 3 arquivos em arena/ |
| Componente Icon | 1 arquivo (icon.tsx) |
| UIcons CSS (CDN) | 3 arquivos em index.html |

---

## Arquivos Criticos

### Para Modificar:
- `app/components/ui/icon.tsx` - Componente principal
- `app/index.html` - Remover CDN UIcons
- `app/components/minds/arena/FrameworksLibrary.tsx` - Lucide
- `app/components/minds/arena/FrameworkCard.tsx` - Lucide
- `app/components/minds/arena/FrameworkDetailModal.tsx` - Lucide
- `app/components/design-system/IconSection.tsx` - Documentacao
- `app/package.json` - Dependencias

### Para Criar:
- `app/components/ui/icons/index.ts` - Barrel export de todos os icones
- `app/components/ui/icons/icon-map.ts` - Mapeamento kebab-case → Iconoir

---

## Fases de Implementacao

### FASE 1: Criar Nova Arquitetura de Icones
**Objetivo:** Novo sistema Icon baseado em Iconoir mantendo API compativel

#### 1.1 Criar mapeamento de nomes
```
app/components/ui/icons/icon-map.ts
```
- Mapear ~100 nomes kebab-case (atual) → componentes Iconoir PascalCase
- Exemplo: `"home"` → `Home`, `"arrow-right"` → `ArrowRight`

#### 1.2 Criar novo componente Icon
```
app/components/ui/icon.tsx (reescrever)
```
- Manter mesma interface: `<Icon name="home" size="size-5" />`
- Internamente usar Iconoir components
- Manter props: name, size, className, label, type
- Converter size-* para pixels (Iconoir usa numeros)

#### 1.3 Barrel export
```
app/components/ui/icons/index.ts
```
- Exportar todos os icones usados no projeto
- Facilitar imports e tree-shaking

---

### FASE 2: Migrar Componentes Lucide
**Objetivo:** Substituir imports diretos de lucide-react

#### 2.1 FrameworksLibrary.tsx
```diff
- import { Loader2, Library, Filter, Search } from 'lucide-react';
+ import { Icon } from '../../ui/icon';
```
- Substituir: `<Loader2 />` → `<Icon name="spinner" />`
- Substituir: `<Library />` → `<Icon name="book" />`
- Substituir: `<Filter />` → `<Icon name="filter" />`
- Substituir: `<Search />` → `<Icon name="search" />`

#### 2.2 FrameworkCard.tsx
```diff
- import { Users, Clock, Target, Info } from 'lucide-react';
+ import { Icon } from '../../ui/icon';
```

#### 2.3 FrameworkDetailModal.tsx
```diff
- import { X, Users, Clock, Target, Award, PlayCircle } from 'lucide-react';
+ import { Icon } from '../../ui/icon';
```

---

### FASE 3: Remover Dependencias Antigas
**Objetivo:** Limpar bundle e CDN

#### 3.1 Remover UIcons CSS do index.html
```diff
- <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css'>
- <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css'>
- <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css'>
```

#### 3.2 Remover pacotes nao usados
```bash
npm uninstall lucide-react @iconscout/react-unicons
```

#### 3.3 Manter apenas iconoir-react
```json
{
  "iconoir-react": "^7.11.0"
}
```

---

### FASE 4: Atualizar Documentacao
**Objetivo:** Refletir novo sistema no Design System

#### 4.1 Atualizar IconSection.tsx
- Usar novos componentes Iconoir
- Atualizar exemplos de codigo
- Documentar mapeamento de nomes

#### 4.2 Atualizar README.md
- Remover referencias a UIcons
- Documentar uso do novo sistema

---

### FASE 5: Testes e QA
**Objetivo:** Garantir que nada quebrou

#### 5.1 Build de verificacao
```bash
npm run build
npm run typecheck
```

#### 5.2 Testes visuais
- Verificar paginas principais
- Verificar estados de hover/active
- Verificar tamanhos e alinhamentos

---

## Mapeamento de Icones

### Navegacao
| UIcons (atual) | Iconoir |
|----------------|---------|
| `home` | `Home` |
| `apps` | `AppWindow` |
| `arrow-right` | `ArrowRight` |
| `arrow-left` | `ArrowLeft` |
| `arrow-small-up` | `ArrowUp` |
| `arrow-small-down` | `ArrowDown` |
| `angle-small-right` | `NavArrowRight` |
| `angle-small-left` | `NavArrowLeft` |
| `angle-small-up` | `NavArrowUp` |
| `angle-small-down` | `NavArrowDown` |
| `sign-out-alt` | `LogOut` |

### Acoes
| UIcons (atual) | Iconoir |
|----------------|---------|
| `search` | `Search` |
| `plus` | `Plus` |
| `minus` | `Minus` |
| `cross` | `Xmark` |
| `check` | `Check` |
| `pencil` | `EditPencil` |
| `trash` | `Trash` |
| `copy` | `Copy` |
| `download` | `Download` |
| `upload` | `Upload` |
| `refresh` | `Refresh` |
| `filter` | `Filter` |
| `eye` | `Eye` |
| `eye-crossed` | `EyeClosed` |
| `lock` | `Lock` |

### Comunicacao
| UIcons (atual) | Iconoir |
|----------------|---------|
| `envelope` | `Mail` |
| `comment-alt` | `ChatBubble` |
| `bell` | `Bell` |
| `microphone` | `Microphone` |
| `play` | `Play` |
| `pause` | `Pause` |
| `camera` | `Camera` |
| `music` | `MusicDoubleNote` |

### Interface
| UIcons (atual) | Iconoir |
|----------------|---------|
| `list` | `List` |
| `layers` | `Layers` |
| `box` | `Box` |

### Negocios
| UIcons (atual) | Iconoir |
|----------------|---------|
| `chart-histogram` | `GraphUp` |
| `briefcase` | `Suitcase` |
| `building` | `Building` |
| `credit-card` | `CreditCard` |
| `shopping-cart` | `Cart` |
| `rocket` | `Rocket` |

### Tech
| UIcons (atual) | Iconoir |
|----------------|---------|
| `bug` | `Bug` |
| `database` | `Database` |
| `cloud` | `Cloud` |
| `laptop` | `Laptop` |
| `wifi` | `Wifi` |

### Usuarios
| UIcons (atual) | Iconoir |
|----------------|---------|
| `user` | `User` |
| `users-alt` | `Group` |

### Geral
| UIcons (atual) | Iconoir |
|----------------|---------|
| `calendar` | `Calendar` |
| `clock` | `Clock` |
| `folder` | `Folder` |
| `document` | `Page` |
| `star` | `Star` |
| `heart` | `Heart` |
| `map-marker` | `MapPin` |
| `settings` | `Settings` |
| `info` | `InfoCircle` |
| `exclamation` | `WarningTriangle` |
| `interrogation` | `HelpCircle` |

---

## Estimativa de Esforco

| Fase | Tempo |
|------|-------|
| Fase 1: Nova arquitetura | 45-60 min |
| Fase 2: Migrar Lucide | 15-20 min |
| Fase 3: Remover deps | 10 min |
| Fase 4: Documentacao | 20-30 min |
| Fase 5: Testes | 15-20 min |
| **Total** | **~2-3 horas** |

---

## Riscos e Mitigacoes

| Risco | Mitigacao |
|-------|-----------|
| Icone nao existe no Iconoir | Usar icone similar ou manter fallback |
| Breaking change de API | Manter mesma interface do componente |
| Performance de bundle | Tree-shaking garante so icones usados |
| Tamanhos inconsistentes | Mapear size-* para pixels corretamente |

---

## Criterios de Sucesso

- [ ] Build passa sem erros
- [ ] TypeScript compila sem warnings
- [ ] Todos os icones renderizam corretamente
- [ ] Bundle size reduzido (verificar com `npm run build`)
- [ ] Nenhuma referencia a UIcons ou Lucide no codigo
- [ ] Documentacao atualizada

---

## Ordem de Execucao

1. **Criar icon-map.ts** com mapeamento completo
2. **Reescrever icon.tsx** usando Iconoir
3. **Testar** com `npm run dev` e verificar visualmente
4. **Migrar arquivos Lucide** (3 arquivos)
5. **Remover UIcons CSS** do index.html
6. **Remover dependencias** do package.json
7. **Atualizar documentacao**
8. **Build final** e QA

---

## Referencias

- [Iconoir](https://iconoir.com/) - Biblioteca escolhida
- [Comparacao de Icones](/design/icons-compare) - Pagina de comparacao criada
- Conversa de decisao: 2025-12-27
