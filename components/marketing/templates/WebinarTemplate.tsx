import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const WebinarTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="flex min-h-screen animate-fade-in flex-col bg-background font-sans">
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left Column: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs font-bold uppercase tracking-widest"
                >
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                  Webinário Gratuito & Ao Vivo
                </Badge>
                <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
                  Como construir uma <span className="text-primary">Máquina de Vendas com IA</span>{' '}
                  em 30 dias.
                </h1>
                <p className="font-serif text-xl leading-relaxed text-muted-foreground">
                  Descubra o método passo-a-passo para automatizar sua prospecção e triplicar suas
                  reuniões qualificadas sem gastar mais com anúncios.
                </p>
              </div>

              <div className="space-y-6 border-t border-border/50 pt-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="check" size="size-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Os 3 Agentes de Vendas Essenciais</h4>
                    <p className="font-serif text-sm text-muted-foreground">
                      Quais bots você precisa configurar primeiro.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="check" size="size-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Scripts de Alta Conversão</h4>
                    <p className="font-serif text-sm text-muted-foreground">
                      Copie e cole nossos prompts validados.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="check" size="size-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Integração No-Code</h4>
                    <p className="font-serif text-sm text-muted-foreground">
                      Como conectar tudo sem saber programar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Presenter */}
              <div className="flex items-center gap-4 pt-4">
                <Avatar className="h-14 w-14 border-2 border-background shadow-lg">
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Seu Mentor
                  </p>
                  <p className="font-bold text-foreground">Alan Nicolas</p>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Card */}
            <div className="lg:pl-12">
              <Card className="relative overflow-hidden border-t-4 border-t-primary shadow-2xl">
                <CardHeader className="space-y-4 pb-2 text-center">
                  <div className="mx-auto mb-2 inline-block rounded-full bg-muted px-4 py-1 font-mono text-xs font-bold">
                    📅 24 de Outubro às 20:00h
                  </div>
                  <CardTitle className="text-2xl">Reserve seu lugar</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Preencha abaixo para receber o link de acesso exclusivo.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <Icon
                          name="user"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
                          size="size-4"
                        />
                        <Input id="name" placeholder="Seu nome" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Melhor Email</Label>
                      <div className="relative">
                        <Icon
                          name="envelope"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
                          size="size-4"
                        />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                      <div className="relative">
                        <Icon
                          name="whatsapp"
                          type="brands"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50"
                          size="size-4"
                        />
                        <Input id="whatsapp" placeholder="(XX) 9XXXX-XXXX" className="pl-10" />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="mt-2 h-14 w-full text-base font-bold uppercase tracking-wide shadow-lg"
                    >
                      Garantir Minha Vaga Gratuita
                    </Button>
                  </form>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-muted-foreground">
                    <Icon name="lock" size="size-3" /> Seus dados estão seguros. Sem spam.
                  </div>

                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center">
                    <p className="flex items-center justify-center gap-2 text-xs font-bold text-destructive">
                      <Icon name="users-alt" size="size-3" /> Apenas 42 vagas restantes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Strip */}
      <div className="border-t border-border bg-muted/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Empresas que já usam nosso método
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale md:gap-16">
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon name="google" type="brands" /> Google
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon name="microsoft" type="brands" /> Microsoft
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon name="spotify" type="brands" /> Spotify
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon name="amazon" type="brands" /> Amazon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarTemplate;
