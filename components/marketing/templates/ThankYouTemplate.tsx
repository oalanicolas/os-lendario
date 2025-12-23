import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Symbol } from '../../ui/symbol';
import { Separator } from '../../ui/separator';

const ThankYouTemplate: React.FC = () => {
  return (
    <div className="flex min-h-screen animate-fade-in flex-col items-center bg-background px-4 py-12 font-sans">
      <div className="w-full max-w-3xl space-y-12">
        {/* Success Header */}
        <div className="space-y-6 text-center">
          <div className="bg-success/10 text-success mx-auto mb-6 flex h-20 w-20 animate-scale-in items-center justify-center rounded-full">
            <Icon name="check" size="size-10" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Parabéns! Sua vaga está garantida.
          </h1>
          <p className="font-serif text-xl text-muted-foreground">
            Enviamos os detalhes de acesso para o seu email.
          </p>
        </div>

        {/* Next Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="space-y-3 p-6 pt-8 text-center">
              <div className="text-4xl font-bold text-primary opacity-20">01</div>
              <h4 className="text-lg font-bold">Verifique seu Email</h4>
              <p className="font-serif text-sm text-muted-foreground">
                Procure por "Academia Lendária" na sua caixa de entrada.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6 pt-8 text-center">
              <div className="text-4xl font-bold text-muted-foreground opacity-20">02</div>
              <h4 className="text-lg font-bold">Entre no Grupo</h4>
              <p className="font-serif text-sm text-muted-foreground">
                Receba avisos importantes no nosso grupo VIP de WhatsApp.
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                Entrar no Grupo
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6 pt-8 text-center">
              <div className="text-4xl font-bold text-muted-foreground opacity-20">03</div>
              <h4 className="text-lg font-bold">Adicione à Agenda</h4>
              <p className="font-serif text-sm text-muted-foreground">
                Bloqueie o horário para não perder o conteúdo ao vivo.
              </p>
              <Button variant="ghost" size="sm" className="mt-2 w-full text-xs">
                Adicionar ao Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* OTO (One Time Offer) / Upsell Section */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-destructive/30 bg-destructive/5 p-8 md:p-12">
          <div className="absolute right-0 top-0 rounded-bl-lg bg-destructive px-4 py-1 text-xs font-bold uppercase tracking-widest text-destructive-foreground">
            Oferta Única - Não feche essa página
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-destructive">Espere! Você tem um minuto?</h3>
              <p className="font-serif leading-relaxed text-muted-foreground">
                Como novo membro, queremos te dar a chance de acelerar seus resultados. Tenha acesso
                ao nosso <strong>Kit de Templates Premium</strong> com 80% de desconto.
              </p>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex gap-2">
                  <Icon name="check" className="text-destructive" /> 50+ Prompts de Vendas
                </li>
                <li className="flex gap-2">
                  <Icon name="check" className="text-destructive" /> Planilha de ROI de IA
                </li>
                <li className="flex gap-2">
                  <Icon name="check" className="text-destructive" /> Checklist de Implementação
                </li>
              </ul>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-3xl font-bold text-foreground">R$ 27</span>
                <span className="text-sm text-muted-foreground line-through decoration-destructive">
                  R$ 147
                </span>
              </div>
              <Button size="lg" variant="destructive" className="w-full shadow-lg">
                Adicionar ao Pedido <Icon name="plus" className="ml-2" />
              </Button>
              <button className="w-full text-center text-xs text-muted-foreground underline decoration-dotted hover:text-foreground">
                Não, obrigado. Prefiro fazer tudo do zero sozinho.
              </button>
            </div>
            <div className="relative flex aspect-[3/4] w-full rotate-3 items-center justify-center rounded-lg border border-border bg-background shadow-xl transition-transform duration-300 hover:rotate-0 md:w-1/3">
              <div className="space-y-2 text-center">
                <Symbol name="infinity" className="text-4xl text-destructive" />
                <p className="font-sans font-bold">KIT PREMIUM</p>
                <p className="text-xs text-muted-foreground">Digital Download</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Dúvidas? Entre em contato com nosso suporte:{' '}
            <a href="#" className="underline">
              ajuda@academialendaria.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouTemplate;
