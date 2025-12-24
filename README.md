# 🏛️ Academia Lendária Design System v4.1

![Version](https://img.shields.io/badge/version-4.1.0-C9B298?style=flat-square)
![Stack](https://img.shields.io/badge/stack-React_18_+_Vite_+_Tailwind-black?style=flat-square)
![License](https://img.shields.io/badge/license-Proprietary-gray?style=flat-square)

> **"Unir e potencializar pessoas lendárias com IA para construírem soluções e negócios que imortalizam seu legado."**

Este repositório contém o **Design System [IA]**, uma biblioteca de componentes e tokens de design projetada para escalar aplicações com elegância, precisão e performance. Focado em **AI-First Development**.

---

## 📑 Índice

- [Arquitetura & Estrutura](#-arquitetura--estrutura)
- [Instalação & Setup](#-instalação--setup)
- [Fundamentos de Design (Tokens)](#-fundamentos-de-design)
- [Componentes (UI)](#-componentes-ui)
- [Integração com IA](#-integração-com-ia)
- [Convenções de Código](#-convenções-de-código)

---

## 🏗 Arquitetura & Estrutura

O projeto utiliza uma estrutura atômica simplificada, otimizada para manutenção e geração de código por IA.

```bash
src/
├── components/
│   ├── ui/               # Componentes Atômicos (Botões, Inputs, Cards)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── icon.tsx      # Wrapper exclusivo para ícones
│   ├── [Sections].tsx    # Páginas de Documentação/Exemplos
│   └── Sidebar.tsx       # Navegação Principal
├── lib/
│   ├── utils.ts          # Utilitário cn() para merge de classes
│   └── theme.ts          # Definições de temas (Gold, Mint, etc.)
├── types.ts              # Tipagem global
├── App.tsx               # Roteamento e Estado Global
└── index.css             # Tailwind Directives & CSS Variables
```

---

## 🚀 Instalação & Setup

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Rodando Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Code Quality Scripts

Mantemos altos padrões de qualidade de código com ESLint, Prettier e Husky:

```bash
# Executar linting (requer 0 erros)
npm run lint

# Auto-corrigir erros de linting
npm run lint:fix

# Formatar código com Prettier
npm run format

# Validação de tipos TypeScript
npm run typecheck
```

**Importante:** O pre-commit hook (Git Husky) executa automaticamente linting e formatting antes de permitir commits. Isso garante que todo código mesclado ao repositório esteja em conformidade com os padrões do projeto.

---

## 🎨 Fundamentos de Design

O sistema utiliza **CSS Variables** nativas para permitir troca de temas em tempo de real (Runtime Theming) sem recompilação do Tailwind.

### 1. Cores Semânticas

Não use cores hexadecimais hardcoded. Use as variáveis semânticas para garantir compatibilidade com **Dark Mode**.

| Token                   | Uso                   | Exemplo                    |
| ----------------------- | --------------------- | -------------------------- |
| `bg-background`         | Fundo da página       | Branco / Preto Absoluto    |
| `bg-card`               | Contêineres e Painéis | Branco / Cinza Escuro      |
| `bg-primary`            | Ações Principais      | **Gold (#C9B298)**         |
| `text-muted-foreground` | Texto Secundário      | Cinza Médio                |
| `border-border`         | Bordas sutis          | Cinza Claro / Cinza Escuro |

### 2. A Regra dos 8%

A cor primária (Gold/Marca) deve ocupar no máximo **8%** da interface. O restante deve ser monocromático, focado em tipografia e espaçamento.

### 3. Tipografia

- **Inter (Sans-serif):** Títulos, Botões, UI Controls.
- **Source Serif 4 (Serif):** Corpo de texto, parágrafos longos, citações.

---

## 🧩 Componentes UI

Abaixo estão os exemplos de uso dos componentes core.

### Botões (`Button`)

```tsx
import { Button } from '@/components/ui/button';

// Primário (Gold)
<Button>Ação Principal</Button>

// Secundário
<Button variant="outline">Cancelar</Button>

// Destrutivo
<Button variant="destructive">Excluir</Button>
```

### Ícones (`Icon`)

NÃO use bibliotecas externas diretamente. Use o wrapper proprietário que mapeia para _Flaticon UIcons_.

```tsx
import { Icon } from '@/components/ui/icon';

// Correto
<Icon name="home" size="size-5" />;

// Errado
import { Home } from 'lucide-react'; // X
```

### Cards (`Card`)

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Conteúdo aqui...</p>
  </CardContent>
</Card>;
```

---

## 🤖 Integração com IA

Este Design System foi construído para ser "falado" por LLMs (Cursor, Claude, GPT).

### Prompt System (Contexto)

Ao pedir para uma IA criar uma nova tela, forneça o seguinte contexto:

> "Use o Academia Lendária Design System. Utilize componentes de 'components/ui'. Use a função 'cn()' para classes. Siga a regra de 8% de cor. Fontes: Inter para UI, Source Serif 4 para texto. Use o componente <Icon name='...' /> para ícones."

### Arquivo `.cursorrules`

Existe um arquivo de regras na raiz que instrui o editor Cursor a:

1. Preferir `components/ui` ao invés de criar novos.
2. Usar TailwindCSS para estilização.
3. Manter a estética "Lendária" (Minimalismo de Luxo).

---

## 📏 Convenções de Código

1. **Utilitário `cn()`**: Sempre use `cn()` para classes condicionais.

   ```tsx
   // Correto
   <div className={cn('p-4', isActive && 'bg-primary')} />
   ```

2. **Exports**: Use Named Exports para componentes (`export function Button...`).

3. **Responsividade**: Mobile-first.
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
   ```

---

## 🔒 TypeScript Strict Mode

Todos os arquivos TypeScript do projeto devem passar em `npm run typecheck` com **zero erros**. O projeto utiliza `"strict": true` no `tsconfig.json`, que ativa todas as 10 regras de verificação rigorosa.

### Regras Principais

1. **Always type function parameters and returns**

   ```typescript
   // ❌ Errado
   const add = (a, b) => a + b;

   // ✅ Correto
   const add = (a: number, b: number): number => a + b;
   ```

2. **Use interfaces for React component props**

   ```typescript
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
     children: React.ReactNode;
   }

   export const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
     <button className={`btn btn-${variant}`} {...props} />
   );
   ```

3. **Check for null/undefined before accessing properties**

   ```typescript
   // ❌ Errado - fails strictNullChecks
   const name = user.name;

   // ✅ Correto - optional chaining
   const name = user?.name;

   // ✅ Correto - nullish coalescing
   const name = user?.name ?? 'Unknown';
   ```

4. **Never use `any` - use `unknown` instead**

   ```typescript
   // ❌ Errado
   const data: any = fetchData();

   // ✅ Correto - use type guards
   const data: unknown = fetchData();
   if (typeof data === 'string') {
     // data is now typed as string
   }
   ```

5. **Remove unused variables and parameters**

   ```typescript
   // ❌ Errado - noUnusedLocals catches this
   const getUser = (id: string) => {
     const unused = 'value';
     return getUserById(id);
   };

   // ✅ Correto - remove or prefix with underscore
   const getUser = (id: string) => getUserById(id);

   // ✅ Correto - if intentionally unused
   const handler = (_event: React.MouseEvent) => {
     console.log('handled');
   };
   ```

### Quando usar `@ts-nocheck`

Para arquivos com problemas estruturais de tipo (deferred fixes), adicione `// @ts-nocheck` no topo do arquivo com um comentário explicando:

```typescript
// @ts-nocheck
// TODO: Story 0.2.1 - Refactor Supabase type definitions
// Database schema and application expectations are misaligned
// This will be fixed in Story 0.2.1
```

---

## 🔄 CI/CD & Automação

### GitHub Actions Workflow

Este projeto utiliza GitHub Actions para automação de qualidade de código. O workflow `CI` executa automaticamente em cada push e pull request.

**Jobs executados:**

1. **Lint** - Valida código com ESLint e formatação com Prettier
   ```bash
   npm run lint
   npm run format:check
   ```

2. **TypeCheck** - Verifica tipos TypeScript sem emitir código
   ```bash
   npm run typecheck
   ```

3. **Build** - Compila aplicação com Vite
   ```bash
   npm run build
   ```

4. **Test** - Executa testes com Vitest
   ```bash
   npm run test
   ```

### Comandos Locais

Execute os mesmos testes localmente antes de commitar:

```bash
# Linting + Formatting
npm run lint
npm run format:check
npm run format  # Fix formatting issues

# Type checking
npm run typecheck

# Build
npm run build

# Tests
npm run test
```

### Pré-commit Hooks

Configure Git hooks para validação automática (opcional):

```bash
npm run husky:install  # Se configurado
```

### Status Checks

Status checks são **obrigatórios** antes de fazer merge em PRs. Todos os jobs devem passar:

- ✅ lint
- ✅ typecheck
- ✅ build
- ✅ test

---

## 📄 Licença

Proprietário © 2025 The Legends & Co.
Todos os direitos reservados.
