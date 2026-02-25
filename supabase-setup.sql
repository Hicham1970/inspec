-- Table contacts (si elle n'existe pas)
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'contact' CHECK (type IN ('contact', 'quotation')),
  service_type TEXT,
  vessel_name TEXT,
  port TEXT,
  planned_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table newsletter (si elle n'existe pas)
CREATE TABLE IF NOT EXISTS newsletter (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS pour contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert contacts" ON contacts;
DROP POLICY IF EXISTS "Allow select contacts" ON contacts;

CREATE POLICY "Allow insert contacts"
ON contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow select contacts"
ON contacts
FOR SELECT
TO anon, authenticated
USING (true);

-- RLS pour newsletter
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert newsletter" ON newsletter;
DROP POLICY IF EXISTS "Allow select newsletter" ON newsletter;

CREATE POLICY "Allow insert newsletter"
ON newsletter
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow select newsletter"
ON newsletter
FOR SELECT
TO anon, authenticated
USING (true);
