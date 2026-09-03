-- =====================================================
-- MIGRAZIONE COMPLETA: avatar, segnalazioni, policy
-- =====================================================

-- 1. FOTO PROFILO
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS avatar_url text;

-- Crea il bucket "avatars" da Supabase Dashboard > Storage
-- (pubblico in lettura, upload solo autenticati)
-- Poi applica queste policy sullo storage:

-- Lettura pubblica avatar
-- (da fare via Dashboard > Storage > avatars > Policies, oppure SQL:)
-- CREATE POLICY "Avatar pubblici in lettura"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'avatars');

-- Upload solo del proprio avatar
-- CREATE POLICY "Utenti caricano solo il proprio avatar"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Aggiornamento solo del proprio avatar
-- CREATE POLICY "Utenti aggiornano solo il proprio avatar"
--   ON storage.objects FOR UPDATE
--   USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);


-- =====================================================
-- 2. SISTEMA DI SEGNALAZIONE
-- =====================================================

CREATE TABLE IF NOT EXISTS reports (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reporter_id uuid NOT NULL REFERENCES auth.users(id),
  reported_user_id uuid REFERENCES auth.users(id),
  trip_id bigint REFERENCES trips(id) ON DELETE SET NULL,
  request_id bigint REFERENCES requests(id) ON DELETE SET NULL,
  conversation_id bigint REFERENCES conversations(id) ON DELETE SET NULL,
  reason text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending', -- pending | resolved | dismissed
  created_at timestamp with time zone DEFAULT now(),
  reviewed_at timestamp with time zone,
  reviewed_by uuid REFERENCES auth.users(id)
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Chiunque autenticato può creare una segnalazione
CREATE POLICY "Utenti autenticati possono segnalare"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- Solo l'admin può leggere/gestire le segnalazioni
-- (riusa la funzione is_admin() già esistente nel tuo progetto)
CREATE POLICY "Solo admin legge le segnalazioni"
  ON reports FOR SELECT
  USING (is_admin());

CREATE POLICY "Solo admin aggiorna le segnalazioni"
  ON reports FOR UPDATE
  USING (is_admin());


-- =====================================================
-- 3. ACCETTAZIONE TERMINI (facoltativo, consigliato)
-- =====================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS terms_accepted_at timestamp with time zone;
