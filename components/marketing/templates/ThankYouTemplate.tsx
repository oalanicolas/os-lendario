import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Separator } from '../../ui/separator';

const ThankYouTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-background font-sans animate-fade-in flex flex-col items-center py-12 px-4">
      
      <div className="max-w-3xl w-full space-y-12">
          
          {/* Success Header */}
          <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                  <Icon name="check" size="size-10" />
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Parabéns! Sua vaga está garantida.
              </h1>
              <p className="text-xl text-muted-foreground font-serif">
                  Enviamos os detalhes de acesso para o seu email.
              </p>
          </div>

          {/* Next Steps */}
          <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center space-y-3 pt-8">
                      <div className="text-4xl font-bold text-primary opacity-20">01</div>
                      <h4 className="font-bold text-lg">Verifique seu Email</h4>
                      <p className="text-sm text-muted-foreground font-serif">Procure por "Academia Lendária" na sua caixa de entrada.</p>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-6 text-center space-y-3 pt-8">
                      <div className="text-4xl font-bold text-muted-foreground opacity-20">02</div>
                      <h4 className="font-bold text-lg">Entre no Grupo</h4>
                      <p className="text-sm text-muted-foreground font-serif">Receba avisos importantes no nosso grupo VIP de WhatsApp.</p>
                      <Button variant="outline" size="sm" className="w-full mt-2">Entrar no Grupo</Button>
                  </CardContent>
              </Card>
              <Card>
                  <CardContent className="p-6 text-center space-y-3 pt-8">
                      <div className="text-4xl font-bold text-muted-foreground opacity-20">03</div>
                      <h4 className="font-bold text-lg">Adicione à Agenda</h4>
                      <p className="text-sm text-muted-foreground font-serif">Bloqueie o horário para não perder o conteúdo ao vivo.</p>
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">Adicionar ao Calendar</Button>
                  </CardContent>
              </Card>
          </div>

          {/* OTO (One Time Offer) / Upsell Section */}
          <div className="relative border-2 border-dashed border-destructive/30 bg-destructive/5 rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-bl-lg">
                  Oferta Única - Não feche essa página
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-6">
                      <h3 className="text-2xl font-bold text-destructive">Espere! Você tem um minuto?</h3>
                      <p className="font-serif text-muted-foreground leading-relaxed">
                          Como novo membro, queremos te dar a chance de acelerar seus resultados. Tenha acesso ao nosso <strong>Kit de Templates Premium</strong> com 80% de desconto.
                      </p>
                      <ul className="space-y-2 text-sm font-medium">
                          <li className="flex gap-2"><Icon name="check" className="text-destructive" /> 50+ Prompts de Vendas</li>
                          <li className="flex gap-2"><Icon name="check" className="text-destructive" /> Planilha de ROI de IA</li>
                          <li className="flex gap-2"><Icon name="check" className="text-destructive" /> Checklist de Implementação</li>
                      </ul>
                      <div className="flex items-center gap-4 pt-2">
                          <span className="text-3xl font-bold text-foreground">R$ 27</span>
                          <span className="text-sm text-muted-foreground line-through decoration-destructive">R$ 147</span>
                      </div>
                      <Button size="lg" variant="destructive" className="w-full shadow-lg">
                          Adicionar ao Pedido <Icon name="plus" className="ml-2" />
                      </Button>
                      <button className="text-xs text-muted-foreground hover:text-foreground underline decoration-dotted w-full text-center">
                          Não, obrigado. Prefiro fazer tudo do zero sozinho.
                      </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-background border border-border rounded-lg shadow-xl flex items-center justify-center relative rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div className="text-center space-y-2">
                          <Symbol name="infinity" className="text-4xl text-destructive" />
                          <p className="font-bold font-sans">KIT PREMIUM</p>
                          <p className="text-xs text-muted-foreground">Digital Download</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="text-center pt-8">
              <p className="text-xs text-muted-foreground">
                  Dúvidas? Entre em contato com nosso suporte: <a href="#" className="underline">ajuda@academialendaria.com</a>
              </p>
          </div>

      </div>

    </div>
  );
};

export default ThankYouTemplate;