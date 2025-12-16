# Интеграция донат-системы с Garry's Mod

## Схема работы

1. **Игрок пополняет баланс на сайте**
   - Указывает Steam ID и сумму
   - Оплачивает через Т-Банк
   - Баланс записывается в базу данных

2. **Сервер Garry's Mod проверяет баланс**
   - При входе игрока на сервер
   - Делает HTTP запрос к API
   - Если есть баланс - зачисляет валюту

3. **Баланс обнуляется после зачисления**
   - Чтобы избежать повторного зачисления

## API Endpoints

### 1. Проверка баланса (GET)
```
GET https://functions.poehali.dev/242de14c-6560-4cc4-a521-4f5e92def025?steam_id=STEAM_0:1:12345678
```

**Ответ:**
```json
{
  "steam_id": "STEAM_0:1:12345678",
  "balance": 1150,
  "total_donated": 1000
}
```

### 2. Списание баланса (POST)
```
POST https://functions.poehali.dev/242de14c-6560-4cc4-a521-4f5e92def025?steam_id=STEAM_0:1:12345678
Content-Type: application/json

{
  "action": "claim"
}
```

**Ответ:**
```json
{
  "steam_id": "STEAM_0:1:12345678",
  "claimed": 1150,
  "success": true
}
```

## Lua скрипт для Garry's Mod

Создайте файл `addons/abyssal_donate/lua/autorun/server/sv_donate.lua`:

```lua
-- Конфигурация
local DONATE_API_URL = "https://functions.poehali.dev/242de14c-6560-4cc4-a521-4f5e92def025"

-- Функция для получения Steam ID игрока
local function GetPlayerSteamID(ply)
    return ply:SteamID()
end

-- Проверка баланса игрока
local function CheckDonateBalance(ply)
    local steamid = GetPlayerSteamID(ply)
    
    http.Fetch(
        DONATE_API_URL .. "?steam_id=" .. steamid,
        function(body, len, headers, code)
            if code == 200 then
                local data = util.JSONToTable(body)
                
                if data and data.balance and data.balance > 0 then
                    print("[Abyssal Donate] Игрок " .. ply:Nick() .. " имеет баланс: " .. data.balance)
                    ClaimDonateBalance(ply, data.balance)
                end
            else
                print("[Abyssal Donate] Ошибка проверки баланса для " .. ply:Nick())
            end
        end,
        function(error)
            print("[Abyssal Donate] Ошибка HTTP запроса: " .. error)
        end
    )
end

-- Зачисление баланса игроку
local function ClaimDonateBalance(ply, amount)
    local steamid = GetPlayerSteamID(ply)
    
    http.Post(
        DONATE_API_URL .. "?steam_id=" .. steamid,
        {action = "claim"},
        function(body, len, headers, code)
            if code == 200 then
                local data = util.JSONToTable(body)
                
                if data and data.success then
                    -- ЗДЕСЬ ДОБАВЬТЕ ВАШУ ЛОГИКУ ЗАЧИСЛЕНИЯ ВАЛЮТЫ
                    -- Например:
                    -- ply:SetDonateCoins(ply:GetDonateCoins() + data.claimed)
                    
                    ply:ChatPrint("[Abyssal] Вам зачислено " .. data.claimed .. " донат-валюты!")
                    print("[Abyssal Donate] Зачислено " .. data.claimed .. " для " .. ply:Nick())
                end
            else
                print("[Abyssal Donate] Ошибка списания баланса для " .. ply:Nick())
            end
        end,
        function(error)
            print("[Abyssal Donate] Ошибка HTTP запроса: " .. error)
        end
    )
end

-- Проверка при входе игрока
hook.Add("PlayerInitialSpawn", "AbyssalDonate_CheckBalance", function(ply)
    timer.Simple(5, function()
        if IsValid(ply) then
            CheckDonateBalance(ply)
        end
    end)
end)

-- Команда для ручной проверки баланса
concommand.Add("donate_check", function(ply, cmd, args)
    if IsValid(ply) then
        CheckDonateBalance(ply)
        ply:ChatPrint("[Abyssal] Проверка баланса...")
    end
end)

print("[Abyssal Donate] Система донатов загружена!")
```

## Настройка Т-Банк

⚠️ **ВАЖНО:** Сейчас используется DEMO режим Т-Банк!

Для реальных платежей:

1. **Зарегистрируйте магазин в Т-Банк:**
   - Перейдите на https://www.tbank.ru/kassa/
   - Создайте магазин
   - Получите `Terminal Key` и `Password`

2. **Обновите `backend/donate-create/index.py`:**
   ```python
   # Замените эту строку:
   payment_url = f"https://securepayments.tinkoff.ru/payment/form/?shop_id=DEMO&amount={amount * 100}&order_id={transaction_id}&description=Donate+Abyssal+SCP+RP"
   
   # На реальный код с Tinkoff API
   ```

3. **Настройте webhook:**
   - URL для уведомлений: `https://functions.poehali.dev/cd2c33a3-ddca-4ee9-b526-82a31e69efcc`
   - Т-Банк будет отправлять уведомления о статусе платежа

## Структура базы данных

### Таблица `players`
- `id` - уникальный ID
- `steam_id` - Steam ID игрока (уникальный)
- `balance` - текущий баланс донат-валюты
- `total_donated` - всего пожертвовано
- `created_at` - дата регистрации
- `updated_at` - дата последнего обновления

### Таблица `transactions`
- `id` - ID транзакции
- `steam_id` - Steam ID игрока
- `amount` - сумма в рублях
- `status` - статус (pending/completed/failed)
- `payment_id` - ID платежа от Т-Банк
- `payment_url` - ссылка на оплату
- `created_at` - дата создания
- `completed_at` - дата завершения

## Система бонусов

При пополнении баланса игрок получает бонусную донат-валюту:

- 100 ₽ → 100 валюты (без бонуса)
- 250 ₽ → 260 валюты (+10 бонус)
- 500 ₽ → 550 валюты (+50 бонус)
- 1000 ₽ → 1150 валюты (+150 бонус)
- 2500 ₽ → 3000 валюты (+500 бонус)
- 5000 ₽ → 6250 валюты (+1250 бонус)

## Безопасность

1. **API открытый** - любой может проверить баланс по Steam ID
2. **Списание баланса** тоже открытое, но:
   - Баланс списывается только один раз
   - После списания становится 0
   - Повторное списание вернёт 0

3. **Для дополнительной защиты** можно добавить:
   - API ключ в заголовке `X-Api-Key`
   - IP whitelist для вашего сервера
   - Rate limiting

## Тестирование

1. Перейдите на `/donate` на сайте
2. Введите тестовый Steam ID: `STEAM_0:1:12345678`
3. Выберите сумму и нажмите "Пополнить"
4. Проверьте баланс через API:
   ```bash
   curl "https://functions.poehali.dev/242de14c-6560-4cc4-a521-4f5e92def025?steam_id=STEAM_0:1:12345678"
   ```

## Поддержка

По вопросам интеграции:
- Discord: https://discord.gg/jXuuBA9GXr
