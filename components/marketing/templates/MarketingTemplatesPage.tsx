import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { Symbol } from '../../ui/symbol';
import { CodeBlock } from '../../ui/code-block';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

const MarketingTemplatesPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
          <Icon name="document" className="rotate-12 text-[12rem]" />
        </div>
        <div className="relative z-10 space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
            >
              Templates v2.0
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              Otimizados com Metodologias Científicas
            </span>
            <Badge variant="success" className="ml-auto">
              Score: 93.3%
            </Badge>
          </div>
          <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
            Guia de <span className="text-primary">Copywriting</span>.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
            Estruturas validadas baseadas em Hopkins, Reeves, Schwartz, Hormozi, Georgi e Dunford.
            Copie, cole e preencha para alta conversão.
          </p>

          <div className="flex flex-wrap gap-2 pt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Mestres:</span>
            <span className="text-foreground">Hopkins</span> •
            <span className="text-foreground">Reeves</span> •
            <span className="text-foreground">Schwartz</span> •
            <span className="text-foreground">Hormozi</span> •
            <span className="text-foreground">Georgi</span> •
            <span className="text-foreground">Dunford</span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="advertorial" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="advertorial"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="file-edit" className="mr-2 size-4" /> Advertorial
          </TabsTrigger>
          <TabsTrigger
            value="salespage"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="shopping-cart" className="mr-2 size-4" /> Página de Vendas
          </TabsTrigger>
          <TabsTrigger
            value="capture"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="magnet" className="mr-2 size-4" /> Captura (Lead)
          </TabsTrigger>
          <TabsTrigger
            value="vsl"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="play-circle" className="mr-2 size-4" /> VSL & Vídeo
          </TabsTrigger>
          <TabsTrigger
            value="webinar"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="presentation" className="mr-2 size-4" /> Webinário
          </TabsTrigger>
          <TabsTrigger
            value="thankyou"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="check-circle" className="mr-2 size-4" /> Obrigado / Upsell
          </TabsTrigger>
          <TabsTrigger
            value="checklist"
            className="ml-auto rounded-b-none rounded-t-lg border-b-2 border-transparent bg-primary/5 px-6 py-3 font-bold text-primary data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="list-check" className="mr-2 size-4" /> Checklist Científico
          </TabsTrigger>
        </TabsList>

        {/* --- 1. ADVERTORIAL --- */}
        <TabsContent value="advertorial" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="Estrutura de Advertorial (Pré-Venda)" language="bash">
                {`# HEADLINE DE NOTÍCIA/DESCOBERTA
[Profissional/Pessoa comum] de [Localização] descobre [método/sistema] que [resultado específico + NÚMERO] em [tempo]

---
**[Autor] | [Data recente] | Leitura: X min**
---

## SEÇÃO 1: LEAD (Gancho Emocional)
[Parágrafo que descreve situação comum e frustrante do avatar]
[Use linguagem EXATA do avatar - coletada em pesquisa]

[Pergunta retórica que conecta com a dor]

## SEÇÃO 2: O PROBLEMA + O INIMIGO
1. [Estatística chocante sobre o problema]
2. "Se você já tentou X, Y, Z... você não está sozinho"
3. [Explicação de por que soluções tradicionais falham]

### O VERDADEIRO CULPADO:
"O problema não é [culpa comum que avatar assume]. 
O verdadeiro culpado é [NOME DO INIMIGO/MECANISMO FALHO] — e é por isso que [consequência negativa]."

## SEÇÃO 3: A DESCOBERTA (Storytelling)
"Depois de [X] tentativas fracassadas, [protagonista] descobriu que [mecanismo específico] aumentava [resultado] em [%/número] — documentado em [X] casos/testes."

## SEÇÃO 4: O MECANISMO (UMS)
- [Nome proprietário do mecanismo]
- [Explicação pseudo-científica de por que funciona]
- [Diagrama ou ilustração simples]
- [Citação de especialista ou estudo]

## SEÇÃO 5: PROVA SOCIAL
"[Resultado específico + timeline + emoção]" - [Nome], [Cidade]

## SEÇÃO 6: MOMENTO DE DECISÃO
"Se [resultado] é possível para [pessoas dos depoimentos], o que está impedindo VOCÊ de [alcançar o mesmo]?
A única diferença entre você e [nome do depoimento] é que [ele/ela] descobriu [mecanismo] antes."

## SEÇÃO 7: TRANSIÇÃO PARA OFERTA
"Depois de [X pessoas/casos], [criador] decidiu disponibilizar [solução] para o público..."

## SEÇÃO 8: CTA
[Nome do Produto/Serviço]
- [Bullet 1 - benefício enquadrado por status externo]
- [Bullet 2 - benefício enquadrado por status externo]
- [Bullet 3 - benefício enquadrado por status externo]

[BOTÃO: "Quero Saber Mais" / "Ver Como Funciona"]
[Elemento de urgência com justificativa real]`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ Nível 3-4
                    </Badge>
                    <p className="text-muted-foreground">
                      Formato editorial reduz resistência de mercados sofisticados.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HOPKINS
                    </Badge>
                    <p className="text-muted-foreground">
                      Específico mensurável obrigatório na headline.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      GEORGI (UMP)
                    </Badge>
                    <p className="text-muted-foreground">
                      O inimigo deve ser NOMEADO explicitamente para externalizar a culpa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- 2. SALES PAGE --- */}
        <TabsContent value="salespage" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="Sales Page Long Form (Integrada)" language="bash">
                {`# HEADLINE PRINCIPAL
[Resultado específico] + [Tempo] + [Sem objeção comum]

### USP EM UMA LINHA (1ª aparição):
[Frase única que será repetida 3x na página - início, meio, fim]

## SEÇÃO 1: IDENTIFICAÇÃO DO PROBLEMA (Agitar a Dor)
### Você já sentiu...
- [Dor específica 1 - linguagem do avatar]
- [Dor específica 2 - linguagem do avatar]
- [Dor específica 3 - linguagem do avatar]

### A verdade que ninguém te conta:
[Parágrafo que invalida as soluções anteriores tentadas pelo avatar]

### E se você continuar assim...
[Consequência de não resolver - future pacing negativo]

## SEÇÃO 2: PROVA (Autoridade)
### Por que me ouvir?
- [Número de clientes/alunos]
- [Resultado mensurável alcançado]
### Admissão Danosa:
"[Vulnerabilidade estratégica que humaniza]"

## SEÇÃO 3: POR QUE ALTERNATIVAS FALHAM (Dunford)
| Alternativa | Por que falha | Consequência |
|-------------|---------------|--------------|
| [Opção A]   | [Limitação]   | [Negativo]   |

### [Seu produto] é diferente porque:
[Atributo único que alternativas não têm]

## SEÇÃO 4: PROMESSA (Dream Outcome)
### Imagine se você pudesse...
- [Benefício 1] para que [pessoas importantes] [reação desejada]
- [Benefício 2] para que [pessoas importantes] [reação desejada]

## SEÇÃO 5: PLANO (Mecanismo Único)
### Apresentando: [NOME DO PRODUTO/MÉTODO]
**Passo 1: [Nome do Módulo]** ⏱️ [X minutos/dia]
[O que vai fazer + resultado] - Sem necessidade de: [esforço]

**Passo 2: [Nome do Módulo]** ⏱️ [X minutos/dia]
[O que vai fazer + resultado] - Sem necessidade de: [esforço]

## SEÇÃO 6: EMPILHAMENTO DE VALOR (Stack)
| Componente | Valor | O que resolve |
|------------|-------|---------------|
| [Principal] | R$ X.XXX | [Problema] |
| [Bônus 1]   | R$ XXX   | [Problema] |
**VALOR TOTAL: R$ XX.XXX**

## SEÇÃO 7: INOCULAÇÃO DE OBJEÇÕES (Antes do preço)
**"E se eu não tiver [recurso]?"**
[Resposta que minimiza esforço + exemplo]
**"Quanto tempo até ver resultados?"**
[Resposta específica com timeline]

## SEÇÃO 8: PREÇO + ANCORAGEM
### Quanto vale [resolver esse problema]?
[Parágrafo sobre o custo de NÃO resolver - quantificado]

### USP REPETIDA (2ª aparição):
[Mesma frase da headline]

**Seu investimento hoje:**
# R$ [PREÇO]
*ou [X]x de R$ [PARCELA]*
**[BOTÃO CTA PRINCIPAL]**

## SEÇÃO 9: GARANTIA (Risk Reversal)
### Garantia [Nome Criativo] de [X] Dias
[Explicação da garantia - incondicional ou condicional]
Se [condição], eu [ação de reversão].

## SEÇÃO 10: PROVA SOCIAL EXPANDIDA
[Depoimentos específicos com resultado + timeline]

## SEÇÃO 11: FAQ (Logística)
[Perguntas sobre acesso, suporte e pagamento]

## SEÇÃO 12: URGÊNCIA + CTA FINAL
[Elemento de Escassez Genuína] + [Justificativa Real]
**[BOTÃO CTA PRINCIPAL]**

### P.S.: [Resumo do benefício]
### P.P.S.: [Consequência de não agir] + USP (3ª aparição)`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      REEVES (USP)
                    </Badge>
                    <p className="text-muted-foreground">
                      Single Selling Proposition repetida 3x para fixação.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      DUNFORD (Positioning)
                    </Badge>
                    <p className="text-muted-foreground">
                      Quadro comparativo de alternativas competitivas.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HORMOZI (Value Equation)
                    </Badge>
                    <p className="text-muted-foreground">
                      Minimizar esforço e tempo em cada passo do plano.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ
                    </Badge>
                    <p className="text-muted-foreground">
                      Admissão danosa aumenta credibilidade; Objeções tratadas ANTES do preço.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- 3. CAPTURA (LEAD MAGNET) --- */}
        <TabsContent value="capture" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="Página de Captura (Squeeze Page)" language="bash">
                {`# HEADLINE
[RESULTADO ESPECÍFICO] em [TEMPO]

## SUB-HEADLINE
O guia [gratuito/completo] de [X] páginas para [avatar específico]

---
[Imagem do ebook/mockup]
---

## REASON-WHY GRATUITO (Hopkins)
"Por que estou dando isso de graça?"
[Razão lógica - ex: "Porque depois de ajudar X pessoas, percebi que muitos travavam aqui."]

## DENTRO DESTE [EBOOK/GUIA], VOCÊ VAI DESCOBRIR:
✓ Como [resultado específico] para que [pessoas importantes] [reação desejada]
✓ O erro #1 que [avatar] comete e que [consequência negativa] — e como evitar
✓ A técnica de [X] minutos que [resultado] sem [objeção comum]
✓ Por que [crença comum] está errada e o que fazer em vez disso
✓ **BÔNUS:** [Benefício extra inesperado que aumenta percepção de valor]

## PARA QUEM É ESTE MATERIAL:
- [Avatar descrição 1 - com dor específica]
- [Avatar descrição 2 - com situação específica]

## PARA QUEM NÃO É:
- [Anti-avatar 1 - filtra curiosos]
- [Anti-avatar 2 - aumenta percepção de valor]
- Quem busca [resultado] sem [esforço mínimo necessário]

## [FORMULÁRIO]
**Nome:** | **Email:** | **WhatsApp:** (opcional)
**[BOTÃO: "QUERO MEU EBOOK GRÁTIS"]**

### +[X.XXX] pessoas já baixaram
[Logos de empresas ou fotos de avatares]

**100% Gratuito | Acesso Imediato | Sem Spam**`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ
                    </Badge>
                    <p className="text-muted-foreground">
                      Topo de funil - consciência Problem Aware → Solution Aware.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HOPKINS
                    </Badge>
                    <p className="text-muted-foreground">
                      Reason-why gratuito (justificativa lógica) aumenta credibilidade.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ Nível 5
                    </Badge>
                    <p className="text-muted-foreground">
                      Anti-avatar aumenta identificação tribal ("isso é para mim, não para eles").
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- 4. VSL (VIDEO SALES LETTER) --- */}
        <TabsContent value="vsl" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="VSL Page (Vídeo de Vendas)" language="bash">
                {`# HEADLINE CURIOSIDADE/CHOQUE
[Afirmação contraintuitiva ou revelação chocante]

## SUB-HEADLINE
[Promessa de revelação no vídeo - cria loop aberto]

---
## [PLAYER DE VÍDEO]
[Thumbnail com: Rosto emotivo + Texto curto chocante + Elemento visual]
[Duração: XX:XX]
---

*Assista até o final para descobrir [gancho específico que só aparece no fim]*

## TIMESTAMPS (Abaixo do Vídeo - Otimizado)
- [00:00] - O erro #1 que [resultado negativo]
- [XX:XX] - Por que [crença comum] está destruindo seu [área]
- [XX:XX] - A descoberta acidental que mudou tudo
- [XX:XX] - O que fazer agora (passo a passo)
*(NÃO revele a solução ou o método nos timestamps!)*

---
## [SEÇÃO ABAIXO DO VÍDEO - DELAYED]
### Pronto para [resultado]?
**[BOTÃO CTA]**

### Quem é [Nome do Apresentador]
[Mini bio com credenciais quantificadas]
[Foto]

### Depoimentos rápidos:
> "[Resultado curto + timeline]" - [Nome]
> "[Resultado curto + timeline]" - [Nome]

**[BOTÃO CTA FINAL]**
[Elemento de urgência com justificativa]`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ
                    </Badge>
                    <p className="text-muted-foreground">
                      Mistério é o motor da VSL. Loop aberto na headline.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      GEORGI
                    </Badge>
                    <p className="text-muted-foreground">
                      Pattern interrupt visual obrigatório na thumbnail.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- 5. WEBINAR --- */}
        <TabsContent value="webinar" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="Registro de Webinário (Event)" language="bash">
                {`## FRAME DE MERCADO (Dunford)
"Este NÃO é mais um webinário sobre [categoria saturada].
É o primeiro [NOME DE NOVA CATEGORIA] para [avatar específico]."

# WEBINÁRIO GRATUITO
## [Resultado específico] em [tempo] usando [método único]

### 📅 [Data] às [Hora] | ⏱️ Duração: [X] min | 💻 100% Online

## [FORMULÁRIO DE REGISTRO]
**Nome** | **Email** | **WhatsApp**
**[BOTÃO: "GARANTIR MINHA VAGA GRATUITA"]**

---
## O QUE VOCÊ VAI APRENDER:
✓ [Aprendizado 1 - resultado específico]
✓ [Aprendizado 2 - resultado específico]
✓ BÔNUS: [Aprendizado surpresa para quem ficar até o final]

## PARA QUEM É (Tribal):
- Você já tentou [X, Y] e sabe que algo está faltando
- Você se identifica como [identidade tribal] — não [anti-identidade]
- Você quer [resultado] mas não quer [sacrifício inaceitável]

## QUEM VAI APRESENTAR:
[Nome] - [Credenciais quantificadas: Clientes, Anos, Resultados]

## PROVA SOCIAL:
"[Feedback específico sobre conteúdo + resultado]" - [Nome]

## VAGAS LIMITADAS (Hormozi)
Limitado a [X] participantes porque:
(1) [Razão técnica real]
(2) [Razão de qualidade/interação]
**[X] vagas restantes**

**[BOTÃO CTA FINAL]**

## FAQ RÁPIDO:
"Vai ficar gravado?" -> [Incentivo ao ao vivo]
"Precisa pagar?" -> 100% gratuito. Zero pegadinhas.`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      DUNFORD
                    </Badge>
                    <p className="text-muted-foreground">
                      Criar categoria nova antes de apresentar conteúdo (New Category Framing).
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      SCHWARTZ Nível 5
                    </Badge>
                    <p className="text-muted-foreground">
                      Identificação tribal para mercado sofisticado.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HORMOZI
                    </Badge>
                    <p className="text-muted-foreground">Escassez genuína com razão técnica.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- 6. THANK YOU --- */}
        <TabsContent value="thankyou" className="animate-fade-in space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CodeBlock title="Página de Obrigado / Confirmação" language="bash">
                {`## ✅ Seu [cadastro/compra] foi confirmado!

---
## PRÓXIMOS PASSOS:
1️⃣ [Ação imediata - ex: Checar email/spam]
2️⃣ [Ação de preparação - ex: Anotar dúvidas]
3️⃣ [Ação de engajamento - ex: Grupo VIP]

---
## MICRO-COMPROMISSO (Hormozi)
### Antes de sair, me diga:
[Pergunta que gera micro-compromisso público]
Ex: "Qual é o maior desafio que você espera resolver com [produto]?"
[Campo de texto]
**[BOTÃO: "ENVIAR RESPOSTA"]**

---
## IMPORTANTE: Não perca esta oportunidade (Upsell)
### Enquanto você espera...
[Oferta de upsell relevante OU conteúdo de aquecimento]
Ex: "Garanta [bônus exclusivo] com 50% OFF apenas para quem acabou de se cadastrar"
**[BOTÃO CTA SECUNDÁRIO]**

---
## ENQUANTO ISSO, ASSISTA:
[Vídeo de aquecimento/preparação - 5-10 minutos]
- "3 coisas para fazer antes do webinário"
- "O erro #1 que você NÃO pode cometer"

---
## DÚVIDAS?
[Email/WhatsApp de suporte]`}
              </CodeBlock>
            </div>
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="lightbulb-on" /> Princípios Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HORMOZI
                    </Badge>
                    <p className="text-muted-foreground">
                      Real estate desperdiçado = oportunidade perdida.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      HORMOZI
                    </Badge>
                    <p className="text-muted-foreground">
                      Micro-compromisso público aumenta show-up/consumo.
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-1">
                      UPSALE
                    </Badge>
                    <p className="text-muted-foreground">
                      Melhor momento para upsell é imediatamente após o "Sim".
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* --- CHECKLIST --- */}
        <TabsContent value="checklist" className="animate-fade-in space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Checklist de Validação Científica</CardTitle>
              <CardDescription>Passe cada página por este crivo antes de publicar.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Metodologia</TableHead>
                    <TableHead>Critério de Validação</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">HOPKINS</TableCell>
                    <TableCell>Headline tem número/dado específico e mensurável?</TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">REEVES</TableCell>
                    <TableCell>USP aparece pelo menos 3x (início, meio, fim)?</TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">SCHWARTZ</TableCell>
                    <TableCell>
                      Nível de sofisticação identificado e objeções inoculadas antes do preço?
                    </TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">HORMOZI</TableCell>
                    <TableCell>
                      Time Delay e Effort & Sacrifice minimizados explicitamente?
                    </TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">GEORGI</TableCell>
                    <TableCell>Inimigo (UMP) e Mecanismo (UMS) nomeados?</TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">DUNFORD</TableCell>
                    <TableCell>Alternativas competitivas desqualificadas logicamente?</TableCell>
                    <TableCell className="text-right">
                      <Icon name="check-circle" className="inline text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-dashed bg-muted/10">
              <CardHeader>
                <CardTitle className="text-base">Fórmulas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-mono text-sm">
                <div className="space-y-1">
                  <span className="font-sans text-xs font-bold uppercase text-muted-foreground">
                    Headline Hopkins
                  </span>
                  <div className="rounded border bg-card p-2">
                    [Avatar] [verbo de descoberta] [mecanismo] que [resultado + número] em [tempo]
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-xs font-bold uppercase text-muted-foreground">
                    Bullet Hormozi
                  </span>
                  <div className="rounded border bg-card p-2">
                    Como [resultado específico] para que [pessoas importantes] [reação desejada]
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-xs font-bold uppercase text-muted-foreground">
                    Depoimento
                  </span>
                  <div className="rounded border bg-card p-2">
                    "[Resultado] + [timeline exata] + [emoção]" - [Nome]
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed bg-muted/10">
              <CardHeader>
                <CardTitle className="text-base">Ordem de Implementação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    1
                  </span>{' '}
                  <strong>Página de Vendas Long Form</strong> — Fundação
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    2
                  </span>{' '}
                  <strong>Página de Captura</strong> — Topo de funil
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    3
                  </span>{' '}
                  <strong>Advertorial</strong> — Tráfego frio
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    4
                  </span>{' '}
                  VSL — Versão em vídeo da PV
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    5
                  </span>{' '}
                  Webinário — Leads aquecidos
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    6
                  </span>{' '}
                  Obrigado — Otimização final
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingTemplatesPage;
