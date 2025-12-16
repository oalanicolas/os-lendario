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
  const alanAvatar = "https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj";

  return (
    <div className="min-h-screen bg-background font-sans animate-fade-in flex flex-col">
      
      <main className="flex-1">
          <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left Column: Copy */}
                  <div className="space-y-8">
                      <div className="space-y-4">
                          <Badge variant="secondary" className="uppercase tracking-widest text-xs font-bold px-3 py-1">
                              <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                              Webinário Gratuito & Ao Vivo
                          </Badge>
                          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                              Como construir uma <span className="text-primary">Máquina de Vendas com IA</span> em 30 dias.
                          </h1>
                          <p className="text-xl text-muted-foreground font-serif leading-relaxed">
                              Descubra o método passo-a-passo para automatizar sua prospecção e triplicar suas reuniões qualificadas sem gastar mais com anúncios.
                          </p>
                      </div>

                      <div className="space-y-6 pt-4 border-t border-border/50">
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                  <Icon name="check" size="size-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Os 3 Agentes de Vendas Essenciais</h4>
                                  <p className="text-sm text-muted-foreground font-serif">Quais bots você precisa configurar primeiro.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                  <Icon name="check" size="size-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Scripts de Alta Conversão</h4>
                                  <p className="text-sm text-muted-foreground font-serif">Copie e cole nossos prompts validados.</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                  <Icon name="check" size="size-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Integração No-Code</h4>
                                  <p className="text-sm text-muted-foreground font-serif">Como conectar tudo sem saber programar.</p>
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
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Seu Mentor</p>
                              <p className="font-bold text-foreground">Alan Nicolas</p>
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Registration Card */}
                  <div className="lg:pl-12">
                      <Card className="border-t-4 border-t-primary shadow-2xl relative overflow-hidden">
                          <CardHeader className="text-center space-y-4 pb-2">
                              <div className="inline-block bg-muted px-4 py-1 rounded-full text-xs font-mono font-bold mx-auto mb-2">
                                  📅 24 de Outubro às 20:00h
                              </div>
                              <CardTitle className="text-2xl">Reserve seu lugar</CardTitle>
                              <p className="text-sm text-muted-foreground">Preencha abaixo para receber o link de acesso exclusivo.</p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                  <div className="space-y-2">
                                      <Label htmlFor="name">Nome Completo</Label>
                                      <div className="relative">
                                          <Icon name="user" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                                          <Input id="name" placeholder="Seu nome" className="pl-10" />
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="email">Melhor Email</Label>
                                      <div className="relative">
                                          <Icon name="envelope" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                                          <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                                      <div className="relative">
                                          <Icon name="whatsapp" type="brands" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size="size-4" />
                                          <Input id="whatsapp" placeholder="(XX) 9XXXX-XXXX" className="pl-10" />
                                      </div>
                                  </div>
                                  
                                  <Button size="lg" className="w-full h-14 text-base font-bold uppercase tracking-wide shadow-lg mt-2">
                                      Garantir Minha Vaga Gratuita
                                  </Button>
                              </form>
                              
                              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-2">
                                  <Icon name="lock" size="size-3" /> Seus dados estão seguros. Sem spam.
                              </div>

                              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-center">
                                  <p className="text-xs font-bold text-destructive flex items-center justify-center gap-2">
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
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Empresas que já usam nosso método</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
                  <span className="text-xl font-bold flex gap-2 items-center"><Icon name="google" type="brands" /> Google</span>
                  <span className="text-xl font-bold flex gap-2 items-center"><Icon name="microsoft" type="brands" /> Microsoft</span>
                  <span className="text-xl font-bold flex gap-2 items-center"><Icon name="spotify" type="brands" /> Spotify</span>
                  <span className="text-xl font-bold flex gap-2 items-center"><Icon name="amazon" type="brands" /> Amazon</span>
              </div>
          </div>
      </div>

    </div>
  );
};

export default WebinarTemplate;