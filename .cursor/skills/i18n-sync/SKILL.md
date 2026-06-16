---
name: i18n-sync
description: Validates and synchronizes vi/en translation key parity across all i18n namespaces. Use when adding or editing translation keys, fixing missing locale strings, or before shipping UI changes with new text.
---

# i18n Sync

## Quick check

```bash
node scripts/i18n-check.mjs
```

Script location: [scripts/i18n-check.mjs](../../scripts/i18n-check.mjs)

Checks all 9 namespaces defined in `src/i18n/config.ts` for key parity between `src/locales/vi/` and `src/locales/en/`.

## When adding new UI text

1. Choose the correct namespace (`pages`, `nav`, `common`, etc.)
2. Add the key to **both** `src/locales/vi/{ns}.json` and `src/locales/en/{ns}.json`
3. Use nested objects for grouping: `"heroes": { "title": "..." }`
4. Reference in code: `t("heroes.title")` with `useTranslation("pages")`
5. Run the check script — fix any reported mismatches

## Nested keys

The script flattens nested JSON keys (e.g. `heroes.title`). Both locale files must have identical key trees.

## Common fixes

| Error | Fix |
|-------|-----|
| Missing in en | Add English translation to matching `en/{ns}.json` |
| Missing in vi | Add Vietnamese translation to matching `vi/{ns}.json` |
| Wrong namespace | Move key to correct namespace file and update `useTranslation()` call |

## After fixing

Re-run until output shows all namespaces in sync, then run `npm run lint`.
