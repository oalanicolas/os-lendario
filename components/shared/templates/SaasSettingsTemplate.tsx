import React from 'react';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import { Select } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';

const SaasSettingsTemplate: React.FC = () => {
  const alanAvatar =
    'https://yt3.googleusercontent.com/JNCtRSKK2aMQOmEroyBWmdbiaq_uTlFn-h_RuhGakkxBHW14e9u4yMZk884Espvk8he9GIYjrPE=s900-c-k-c0x00ffffff-no-rj';

  return (
    <div className="flex animate-fade-in flex-col space-y-8 font-sans">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
        <p className="font-serif text-muted-foreground">
          Gerencie suas informações de conta, preferências e segurança.
        </p>
      </header>

      {/* --- CONTENT --- */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar Nav (Simulated) */}
        <nav className="flex w-full shrink-0 flex-col gap-1 lg:w-64">
          <Button variant="ghost" className="justify-start bg-muted font-bold text-foreground">
            <Icon name="user" className="mr-2" size="size-4" /> Geral
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground"
          >
            <Icon name="credit-card" className="mr-2" size="size-4" /> Faturamento
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground"
          >
            <Icon name="bell" className="mr-2" size="size-4" /> Notificações
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground"
          >
            <Icon name="users-alt" className="mr-2" size="size-4" /> Time
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-muted-foreground hover:text-foreground"
          >
            <Icon name="shield-check" className="mr-2" size="size-4" /> Segurança
          </Button>
        </nav>

        {/* Main Form Area */}
        <div className="max-w-3xl flex-1 space-y-8">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Perfil Público</CardTitle>
              <CardDescription>
                Como você aparece para outros usuários na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar size="xl">
                  <AvatarImage src={alanAvatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Alterar foto
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      Remover
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recomendado: JPG ou PNG, min. 400x400px.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Alan Nicolas" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Founder @ Academia Lendária. Entusiasta de IA." />
                  <p className="text-xs text-muted-foreground">
                    Breve descrição exibida no seu perfil.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t border-border bg-muted/20 py-4">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
              <CardDescription>Ajuste o comportamento da interface.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Idioma</Label>
                    <Select
                      options={[
                        { label: 'Português (Brasil)', value: 'pt-BR' },
                        { label: 'English (US)', value: 'en-US' },
                        { label: 'Español', value: 'es' },
                      ]}
                      value="pt-BR"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fuso Horário</Label>
                    <Select
                      options={[
                        { label: 'Brasília (GMT-3)', value: 'brt' },
                        { label: 'Pacific Time (PST)', value: 'pst' },
                        { label: 'UTC', value: 'utc' },
                      ]}
                      value="brt"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-bold">Email & Notificações</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Emails de Marketing</Label>
                    <p className="text-xs text-muted-foreground">
                      Receba novidades sobre novos recursos.
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Atividade da Conta</Label>
                    <p className="text-xs text-muted-foreground">Alertas de segurança e logins.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Área de Perigo</CardTitle>
              <CardDescription>Ações irreversíveis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-destructive">Deletar Conta</p>
                  <p className="text-xs text-muted-foreground">
                    Remove permanentemente sua conta e todos os dados associados.
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Deletar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SaasSettingsTemplate;
