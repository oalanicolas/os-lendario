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

---

## 🎨 Fundamentos de Design

O sistema utiliza **CSS Variables** nativas para permitir troca de temas em tempo de real (Runtime Theming) sem recompilação do Tailwind.

### 1. Cores Semânticas
Não use cores hexadecimais hardcoded. Use as variáveis semânticas para garantir compatibilidade com **Dark Mode**.

| Token | Uso | Exemplo |
|-------|-----|---------|
| `bg-background` | Fundo da página | Branco / Preto Absoluto |
| `bg-card` | Contêineres e Painéis | Branco / Cinza Escuro |
| `bg-primary` | Ações Principais | **Gold (#C9B298)** |
| `text-muted-foreground` | Texto Secundário | Cinza Médio |
| `border-border` | Bordas sutis | Cinza Claro / Cinza Escuro |

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
NÃO use bibliotecas externas diretamente. Use o wrapper proprietário que mapeia para *Flaticon UIcons*.

```tsx
import { Icon } from '@/components/ui/icon';

// Correto
<Icon name="home" size="size-5" />

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
</Card>
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
   <div className={cn("p-4", isActive && "bg-primary")} />
   ```

2. **Exports**: Use Named Exports para componentes (`export function Button...`).

3. **Responsividade**: Mobile-first.
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
   ```

---

## 📄 Licença

Proprietário © 2025 The Legends & Co.
Todos os direitos reservados.
