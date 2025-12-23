import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Icon } from '../ui/icon';
import { Badge } from '../ui/badge';

const ButtonSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-16 pb-20">
      <div>
        <h2 className="mb-4 font-serif text-4xl font-light">Botões</h2>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
          Elementos de interação primária. Devem comunicar claramente a ação e seu nível de
          prioridade.
        </p>
      </div>

      {/* --- VARIANTS --- */}
      <section className="space-y-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Variantes</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">default (Primary)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button>Primary Action</Button>
              <p className="text-xs text-muted-foreground">
                Para a ação principal da página (ex: Salvar, Comprar).
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">outline (Secondary)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button variant="outline">Secondary Action</Button>
              <p className="text-xs text-muted-foreground">
                Para ações alternativas ou de menor peso.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">ghost (Tertiary)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button variant="ghost">Ghost Button</Button>
              <p className="text-xs text-muted-foreground">
                Para ações de baixa prioridade ou em toolbars.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">destructive</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button variant="destructive">Delete Item</Button>
              <p className="text-xs text-muted-foreground">Ações irreversíveis ou de perigo.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">link</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button variant="link">Read More</Button>
              <p className="text-xs text-muted-foreground">
                Aparência de link, comportamento de botão.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">secondary (Muted)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
              <Button variant="secondary">Muted Action</Button>
              <p className="text-xs text-muted-foreground">Alternativa suave ao outline.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SIZES --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Tamanhos</h3>
        <div className="flex flex-wrap items-end gap-6 rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center gap-2">
            <Button size="sm">Small (sm)</Button>
            <span className="font-mono text-xs text-muted-foreground">h-9 px-3</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="default">Default</Button>
            <span className="font-mono text-xs text-muted-foreground">h-10 px-4</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg">Large (lg)</Button>
            <span className="font-mono text-xs text-muted-foreground">h-12 px-8</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="icon">
              <Icon name="plus" />
            </Button>
            <span className="font-mono text-xs text-muted-foreground">icon (h-10 w-10)</span>
          </div>
        </div>
      </section>

      {/* --- ICONS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Com Ícones</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Icon name="rocket" className="mr-2" size="size-4" />
            Left Icon
          </Button>
          <Button variant="outline">
            Right Icon
            <Icon name="arrow-right" className="ml-2" size="size-4" />
          </Button>
          <Button variant="destructive">
            <Icon name="trash" className="mr-2" size="size-4" />
            Delete
          </Button>
          <Button variant="ghost">
            <Icon name="settings" className="mr-2" size="size-4" />
            Settings
          </Button>
        </div>
      </section>

      {/* --- SPECIAL EFFECTS --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">
          Efeitos Especiais (Lendários)
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border-zinc-800 bg-zinc-950 text-white">
            <CardHeader>
              <CardTitle className="text-white">variant="glowing"</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-8">
              <Button variant="glowing" size="lg">
                <Icon name="bolt" className="mr-2" />
                Ação Lendária
              </Button>
              <p className="font-serif text-xs text-zinc-500">
                Sombra colorida suave para alta conversão em fundo escuro.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shimmer (Default Hover)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-8">
              <Button size="lg">Passe o Mouse</Button>
              <p className="font-serif text-xs text-muted-foreground">
                O botão padrão possui um efeito "liquid shimmer" no hover para feedback tátil
                visual.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- STATES (LOADING/DISABLED) --- */}
      <section className="space-y-8 border-t border-border pt-8">
        <h3 className="border-b border-border pb-2 font-sans text-xl font-semibold">Estados</h3>
        <div className="flex flex-wrap items-center gap-8 rounded-xl bg-muted/20 p-8">
          <div className="flex flex-col items-center gap-3">
            <Button disabled>Disabled</Button>
            <span className="text-xs text-muted-foreground">Opacity 50%</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button disabled>
              <Icon name="spinner" className="mr-2 animate-spin" size="size-4" />
              Processing
            </Button>
            <span className="text-xs text-muted-foreground">Loading State</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button onClick={toggleLoading} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="spinner" className="mr-2 animate-spin" size="size-4" /> Salvando...
                </>
              ) : (
                'Clique para Carregar'
              )}
            </Button>
            <span className="text-xs text-muted-foreground">Interactive Test</span>
          </div>
        </div>
      </section>

      {/* --- GUIDELINES --- */}
      <section className="space-y-8 border-t border-border pt-12">
        <h3 className="flex items-center gap-2 font-sans text-2xl font-semibold">
          <Icon name="check-circle" /> Diretrizes de Uso
        </h3>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-brand-green/20 bg-brand-green/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-green">
                <Icon name="check" /> O que fazer (Do)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Hierarquia Visual</span>
                <p className="text-xs text-muted-foreground">
                  Use apenas UM botão primário (Gold) por tela ou seção principal. Use Outline ou
                  Ghost para ações secundárias.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-foreground">Verbos de Ação</span>
                <p className="text-xs text-muted-foreground">
                  Comece com verbos fortes: "Criar", "Salvar", "Enviar". Evite "Ok" ou "Sim".
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Icon name="cross" /> O que não fazer (Don't)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Muitos Primários</span>
                <p className="text-xs text-muted-foreground">
                  Não coloque vários botões Gold lado a lado. Isso confunde a decisão do usuário.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-destructive">Tamanhos Misturados</span>
                <p className="text-xs text-muted-foreground">
                  Mantenha consistência de tamanho (ex: todos 'default' ou todos 'sm') na mesma
                  linha de ação.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ButtonSection;
