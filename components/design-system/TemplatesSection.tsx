import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Icon } from '../ui/icon';
import { Symbol } from '../ui/symbol';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Toggle } from '../ui/toggle';
import { StreamingText } from '../ui/streaming-text';

const TemplatesSection: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Templates & Layouts</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Composições completas demonstrando a aplicação real do Design System.
        </p>
      </div>

      <Tabs defaultValue="auth" className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <TabsList className="h-auto rounded-lg bg-muted/50 p-1">
            <TabsTrigger value="auth" className="px-4 py-2">
              Autenticação
            </TabsTrigger>
            <TabsTrigger value="chat" className="px-4 py-2">
              Interface Chat (Lendário GPT)
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- AUTHENTICATION TEMPLATE --- */}
        <TabsContent value="auth">
          <div className="relative flex h-[700px] w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl lg:flex-row">
            {/* Visual Side (Left) */}
            <div className="relative flex w-full flex-col justify-between overflow-hidden bg-zinc-900 p-12 text-white lg:w-1/2">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

              <div className="relative z-10 flex items-center gap-2">
                <Symbol name="infinity" className="text-2xl text-white" />
                <span className="font-sans text-lg font-bold tracking-tight">
                  Academia Lendár[IA]
                </span>
              </div>

              <div className="relative z-10 space-y-6">
                <h1 className="font-sans text-4xl font-bold leading-tight md:text-5xl">
                  Imortalize seu legado com inteligência artificial.
                </h1>
                <p className="font-serif text-lg text-zinc-300">
                  Junte-se a líderes que usam IA para escalar resultados e liberar tempo para o que
                  realmente importa.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 text-sm text-zinc-400">
                <span>&copy; 2025 The Legends & Co.</span>
              </div>
            </div>

            {/* Form Side (Right) */}
            <div className="flex w-full flex-col justify-center bg-card p-8 md:p-12 lg:w-1/2 lg:p-24">
              <div className="mx-auto w-full max-w-sm space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="font-sans text-2xl font-bold">Acesse sua conta</h2>
                  <p className="text-sm text-muted-foreground">
                    Entre com suas credenciais para continuar.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="nome@exemplo.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Button variant="link" className="h-auto px-0 text-xs">
                        Esqueceu a senha?
                      </Button>
                    </div>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full" size="lg">
                    Entrar na Plataforma
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Icon name="google" type="brands" className="mr-2" /> Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Icon name="apple" type="brands" className="mr-2" /> Apple
                  </Button>
                </div>

                <p className="px-8 text-center text-sm text-muted-foreground">
                  Ao clicar em continuar, você concorda com nossos{' '}
                  <a href="#" className="underline hover:text-primary">
                    Termos de Serviço
                  </a>{' '}
                  e{' '}
                  <a href="#" className="underline hover:text-primary">
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- CHAT INTERFACE TEMPLATE --- */}
        <TabsContent value="chat">
          <div className="flex h-[700px] w-full overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            {/* Sidebar (Chat History) */}
            <div className="hidden w-64 flex-col border-r border-border bg-muted/20 md:flex">
              <div className="border-b border-border p-4">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Icon name="plus" size="size-4" /> Novo Chat
                </Button>
              </div>

              <ScrollArea className="flex-1 px-3 py-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Hoje
                    </h4>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start truncate bg-accent/50 text-sm font-normal text-accent-foreground"
                      >
                        Estratégia de Marketing Q3
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start truncate text-sm font-normal"
                      >
                        Ideias para Youtube
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Ontem
                    </h4>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start truncate text-sm font-normal"
                      >
                        Revisão de Copy de Vendas
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start truncate text-sm font-normal"
                      >
                        Análise de Dados CSV
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start truncate text-sm font-normal"
                      >
                        Tradução PT-EN
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="border-t border-border p-4">
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-bold">Alan Nicolas</span>
                    <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col bg-card">
              {/* Header */}
              <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/50 px-6 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold">Lendário GPT 4.0</span>
                  <Badge
                    variant="outline"
                    className="h-5 border-primary/50 bg-primary/5 text-[10px] text-primary"
                  >
                    Beta
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="share" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="settings" />
                  </Button>
                </div>
              </header>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-6">
                <div className="mx-auto max-w-3xl space-y-8">
                  {/* User Message */}
                  <div className="flex flex-row-reverse gap-4">
                    <Avatar className="mt-1 h-8 w-8">
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-muted px-5 py-3 text-foreground">
                      <p className="text-sm">
                        Crie uma estrutura de landing page focada em conversão para um curso de IA
                        Generativa.
                      </p>
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Symbol name="infinity" className="text-sm" />
                    </div>
                    <div className="max-w-[90%] space-y-4">
                      <div className="prose dark:prose-invert font-serif text-sm leading-relaxed text-muted-foreground">
                        <div className="mb-4">
                          <StreamingText
                            text="Com certeza. Para uma landing page de alta conversão no nicho de IA, precisamos focar em autoridade e clareza. Aqui está uma estrutura sugerida:"
                            speed={15}
                          />
                        </div>

                        <div className="my-4 overflow-hidden rounded-lg border border-border bg-background">
                          <div className="border-b border-border bg-muted/50 px-4 py-2 font-mono text-xs font-bold text-muted-foreground">
                            Estrutura da LP
                          </div>
                          <div className="space-y-2 p-4 font-mono text-xs">
                            <p>1. HERO SECTION: Headline Forte + VSL + CTA</p>
                            <p>2. PROBLEMA: "Você vai ser substituído?"</p>
                            <p>3. SOLUÇÃO: O método "Lendário AI"</p>
                            <p>4. AUTORIDADE: Quem é o professor?</p>
                            <p>5. PROVA SOCIAL: Depoimentos</p>
                            <p>6. GARANTIA & FAQ</p>
                          </div>
                        </div>

                        <p>Gostaria que eu detalhasse a copy da Hero Section?</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Icon name="copy" className="mr-2 size-3" /> Copiar
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Icon name="refresh" className="mr-2 size-3" /> Regenerar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* User Message 2 */}
                  <div className="flex flex-row-reverse gap-4">
                    <Avatar className="mt-1 h-8 w-8">
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-muted px-5 py-3 text-foreground">
                      <p className="text-sm">Sim, por favor. Use um tom "Rebelde" e inspirador.</p>
                    </div>
                  </div>

                  {/* AI Thinking */}
                  <div className="flex gap-4 opacity-70">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                      <Symbol name="infinity" className="animate-pulse text-sm" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: '0s' }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: '0.2s' }}
                      ></span>
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: '0.4s' }}
                      ></span>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-border bg-background p-4">
                <div className="relative mx-auto max-w-3xl">
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="clip" />
                    </Button>
                  </div>
                  <textarea
                    className="max-h-[200px] min-h-[50px] w-full resize-none rounded-xl border border-input bg-muted/30 py-3 pl-12 pr-12 text-sm transition-all focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Envie uma mensagem para a IA..."
                    rows={1}
                  />
                  <div className="absolute right-2 top-2">
                    <Button size="icon" className="h-8 w-8 rounded-lg">
                      <Icon name="arrow-right" size="size-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-center text-[10px] text-muted-foreground opacity-70">
                  A IA pode cometer erros. Considere verificar informações importantes.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* --- EXTRAS: TOGGLE & SEPARATOR SHOWCASE --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 border-b border-border pb-2 font-sans text-2xl font-semibold">
          Componentes Utilitários
        </h3>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Toggle & Formatting</CardTitle>
              <CardDescription>Botões de estado para editores ou filtros.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <div className="flex gap-1 rounded-md border border-border p-1">
                <Toggle aria-label="Toggle bold">
                  <Icon name="bold" size="size-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic">
                  <Icon name="italic" size="size-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <Icon name="underline" size="size-4" />
                </Toggle>
              </div>
              <div className="flex gap-2">
                <Toggle variant="outline" aria-label="Toggle bookmark">
                  <Icon name="bookmark" className="mr-2 size-4" /> Salvar
                </Toggle>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Separators</CardTitle>
              <CardDescription>Divisores de conteúdo semânticos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                <p className="text-sm text-muted-foreground">
                  An open-source UI component library.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TemplatesSection;
