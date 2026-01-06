# 🎮 Интеграция донат-системы с Garry's Mod

Полная инструкция по подключению донат-системы к вашему серверу Garry's Mod.

---

## 📋 Оглавление

1. [Архитектура системы](#архитектура-системы)
2. [Настройка YooKassa](#настройка-yookassa)
3. [API эндпоинты](#api-эндпоинты)
4. [Интеграция в GLua](#интеграция-в-glua)
5. [Примеры кода](#примеры-кода)
6. [Тестирование](#тестирование)

---

## 🏗️ Архитектура системы

```
Игрок в игре → GLua меню → URL с параметрами → Сайт → YooKassa → Webhook → БД → GLua получает баланс
```

### Как это работает:

1. **Игрок открывает донат-меню** в игре (F4/!donate)
2. **Вводит сумму** пополнения (минимум 100 рублей)
3. **Игра открывает браузер** с URL: `https://abyssal-scp-project.poehali.dev/donate?steam_id=76561198000000001&amount=500`
4. **Сайт автоматически заполняет** Steam ID и сумму
5. **Игрок нажимает кнопку** "Перейти к оплате"
6. **ЮKassa обрабатывает** платеж
7. **Webhook зачисляет** донат-валюту в БД
8. **GLua запрашивает баланс** через API

---

## 💳 Настройка YooKassa

### 1. Регистрация

1. Зарегистрируйтесь на https://yookassa.ru
2. Подключите юридическое лицо (ИП или самозанятый)
3. Дождитесь активации аккаунта

### 2. Получение ключей

**Shop ID:**
- Откройте https://yookassa.ru/my/payments
- В шапке страницы увидите `shopId` (например: `123456`)

**Secret Key:**
- Откройте https://yookassa.ru/my/merchant/integration/api-keys
- Нажмите "Создать ключ"
- Скопируйте секретный ключ (начинается с `live_`)

### 3. Настройка Webhook

**⚠️ КРИТИЧЕСКИ ВАЖНО:**

1. Откройте https://yookassa.ru/my/merchant/integration/http-notifications
2. Добавьте URL webhook: `https://functions.poehali.dev/80327d36-1166-490c-94ee-5bd1216b7716`
3. **Отметьте ВСЕ чекбоксы:**
   - ✅ `payment.succeeded` — успешный платёж
   - ✅ `payment.waiting_for_capture` — ожидание подтверждения
   - ✅ `payment.canceled` — отмена платежа
   - ✅ `refund.succeeded` — успешный возврат

**Без настройки webhook баланс НЕ будет зачисляться!**

### 4. Добавление секретов в проект

В настройках проекта на poehali.dev добавьте:
- `YOOKASSA_SHOP_ID` — ваш Shop ID
- `YOOKASSA_SECRET_KEY` — секретный ключ API

---

## 🔌 API эндпоинты

### 1. Создание платежа

**POST** `https://functions.poehali.dev/5af93bd2-a1ec-4d87-af66-f2bc997d7791`

```json
{
  "steam_id": "76561198000000001",
  "amount": 500,
  "return_url": "https://abyssal-scp-project.poehali.dev/donate?success=true"
}
```

**Ответ:**
```json
{
  "payment_url": "https://yoomoney.ru/checkout/payments/v2/...",
  "payment_id": "2d8c5d31-000f-5000-a000-1f6c36c8e9e7",
  "order_id": 123,
  "order_number": "DONATE-20250107-A1B2C3D4"
}
```

**Валидация:**
- `steam_id`: формат Steam ID64 (`765\d{14}`)
- `amount`: от 100 до 100 000 рублей
- `return_url`: опционально (по умолчанию `/donate`)

---

### 2. Получение баланса игрока

**GET** `https://functions.poehali.dev/1b8eeb2b-1f5a-4296-90cf-5737f596b55f?steam_id=76561198000000001`

**Ответ:**
```json
{
  "steam_id": "76561198000000001",
  "balance": 1500,
  "total_donated": 3000,
  "exists": true,
  "created_at": "2025-01-07T12:00:00",
  "updated_at": "2025-01-07T13:30:00"
}
```

**Если игрока нет в БД:**
```json
{
  "steam_id": "76561198000000001",
  "balance": 0,
  "total_donated": 0,
  "exists": false
}
```

---

### 3. Webhook (автоматически)

**POST** `https://functions.poehali.dev/80327d36-1166-490c-94ee-5bd1216b7716`

Этот эндпоинт вызывается YooKassa автоматически при изменении статуса платежа.

**Что делает webhook:**
1. Проверяет платеж через YooKassa API
2. Обновляет статус заказа в БД
3. Зачисляет донат-валюту игроку (1₽ = 1 донат-валюта)
4. Возвращает статус обработки

---

## 🎮 Интеграция в GLua

### Структура файлов

```
garrysmod/
└── addons/
    └── your_donation/
        └── lua/
            ├── autorun/
            │   └── donation_init.lua          # Инициализация
            ├── donation/
            │   ├── cl_menu.lua               # Клиентское меню
            │   ├── sv_api.lua                # Серверный API
            │   └── sh_config.lua             # Общая конфигурация
            └── vgui/
                └── donation_panel.lua        # VGUI элементы
```

---

### 1. Конфигурация (`sh_config.lua`)

```lua
DONATION = DONATION or {}

-- API endpoints
DONATION.Config = {
    CreatePaymentURL = "https://functions.poehali.dev/5af93bd2-a1ec-4d87-af66-f2bc997d7791",
    GetBalanceURL = "https://functions.poehali.dev/1b8eeb2b-1f5a-4296-90cf-5737f596b55f",
    WebsiteURL = "https://abyssal-scp-project.poehali.dev/donate",
    
    -- Настройки
    MinAmount = 100,
    MaxAmount = 100000,
    UpdateInterval = 60, -- Обновление баланса каждые 60 секунд
}

print("[DONATION] Config loaded!")
```

---

### 2. Серверный API (`sv_api.lua`)

```lua
if SERVER then
    util.AddNetworkString("Donation_OpenMenu")
    util.AddNetworkString("Donation_GetBalance")
    util.AddNetworkString("Donation_UpdateBalance")
    util.AddNetworkString("Donation_CreatePayment")

    -- Кэш балансов игроков (чтобы не спамить API)
    DONATION.PlayerBalances = DONATION.PlayerBalances or {}
    DONATION.LastUpdate = DONATION.LastUpdate or {}

    -- Получить баланс игрока
    function DONATION.GetPlayerBalance(ply, callback)
        local steamid64 = ply:SteamID64()
        local now = CurTime()
        
        -- Проверяем кэш (обновляем раз в минуту)
        if DONATION.LastUpdate[steamid64] and (now - DONATION.LastUpdate[steamid64]) < DONATION.Config.UpdateInterval then
            if callback then
                callback(DONATION.PlayerBalances[steamid64] or 0)
            end
            return
        end
        
        -- Запрос к API
        local url = DONATION.Config.GetBalanceURL .. "?steam_id=" .. steamid64
        
        HTTP({
            method = "GET",
            url = url,
            success = function(code, body, headers)
                if code == 200 then
                    local data = util.JSONToTable(body)
                    if data and data.balance then
                        DONATION.PlayerBalances[steamid64] = data.balance
                        DONATION.LastUpdate[steamid64] = now
                        
                        if callback then
                            callback(data.balance)
                        end
                        
                        -- Отправляем клиенту
                        net.Start("Donation_UpdateBalance")
                        net.WriteInt(data.balance, 32)
                        net.Send(ply)
                        
                        print("[DONATION] Balance for " .. ply:Nick() .. ": " .. data.balance)
                    end
                else
                    print("[DONATION] API error: " .. code)
                    if callback then callback(0) end
                end
            end,
            failed = function(err)
                print("[DONATION] Request failed: " .. err)
                if callback then callback(0) end
            end
        })
    end

    -- Команда для открытия меню
    concommand.Add("donate", function(ply, cmd, args)
        DONATION.GetPlayerBalance(ply, function(balance)
            net.Start("Donation_OpenMenu")
            net.WriteInt(balance, 32)
            net.Send(ply)
        end)
    end)

    -- Обработка запроса создания платежа
    net.Receive("Donation_CreatePayment", function(len, ply)
        local amount = net.ReadInt(32)
        local steamid64 = ply:SteamID64()
        
        if amount < DONATION.Config.MinAmount or amount > DONATION.Config.MaxAmount then
            ply:ChatPrint("[ДОНАТ] Неверная сумма! Минимум " .. DONATION.Config.MinAmount .. " ₽")
            return
        end
        
        -- Открываем браузер с параметрами
        local url = string.format(
            "%s?steam_id=%s&amount=%d",
            DONATION.Config.WebsiteURL,
            steamid64,
            amount
        )
        
        ply:SendLua([[gui.OpenURL("]] .. url .. [[")]])
        ply:ChatPrint("[ДОНАТ] Открываем страницу оплаты...")
    end)

    -- Автоматическое обновление баланса при входе
    hook.Add("PlayerInitialSpawn", "DONATION_PlayerSpawn", function(ply)
        timer.Simple(5, function()
            if IsValid(ply) then
                DONATION.GetPlayerBalance(ply)
            end
        end)
    end)

    -- Периодическое обновление балансов онлайн игроков
    timer.Create("DONATION_UpdateBalances", 120, 0, function()
        for _, ply in pairs(player.GetAll()) do
            DONATION.GetPlayerBalance(ply)
        end
    end)

    print("[DONATION] Server API loaded!")
end
```

---

### 3. Клиентское меню (`cl_menu.lua`)

```lua
if CLIENT then
    -- Переменные
    DONATION.CurrentBalance = 0

    -- Получение баланса от сервера
    net.Receive("Donation_UpdateBalance", function()
        DONATION.CurrentBalance = net.ReadInt(32)
    end)

    -- Открытие меню доната
    net.Receive("Donation_OpenMenu", function()
        local balance = net.ReadInt(32)
        DONATION.CurrentBalance = balance
        
        DONATION.OpenMenu()
    end)

    -- Создание VGUI меню
    function DONATION.OpenMenu()
        -- Закрываем старое меню если оно есть
        if IsValid(DONATION.Frame) then
            DONATION.Frame:Remove()
        end
        
        -- Создаем главное окно
        local frame = vgui.Create("DFrame")
        frame:SetSize(600, 500)
        frame:Center()
        frame:SetTitle("Пополнение донат-баланса")
        frame:SetVisible(true)
        frame:SetDraggable(true)
        frame:ShowCloseButton(true)
        frame:MakePopup()
        DONATION.Frame = frame
        
        -- Баланс
        local balanceLabel = vgui.Create("DLabel", frame)
        balanceLabel:SetPos(20, 40)
        balanceLabel:SetSize(560, 30)
        balanceLabel:SetFont("DermaLarge")
        balanceLabel:SetText("Ваш баланс: " .. DONATION.CurrentBalance .. " донат-валюты")
        balanceLabel:SetTextColor(Color(255, 255, 255))
        
        -- Steam ID
        local steamLabel = vgui.Create("DLabel", frame)
        steamLabel:SetPos(20, 80)
        steamLabel:SetSize(560, 20)
        steamLabel:SetText("Steam ID: " .. LocalPlayer():SteamID64())
        
        -- Сумма пополнения
        local amountLabel = vgui.Create("DLabel", frame)
        amountLabel:SetPos(20, 120)
        amountLabel:SetSize(560, 20)
        amountLabel:SetText("Сумма пополнения (₽):")
        
        local amountEntry = vgui.Create("DTextEntry", frame)
        amountEntry:SetPos(20, 145)
        amountEntry:SetSize(560, 35)
        amountEntry:SetPlaceholderText("Введите сумму (минимум 100 ₽)")
        amountEntry:SetNumeric(true)
        
        -- Быстрые кнопки
        local quickAmounts = {100, 500, 1000, 2000, 5000}
        local btnWidth = 106
        local btnHeight = 40
        local startX = 20
        local startY = 195
        
        for i, amount in ipairs(quickAmounts) do
            local btn = vgui.Create("DButton", frame)
            btn:SetPos(startX + (i - 1) * (btnWidth + 8), startY)
            btn:SetSize(btnWidth, btnHeight)
            btn:SetText(amount .. " ₽")
            btn.DoClick = function()
                amountEntry:SetText(tostring(amount))
            end
        end
        
        -- Информация
        local infoLabel = vgui.Create("DLabel", frame)
        infoLabel:SetPos(20, 250)
        infoLabel:SetSize(560, 100)
        infoLabel:SetText([[
Курс обмена: 1₽ = 1 донат-валюта
Минимальная сумма: 100 ₽
После нажатия кнопки откроется страница оплаты.
Баланс будет зачислен автоматически после успешной оплаты.
        ]])
        infoLabel:SetWrap(true)
        infoLabel:SetAutoStretchVertical(true)
        
        -- Кнопка пополнения
        local payButton = vgui.Create("DButton", frame)
        payButton:SetPos(20, 380)
        payButton:SetSize(560, 60)
        payButton:SetText("ПЕРЕЙТИ К ОПЛАТЕ")
        payButton:SetFont("DermaLarge")
        payButton.DoClick = function()
            local amount = tonumber(amountEntry:GetValue())
            
            if not amount or amount < DONATION.Config.MinAmount then
                chat.AddText(Color(255, 100, 100), "[ДОНАТ] ", Color(255, 255, 255), 
                    "Минимальная сумма пополнения: " .. DONATION.Config.MinAmount .. " ₽")
                surface.PlaySound("buttons/button10.wav")
                return
            end
            
            if amount > DONATION.Config.MaxAmount then
                chat.AddText(Color(255, 100, 100), "[ДОНАТ] ", Color(255, 255, 255), 
                    "Максимальная сумма пополнения: " .. DONATION.Config.MaxAmount .. " ₽")
                surface.PlaySound("buttons/button10.wav")
                return
            end
            
            -- Отправляем на сервер
            net.Start("Donation_CreatePayment")
            net.WriteInt(amount, 32)
            net.SendToServer()
            
            chat.AddText(Color(100, 255, 100), "[ДОНАТ] ", Color(255, 255, 255), 
                "Открываем страницу оплаты...")
            surface.PlaySound("buttons/button15.wav")
            
            frame:Close()
        end
        
        -- Кнопка обновления баланса
        local refreshButton = vgui.Create("DButton", frame)
        refreshButton:SetPos(20, 450)
        refreshButton:SetSize(560, 30)
        refreshButton:SetText("Обновить баланс")
        refreshButton.DoClick = function()
            RunConsoleCommand("donate")
            chat.AddText(Color(100, 255, 100), "[ДОНАТ] ", Color(255, 255, 255), "Обновляем баланс...")
        end
    end

    -- Команда для открытия меню
    concommand.Add("donate_menu", function()
        RunConsoleCommand("donate")
    end)

    print("[DONATION] Client menu loaded!")
end
```

---

### 4. Инициализация (`autorun/donation_init.lua`)

```lua
-- Инициализация системы донатов
DONATION = DONATION or {}

if SERVER then
    AddCSLuaFile("donation/sh_config.lua")
    AddCSLuaFile("donation/cl_menu.lua")
    
    include("donation/sh_config.lua")
    include("donation/sv_api.lua")
    
    print("[DONATION] Server-side loaded!")
else
    include("donation/sh_config.lua")
    include("donation/cl_menu.lua")
    
    print("[DONATION] Client-side loaded!")
end
```

---

## 🎯 Примеры использования

### Открытие меню доната

**Через консоль:**
```
donate
```

**Через чат:**
```lua
hook.Add("PlayerSay", "DONATION_ChatCommand", function(ply, text)
    if string.lower(text) == "!donate" or string.lower(text) == "!донат" then
        ply:ConCommand("donate")
        return ""
    end
end)
```

**Через F4 меню (DarkRP):**
```lua
-- В DarkRP F4 меню добавить кнопку:
local donateButton = vgui.Create("DButton", panel)
donateButton:SetText("💰 Пополнить баланс")
donateButton.DoClick = function()
    RunConsoleCommand("donate")
end
```

---

### Проверка баланса игрока (серверная)

```lua
-- Получить баланс игрока
DONATION.GetPlayerBalance(ply, function(balance)
    print("Баланс игрока " .. ply:Nick() .. ": " .. balance)
    
    -- Проверка на VIP
    if balance >= 1000 then
        ply:SetUserGroup("vip")
    end
end)
```

---

### Списание донат-валюты

```lua
-- Функция списания
function DONATION.TakeBalance(ply, amount, reason, callback)
    DONATION.GetPlayerBalance(ply, function(current_balance)
        if current_balance >= amount then
            -- Здесь нужно создать функцию в backend для списания
            -- Пока что обновляем локальный кэш
            DONATION.PlayerBalances[ply:SteamID64()] = current_balance - amount
            
            ply:ChatPrint("[ДОНАТ] Списано " .. amount .. " донат-валюты. Причина: " .. reason)
            
            if callback then callback(true) end
        else
            ply:ChatPrint("[ДОНАТ] Недостаточно средств! Нужно: " .. amount .. ", есть: " .. current_balance)
            if callback then callback(false) end
        end
    end)
end

-- Использование
DONATION.TakeBalance(ply, 500, "Покупка VIP статуса", function(success)
    if success then
        ply:SetUserGroup("vip")
        ply:ChatPrint("[VIP] Вы получили VIP статус!")
    end
end)
```

---

## 🧪 Тестирование

### 1. Тестовый режим YooKassa

В кабинете YooKassa включите тестовый режим:
1. https://yookassa.ru/my/merchant/integration/settings
2. Включить "Тестовый режим"

**Тестовые карты:**
- `5555 5555 5555 4477` — успешная оплата
- `5555 5555 5555 4444` — отклоненная оплата
- CVC: любые 3 цифры
- Срок: любая будущая дата

### 2. Проверка через консоль GMod

```lua
-- Проверить конфигурацию
lua_run_cl PrintTable(DONATION.Config)

-- Проверить баланс
lua_run DONATION.GetPlayerBalance(player.GetByID(1), function(b) print("Balance:", b) end)

-- Открыть меню
donate
```

### 3. Проверка API вручную

**PowerShell:**
```powershell
# Получить баланс
$steamId = "76561198000000001"
$response = Invoke-RestMethod -Uri "https://functions.poehali.dev/1b8eeb2b-1f5a-4296-90cf-5737f596b55f?steam_id=$steamId"
$response | ConvertTo-Json
```

**curl:**
```bash
# Получить баланс
curl "https://functions.poehali.dev/1b8eeb2b-1f5a-4296-90cf-5737f596b55f?steam_id=76561198000000001"

# Создать платеж
curl -X POST "https://functions.poehali.dev/5af93bd2-a1ec-4d87-af66-f2bc997d7791" \
  -H "Content-Type: application/json" \
  -d '{"steam_id":"76561198000000001","amount":500}'
```

---

## ⚠️ Частые проблемы и решения

### Баланс не зачисляется

**Причина:** Не настроен webhook в YooKassa

**Решение:**
1. Проверьте https://yookassa.ru/my/merchant/integration/http-notifications
2. URL должен быть: `https://functions.poehali.dev/80327d36-1166-490c-94ee-5bd1216b7716`
3. Все события должны быть отмечены галочками

---

### Ошибка "Payment system not configured"

**Причина:** Не добавлены секреты YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY

**Решение:**
Добавьте секреты в настройках проекта на poehali.dev

---

### Игрок не находится на сервере при оплате

**Причина:** Система пока не проверяет онлайн статус

**Решение:**
Баланс зачисляется в любом случае. При следующем входе игрок получит свои средства. Если нужна проверка онлайна, можно добавить в будущем.

---

### Браузер не открывается

**Причина:** У игрока отключены HTML-панели в настройках GMod

**Решение:**
Попросите игрока включить HTML-панели в настройках игры или использовать альтернативный способ:
```lua
-- Вместо gui.OpenURL используйте копирование в буфер
SetClipboardText(url)
ply:ChatPrint("[ДОНАТ] Ссылка скопирована в буфер обмена! Вставьте в браузер.")
```

---

## 📊 База данных

### Таблица players

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | SERIAL | Уникальный ID |
| `steam_id` | VARCHAR(255) | Steam ID64 игрока |
| `balance` | INTEGER | Текущий баланс |
| `total_donated` | INTEGER | Всего пополнено за все время |
| `last_online` | TIMESTAMP | Последний вход |
| `created_at` | TIMESTAMP | Дата регистрации |
| `updated_at` | TIMESTAMP | Последнее обновление |

### Таблица orders

| Колонка | Тип | Описание |
|---------|-----|----------|
| `id` | SERIAL | Уникальный ID заказа |
| `order_number` | VARCHAR(50) | Номер заказа (DONATE-...) |
| `steam_id` | VARCHAR(255) | Steam ID64 игрока |
| `amount` | DECIMAL(10,2) | Сумма платежа |
| `yookassa_payment_id` | VARCHAR(100) | ID платежа в YooKassa |
| `status` | VARCHAR(20) | pending/paid/canceled |
| `payment_url` | TEXT | Ссылка на оплату |
| `created_at` | TIMESTAMP | Создан |
| `paid_at` | TIMESTAMP | Оплачен |

---

## 🎉 Готово!

Теперь у вас есть полностью рабочая донат-система:

✅ Игроки могут пополнять баланс прямо из игры  
✅ Автоматическое зачисление через webhook  
✅ Безопасные платежи через ЮKassa  
✅ Курс 1₽ = 1 донат-валюта  
✅ Минимум код — максимум функционала  

**Нужна помощь?** Пиши в Discord: https://discord.gg/jXuuBA9GXr
