-- Добавляем колонку для YooKassa payment ID
ALTER TABLE orders ADD COLUMN IF NOT EXISTS yookassa_payment_id VARCHAR(100);

-- Создаем индекс для быстрого поиска по payment_id
CREATE INDEX IF NOT EXISTS idx_orders_yookassa_payment_id ON orders(yookassa_payment_id);