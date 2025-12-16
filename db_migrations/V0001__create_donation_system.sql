-- Создание таблицы для хранения балансов игроков
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    steam_id VARCHAR(255) UNIQUE NOT NULL,
    balance INTEGER DEFAULT 0,
    total_donated INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для хранения транзакций
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    steam_id VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_id VARCHAR(255),
    payment_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_players_steam_id ON players(steam_id);
CREATE INDEX IF NOT EXISTS idx_transactions_steam_id ON transactions(steam_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);