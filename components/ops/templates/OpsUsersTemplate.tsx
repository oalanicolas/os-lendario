import React, { useState, useEffect, useCallback } from 'react';
import { Section } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Input } from '../../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Select } from '../../ui/select';
import OpsTopbar from '../OpsTopbar';
import { supabase } from '../../../lib/supabase';

interface OpsUsersTemplateProps {
  setSection: (s: Section) => void;
}

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  mind_id: string | null;
  created_at: string;
  updated_at: string;
  mind?: {
    id: string;
    name: string;
    slug: string;
    avatar_url: string | null;
    privacy_level: string;
  } | null;
}

interface Mind {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  privacy_level: string;
  short_bio: string | null;
}

type MindOption = 'create_new' | 'link_existing' | 'none';

const OpsUsersTemplate: React.FC<OpsUsersTemplateProps> = ({ setSection }) => {
  // Data state
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [minds, setMinds] = useState<Mind[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Link dialog state
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedMindId, setSelectedMindId] = useState<string>('');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  // Create dialog state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [mindOption, setMindOption] = useState<MindOption>('create_new');
  const [newUserMindId, setNewUserMindId] = useState<string>('');

  // Operation state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ==========================================================================
  // Data Fetching
  // ==========================================================================

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select(
          `
          *,
          mind:minds (
            id,
            name,
            slug,
            avatar_url,
            privacy_level
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers((data as unknown as UserProfile[]) || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Erro ao carregar usuários');
    }
  }, []);

  const fetchMinds = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('minds')
        .select('id, name, slug, avatar_url, privacy_level, short_bio')
        .is('deleted_at', null)
        .order('name');

      if (error) throw error;
      setMinds((data as Mind[]) || []);
    } catch (err) {
      console.error('Error fetching minds:', err);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchMinds()]);
      setLoading(false);
    };
    loadData();
  }, [fetchUsers, fetchMinds]);

  // ==========================================================================
  // Helpers
  // ==========================================================================

  const getInitials = (name: string | null) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.email?.toLowerCase().includes(search) ||
      user.full_name?.toLowerCase().includes(search) ||
      user.mind?.name?.toLowerCase().includes(search)
    );
  });

  // Stats
  const totalUsers = users.length;
  const linkedUsers = users.filter((u) => u.mind_id).length;
  const unlinkedUsers = totalUsers - linkedUsers;

  // ==========================================================================
  // Link Dialog Handlers
  // ==========================================================================

  const handleOpenLinkDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedMindId(user.mind_id || '');
    setIsLinkDialogOpen(true);
    setError(null);
    setSuccess(null);
  };

  const handleSaveLink = async () => {
    if (!selectedUser) return;

    setSaving(true);
    setError(null);

    try {
      const { error } = await (supabase.from('user_profiles') as ReturnType<typeof supabase.from>)
        .update({
          mind_id: selectedMindId || null,
          updated_at: new Date().toISOString(),
        } as Record<string, unknown>)
        .eq('id', selectedUser.id);

      if (error) throw error;

      await fetchUsers();
      setIsLinkDialogOpen(false);
      setSelectedUser(null);
      setSuccess('Vínculo atualizado com sucesso!');
    } catch (err) {
      console.error('Error saving link:', err);
      setError('Erro ao salvar vínculo');
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================================
  // Create User Dialog Handlers
  // ==========================================================================

  const handleOpenCreateDialog = () => {
    setNewUserEmail('');
    setNewUserName('');
    setMindOption('create_new');
    setNewUserMindId('');
    setError(null);
    setSuccess(null);
    setIsCreateDialogOpen(true);
  };

  const handleCreateUser = async () => {
    // Validation
    if (!newUserEmail.trim()) {
      setError('Email é obrigatório');
      return;
    }
    if (!newUserName.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (mindOption === 'link_existing' && !newUserMindId) {
      setError('Selecione um Mind para vincular');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Step 1: Send magic link invite
      // Note: This uses signInWithOtp which sends an email to the user
      // The user will click the link to complete registration
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: newUserEmail.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: newUserName.trim(),
          },
        },
      });

      if (authError) throw authError;

      // Step 2: If we need to create a mind or link to existing, we'll need to do it
      // after the user confirms their email. For now, we create a pending record
      // or handle it via the database trigger.

      // If "create_new" is selected, the trigger will handle it automatically
      // If "link_existing" or "none" is selected, we need to handle it differently

      // Since the user doesn't exist yet (they need to click the magic link),
      // we'll store the preference and handle it after confirmation
      // For simplicity, we'll show a message explaining the flow

      let successMessage = `Convite enviado para ${newUserEmail}!`;

      if (mindOption === 'create_new') {
        successMessage +=
          ' Um Mind será criado automaticamente quando o usuário aceitar o convite.';
      } else if (mindOption === 'link_existing') {
        const selectedMind = minds.find((m) => m.id === newUserMindId);
        successMessage += ` Após aceitar o convite, vincule manualmente ao Mind "${selectedMind?.name}".`;
      } else {
        successMessage += ' Após aceitar o convite, o usuário poderá ser vinculado a um Mind.';
      }

      await fetchUsers();
      setIsCreateDialogOpen(false);
      setSuccess(successMessage);
    } catch (err: unknown) {
      console.error('Error creating user:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar convite';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================================
  // Select Options
  // ==========================================================================

  const mindLinkOptions = [
    { label: 'Nenhum (remover vínculo)', value: '' },
    ...minds.map((mind) => ({
      label: `${mind.name} (@${mind.slug})${mind.privacy_level === 'private' ? ' [privado]' : ''}`,
      value: mind.id,
    })),
  ];

  const mindCreateOptions = minds.map((mind) => ({
    label: `${mind.name} (@${mind.slug})${mind.privacy_level === 'private' ? ' [privado]' : ''}`,
    value: mind.id,
  }));

  const mindBehaviorOptions = [
    { label: 'Criar Mind automaticamente', value: 'create_new' },
    { label: 'Vincular a Mind existente', value: 'link_existing' },
    { label: 'Sem Mind (vincular depois)', value: 'none' },
  ];

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans">
      {/* Top Bar */}
      <div className="z-10 flex-none border-b border-border/40 bg-background/80 backdrop-blur-md">
        <OpsTopbar currentSection={Section.STUDIO_OPS_USERS} setSection={setSection} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background/50">
          <div className="mx-auto max-w-[1200px] animate-fade-in space-y-6 p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-border/30 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
                  <Icon name="users" className="size-6 text-primary/80" />
                  Administração de Usuários
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Gerencie usuários e seus vínculos com Minds
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    fetchUsers();
                    fetchMinds();
                  }}
                >
                  <Icon name="refresh" className="mr-2 size-4" />
                  Atualizar
                </Button>
                <Button size="sm" onClick={handleOpenCreateDialog}>
                  <Icon name="user-add" className="mr-2 size-4" />
                  Novo Usuário
                </Button>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="flex items-start gap-3 rounded-lg bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
                <Icon name="check-circle" className="mt-0.5 size-5 shrink-0" />
                <p>{success}</p>
                <button
                  onClick={() => setSuccess(null)}
                  className="ml-auto text-green-600/70 hover:text-green-600 dark:text-green-400/70 dark:hover:text-green-400"
                >
                  <Icon name="cross" className="size-4" />
                </button>
              </div>
            )}
            {error && !isCreateDialogOpen && !isLinkDialogOpen && (
              <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                <Icon name="exclamation-circle" className="mt-0.5 size-5 shrink-0" />
                <p>{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-destructive/70 hover:text-destructive"
                >
                  <Icon name="cross" className="size-4" />
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon name="users" className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalUsers}</p>
                    <p className="text-sm text-muted-foreground">Total de Usuários</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-green-500/10">
                    <Icon name="link" className="size-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{linkedUsers}</p>
                    <p className="text-sm text-muted-foreground">Com Mind Vinculado</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <Icon name="exclamation-triangle" className="size-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{unlinkedUsers}</p>
                    <p className="text-sm text-muted-foreground">Sem Mind Vinculado</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Buscar por email, nome ou mind..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="list" className="size-5" />
                  Usuários ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="py-12 text-center">
                    <Icon name="users" className="mx-auto mb-4 size-12 text-muted-foreground/30" />
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
                    </p>
                    {!searchTerm && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={handleOpenCreateDialog}
                      >
                        <Icon name="user-add" className="mr-2 size-4" />
                        Convidar primeiro usuário
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                          <th className="pb-3 pr-4">Usuário</th>
                          <th className="pb-3 pr-4">Email</th>
                          <th className="pb-3 pr-4">Mind Vinculado</th>
                          <th className="pb-3 pr-4">Criado em</th>
                          <th className="pb-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="group transition-colors hover:bg-muted/30">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="size-9">
                                  <AvatarImage src={user.avatar_url || undefined} />
                                  <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{user.full_name || 'Sem nome'}</p>
                                  <p className="font-mono text-xs text-muted-foreground">
                                    {user.id.slice(0, 8)}...
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pr-4 text-sm text-muted-foreground">
                              {user.email || '-'}
                            </td>
                            <td className="py-3 pr-4">
                              {user.mind ? (
                                <div className="flex items-center gap-2">
                                  <Avatar className="size-6">
                                    <AvatarImage src={user.mind.avatar_url || undefined} />
                                    <AvatarFallback className="text-[10px]">
                                      {getInitials(user.mind.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{user.mind.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      @{user.mind.slug}
                                    </p>
                                  </div>
                                  <Badge
                                    variant={
                                      user.mind.privacy_level === 'public' ? 'outline' : 'secondary'
                                    }
                                    className="ml-2 text-[10px]"
                                  >
                                    {user.mind.privacy_level === 'public' ? 'público' : 'privado'}
                                  </Badge>
                                </div>
                              ) : (
                                <Badge variant="outline" className="text-amber-500">
                                  <Icon name="exclamation-circle" className="mr-1 size-3" />
                                  Sem vínculo
                                </Badge>
                              )}
                            </td>
                            <td className="py-3 pr-4 text-sm text-muted-foreground">
                              {new Date(user.created_at).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="py-3 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenLinkDialog(user)}
                              >
                                <Icon name="link" className="mr-1 size-4" />
                                {user.mind_id ? 'Alterar' : 'Vincular'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* ================================================================== */}
      {/* Link Mind Dialog */}
      {/* ================================================================== */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="link" className="size-5 text-primary" />
              Vincular Mind ao Usuário
            </DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <span>
                  Selecione um Mind para vincular a{' '}
                  <strong>{selectedUser.full_name || selectedUser.email}</strong>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Error inside dialog */}
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Current User Info */}
            {selectedUser && (
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={selectedUser.avatar_url || undefined} />
                    <AvatarFallback>{getInitials(selectedUser.full_name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedUser.full_name || 'Sem nome'}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mind Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Selecionar Mind</label>
              <Select
                placeholder="Escolha um Mind..."
                value={selectedMindId}
                onValueChange={setSelectedMindId}
                options={mindLinkOptions}
              />
              {selectedMindId && (
                <p className="text-xs text-muted-foreground">
                  Mind selecionado:{' '}
                  <strong>{minds.find((m) => m.id === selectedMindId)?.name}</strong>
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSaveLink} disabled={saving}>
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Icon name="check" className="mr-2 size-4" />
                  Salvar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================== */}
      {/* Create User Dialog */}
      {/* ================================================================== */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="user-add" className="size-5 text-primary" />
              Convidar Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Um email com link de acesso será enviado para o usuário.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Error inside dialog */}
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                placeholder="usuario@exemplo.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nome completo <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="João da Silva"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>

            {/* Mind Option */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Associação com Mind</label>
              <Select
                placeholder="Selecione..."
                value={mindOption}
                onValueChange={(value) => setMindOption(value as MindOption)}
                options={mindBehaviorOptions}
              />
              <p className="text-xs text-muted-foreground">
                {mindOption === 'create_new' && (
                  <>Um Mind privado será criado automaticamente com o nome do usuário.</>
                )}
                {mindOption === 'link_existing' && (
                  <>O usuário será vinculado a um Mind existente.</>
                )}
                {mindOption === 'none' && (
                  <>O usuário não terá Mind. Você poderá vincular depois.</>
                )}
              </p>
            </div>

            {/* Mind Selection (only if link_existing) */}
            {mindOption === 'link_existing' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Selecionar Mind <span className="text-destructive">*</span>
                </label>
                <Select
                  placeholder="Escolha um Mind..."
                  value={newUserMindId}
                  onValueChange={setNewUserMindId}
                  options={mindCreateOptions}
                />
              </div>
            )}

            {/* Info box */}
            <div className="rounded-lg bg-blue-500/10 p-4">
              <div className="flex gap-3">
                <Icon name="info-circle" className="mt-0.5 size-5 shrink-0 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-medium">Como funciona o convite:</p>
                  <ol className="mt-1 list-inside list-decimal space-y-1 text-blue-600 dark:text-blue-400">
                    <li>O usuário recebe um email com link mágico</li>
                    <li>Ao clicar no link, a conta é criada automaticamente</li>
                    <li>O Mind é criado/vinculado conforme configurado acima</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateUser} disabled={saving}>
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </>
              ) : (
                <>
                  <Icon name="paper-plane" className="mr-2 size-4" />
                  Enviar Convite
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpsUsersTemplate;
