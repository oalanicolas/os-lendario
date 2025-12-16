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
    <div className="space-y-12 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Icon name="users-alt" className="text-[12rem] rotate-12" />
          </div>
          <div className="relative z-10 p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/50 text-primary">Comunidade v1.0</Badge>
                  <span className="text-xs font-mono text-muted-foreground">Assets de Engajamento</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-4xl">
                Comunidade <span className="text-primary">Lendária</span>.
              </h2>
              <p className="font-serif text-xl text-muted-foreground max-w-3xl leading-relaxed">
                  Sequências de comunicação, roteiros de onboarding e materiais de suporte para nutrir e engajar sua tribo.
              </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary via-background to-primary/20"></div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="webinar_seq" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0 border-b border-border w-full justify-start rounded-none">
            <TabsTrigger value="webinar_seq" className="rounded-t-lg rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/50 px-6 py-3">
                <Icon name="envelope" className="mr-2 size-4" /> Sequência de Emails (Webinário)
            </TabsTrigger>
            {/* Future tabs can be added here */}
        </TabsList>

        {/* --- EMAILS WEBINAR --- */}
        <TabsContent value="webinar_seq" className="space-y-12 animate-fade-in">
            
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-sans">Campanha de Show-up</h3>
                    <p className="text-muted-foreground font-serif">Emails focados em maximizar a taxa de comparecimento ao vivo.</p>
                </div>
                <Badge variant="outline">4 Emails</Badge>
            </div>

            <div className="grid gap-8 relative">
                {/* Visual Connector Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border -z-10 hidden md:block"></div>

                {/* Email 1 */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary z-10 shadow-sm">1</div>
                    </div>
                    <Card className="flex-1 border-primary/20 bg-primary/5">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge className="bg-primary text-primary-foreground mb-2">Imediato</Badge>
                                <span className="text-xs font-mono text-muted-foreground">Confirmação</span>
                            </div>
                            <CardTitle className="text-lg">Inscrição Confirmada</CardTitle>
                            <CardDescription>Enviado imediatamente após o cadastro.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 p-3 bg-background/50 rounded border border-border/50 text-sm">
                                <span className="font-bold text-muted-foreground">Assunto:</span> [CONFIRMADO] Sua vaga para a aula de [DATA]
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
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-muted-foreground z-10 shadow-sm">2</div>
                    </div>
                    <Card className="flex-1">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">Falta 1 Hora</Badge>
                                <span className="text-xs font-mono text-muted-foreground">Aquecimento</span>
                            </div>
                            <CardTitle className="text-lg">Antecipação & Loop</CardTitle>
                            <CardDescription>Abre um loop de curiosidade sobre o conteúdo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 p-3 bg-muted/20 rounded border border-border/50 text-sm">
                                <span className="font-bold text-muted-foreground">Assunto:</span> Começamos em 60 minutos ⏰
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
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-brand-red flex items-center justify-center font-bold text-brand-red z-10 shadow-sm">3</div>
                    </div>
                    <Card className="flex-1 border-brand-red/20 bg-brand-red/5">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="destructive" className="mb-2">Faltam 15 Min</Badge>
                                <span className="text-xs font-mono text-muted-foreground">Chamada Final</span>
                            </div>
                            <CardTitle className="text-lg">Entrando ao Vivo</CardTitle>
                            <CardDescription>Email curto e direto com o link.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 p-3 bg-background/50 rounded border border-border/50 text-sm">
                                <span className="font-bold text-muted-foreground">Assunto:</span> 🔴 AO VIVO em 15 minutos
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
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-muted-foreground z-10 shadow-sm">4</div>
                    </div>
                    <Card className="flex-1 opacity-90">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">Pós-Aula</Badge>
                                <span className="text-xs font-mono text-muted-foreground">Replay</span>
                            </div>
                            <CardTitle className="text-lg">Perdeu a Aula?</CardTitle>
                            <CardDescription>Recuperação de leads que não compareceram.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4 p-3 bg-muted/20 rounded border border-border/50 text-sm">
                                <span className="font-bold text-muted-foreground">Assunto:</span> Você perdeu, mas ainda dá tempo...
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