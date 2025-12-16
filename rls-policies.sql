-- =============================================================================
-- RLS Policies for CreatorOS Frontend (CRUD completo)
-- Permite acesso público de leitura e escrita para desenvolvimento
-- =============================================================================

-- 1. content_projects (Cursos)
-- -----------------------------------------------------------------------------
-- Habilitar RLS (provavelmente já está habilitado)
ALTER TABLE content_projects ENABLE ROW LEVEL SECURITY;

-- Política de SELECT (leitura pública)
DROP POLICY IF EXISTS "Allow public read access to content_projects" ON content_projects;
CREATE POLICY "Allow public read access to content_projects"
ON content_projects FOR SELECT
TO anon, authenticated
USING (true);

-- Política de INSERT (criar)
DROP POLICY IF EXISTS "Allow public insert to content_projects" ON content_projects;
CREATE POLICY "Allow public insert to content_projects"
ON content_projects FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política de UPDATE (atualizar)
DROP POLICY IF EXISTS "Allow public update to content_projects" ON content_projects;
CREATE POLICY "Allow public update to content_projects"
ON content_projects FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Política de DELETE (deletar)
DROP POLICY IF EXISTS "Allow public delete from content_projects" ON content_projects;
CREATE POLICY "Allow public delete from content_projects"
ON content_projects FOR DELETE
TO anon, authenticated
USING (true);


-- 2. contents (Aulas, Módulos, Lições)
-- -----------------------------------------------------------------------------
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to contents" ON contents;
CREATE POLICY "Allow public read access to contents"
ON contents FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow public insert to contents" ON contents;
CREATE POLICY "Allow public insert to contents"
ON contents FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to contents" ON contents;
CREATE POLICY "Allow public update to contents"
ON contents FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete from contents" ON contents;
CREATE POLICY "Allow public delete from contents"
ON contents FOR DELETE
TO anon, authenticated
USING (true);


-- 3. minds (Instrutores/Personas)
-- -----------------------------------------------------------------------------
ALTER TABLE minds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to minds" ON minds;
CREATE POLICY "Allow public read access to minds"
ON minds FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow public insert to minds" ON minds;
CREATE POLICY "Allow public insert to minds"
ON minds FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to minds" ON minds;
CREATE POLICY "Allow public update to minds"
ON minds FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete from minds" ON minds;
CREATE POLICY "Allow public delete from minds"
ON minds FOR DELETE
TO anon, authenticated
USING (true);


-- 4. audience_profiles (Perfis de Audiência)
-- -----------------------------------------------------------------------------
ALTER TABLE audience_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to audience_profiles" ON audience_profiles;
CREATE POLICY "Allow public read access to audience_profiles"
ON audience_profiles FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow public insert to audience_profiles" ON audience_profiles;
CREATE POLICY "Allow public insert to audience_profiles"
ON audience_profiles FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to audience_profiles" ON audience_profiles;
CREATE POLICY "Allow public update to audience_profiles"
ON audience_profiles FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete from audience_profiles" ON audience_profiles;
CREATE POLICY "Allow public delete from audience_profiles"
ON audience_profiles FOR DELETE
TO anon, authenticated
USING (true);


-- 5. content_minds (Junction table)
-- -----------------------------------------------------------------------------
ALTER TABLE content_minds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to content_minds" ON content_minds;
CREATE POLICY "Allow public access to content_minds"
ON content_minds FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- 6. content_tags (Junction table)
-- -----------------------------------------------------------------------------
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to content_tags" ON content_tags;
CREATE POLICY "Allow public access to content_tags"
ON content_tags FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- 7. tags
-- -----------------------------------------------------------------------------
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to tags" ON tags;
CREATE POLICY "Allow public access to tags"
ON tags FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- =============================================================================
-- Verificação
-- =============================================================================
-- Após executar, você pode verificar as políticas com:
-- SELECT tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE schemaname = 'public';
