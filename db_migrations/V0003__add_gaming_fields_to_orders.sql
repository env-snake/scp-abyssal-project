-- Добавление полей для игровой донат-системы
ALTER TABLE orders ADD COLUMN IF NOT EXISTS steam_id VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS server_ip VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS game_currency INTEGER DEFAULT 0;

-- Индекс для быстрого поиска по Steam ID
CREATE INDEX IF NOT EXISTS idx_orders_steam_id ON orders(steam_id);