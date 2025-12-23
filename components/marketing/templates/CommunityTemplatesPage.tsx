import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Icon } from '../../ui/icon';
import { Symbol } from '../../ui/symbol';
import { CodeBlock } from '../../ui/code-block';
import { Separator } from '../../ui/separator';

const CommunityTemplatesPage: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-12 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute right-0 top-0 p-12 opacity-5">
          <Icon name="users-alt" className="rotate-12 text-[12rem]" />
        </div>
        <div className="relative z-10 space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/50 text-primary backdrop-blur-sm"
            >
              Comunidade v1.0
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">Assets de Engajamento</span>
          </div>
          <h2 className="max-w-4xl font-sans text-4xl font-bold tracking-tight md:text-6xl">
            Comunidade <span className="text-primary">Lendária</span>.
          </h2>
          <p className="max-w-3xl font-serif text-xl leading-relaxed text-muted-foreground">
            Sequências de comunicação, roteiros de onboarding e materiais de suporte para nutrir e
            engajar sua tribo.
          </p>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="webinar_seq" className="w-full">
        <TabsList className="mb-8 h-auto w-full flex-wrap justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="webinar_seq"
            className="rounded-b-none rounded-t-lg border-b-2 border-transparent px-6 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/50"
          >
            <Icon name="envelope" className="mr-2 size-4" /> Sequência de Emails (Webinário)
          </TabsTrigger>
          {/* Future tabs can be added here */}
        </TabsList>

        {/* --- EMAILS WEBINAR --- */}
        <TabsContent value="webinar_seq" className="animate-fade-in space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-sans text-2xl font-bold">Campanha de Show-up</h3>
              <p className="font-serif text-muted-foreground">
                Emails focados em maximizar a taxa de comparecimento ao vivo.
              </p>
            </div>
            <Badge variant="outline">4 Emails</Badge>
          </div>

          <div className="relative grid gap-8">
            {/* Visual Connector Line */}
            <div className="absolute bottom-8 left-6 top-8 -z-10 hidden w-0.5 bg-border md:block"></div>

            {/* Email 1 */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="hidden flex-col items-center md:flex">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-primary shadow-sm">
                  1
                </div>
              </div>
              <Card className="flex-1 border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge className="mb-2 bg-primary text-primary-foreground">Imediato</Badge>
                    <span className="font-mono text-xs text-muted-foreground">Confirmação</span>
                  </div>
                  <CardTitle className="text-lg">Inscrição Confirmada</CardTitle>
                  <CardDescription>Enviado imediatamente após o cadastro.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded border border-border/50 bg-background/50 p-3 text-sm">
                    <span className="font-bold text-muted-foreground">Assunto:</span> [CONFIRMADO]
                    Sua vaga para a aula de [DATA]
                  </div>
                  <CodeBlock language="text" className="bg-background">
                    {`Fala, [NOME].

Sua vaga está garantida.

📅 [DATA] às 20h
💻 Link: [LINK]

Antes da aula, faça isso:

1. Adicione na agenda (link abaixo)
2. Entre no grupo do WhatsApp (link abaixo)
3. Assista o vídeo de preparação (5 min)

[BOTÕES]

Nos vemos ao vivo.

— Alan

P.S. Se você tem 35-55 anos e experiência profissional sólida, esta aula foi feita para você. Não é mais um tutorial de ChatGPT. É sistema + comunidade + execução.`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>

            {/* Email 2 */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="hidden flex-col items-center md:flex">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background font-bold text-muted-foreground shadow-sm">
                  2
                </div>
              </div>
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="mb-2">
                      Falta 1 Hora
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">Aquecimento</span>
                  </div>
                  <CardTitle className="text-lg">Antecipação & Loop</CardTitle>
                  <CardDescription>Abre um loop de curiosidade sobre o conteúdo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded border border-border/50 bg-muted/20 p-3 text-sm">
                    <span className="font-bold text-muted-foreground">Assunto:</span> Começamos em
                    60 minutos ⏰
                  </div>
                  <CodeBlock language="text">
                    {`[NOME],

Em 1 hora, vou revelar o sistema "Segundo Cérebro" que profissionais experientes estão usando para finalmente sair do loop de aprender sem executar.

O que você vai descobrir:

- Por que sua experiência é vantagem (não desvantagem)
- O sistema de 3 camadas que libera sua mente
- Como 98% dos membros ficam nas primeiras 48 horas

📅 Hoje às 20h
💻 Link: [LINK]

Separe papel e caneta. Vai querer anotar.

— Alan`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>

            {/* Email 3 */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="hidden flex-col items-center md:flex">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-red bg-background font-bold text-brand-red shadow-sm">
                  3
                </div>
              </div>
              <Card className="flex-1 border-brand-red/20 bg-brand-red/5">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="destructive" className="mb-2">
                      Faltam 15 Min
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">Chamada Final</span>
                  </div>
                  <CardTitle className="text-lg">Entrando ao Vivo</CardTitle>
                  <CardDescription>Email curto e direto com o link.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded border border-border/50 bg-background/50 p-3 text-sm">
                    <span className="font-bold text-muted-foreground">Assunto:</span> 🔴 AO VIVO em
                    15 minutos
                  </div>
                  <CodeBlock language="text" className="bg-background">
                    {`[NOME],

Estamos entrando ao vivo em 15 minutos.

[LINK DIRETO]

Clique. Entre. Desligue as distrações.

O que você vai aprender hoje pode mudar os próximos 12 meses da sua vida profissional.

Te vejo do outro lado.

— Alan`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>

            {/* Email 4 */}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="hidden flex-col items-center md:flex">
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background font-bold text-muted-foreground shadow-sm">
                  4
                </div>
              </div>
              <Card className="flex-1 opacity-90">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="mb-2">
                      Pós-Aula
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">Replay</span>
                  </div>
                  <CardTitle className="text-lg">Perdeu a Aula?</CardTitle>
                  <CardDescription>Recuperação de leads que não compareceram.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded border border-border/50 bg-muted/20 p-3 text-sm">
                    <span className="font-bold text-muted-foreground">Assunto:</span> Você perdeu,
                    mas ainda dá tempo...
                  </div>
                  <CodeBlock language="text">
                    {`[NOME],

Sei que a vida acontece.

Você perdeu a aula ao vivo de ontem. Mas a gravação está disponível por mais 48 horas.

[ASSISTIR GRAVAÇÃO]

O que foi revelado:

- Sistema "Segundo Cérebro com IA"
- Por que profissionais de 40+ estão prosperando
- Como sair do loop "aprender sem executar"

Assista agora. Depois não tem replay.

— Alan

P.S. Se você tem 35-55 anos e está cansado de cursos que não levam a lugar nenhum, essa gravação é obrigatória.`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityTemplatesPage;
