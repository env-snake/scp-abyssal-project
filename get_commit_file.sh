#!/bin/bash
git show c729e67:src/pages/Donate.tsx > /tmp/donate_restored.tsx 2>&1
cat /tmp/donate_restored.tsx
