-- Create guestlists table
CREATE TABLE IF NOT EXISTS guestlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  max_guests INTEGER,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guestlist_id UUID NOT NULL REFERENCES guestlists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plus_ones INTEGER DEFAULT 0,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_guests_guestlist_id ON guests(guestlist_id);
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);
CREATE INDEX IF NOT EXISTS idx_guestlists_is_active ON guestlists(is_active);

-- Enable Row Level Security
ALTER TABLE guestlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can make these more restrictive later)
CREATE POLICY "Enable read access for all users" ON guestlists
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON guestlists
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON guestlists
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON guestlists
  FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON guests
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON guests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON guests
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON guests
  FOR DELETE USING (true); 