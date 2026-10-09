# Private analysis backend

Cloudflare Worker is deployed at https://research-hub-api.diozeng157762802.workers.dev
using the owner's existing local Wrangler OAuth login. The private KV namespace is
bound and both access/encryption secrets are configured. Live health, authorized config
and report listing pass; unauthenticated access returns 401 and foreign origins 403.
Owner provider keys are not configured, so real provider analysis remains unverified.

Before publishing, set two independent secrets: `ADMIN_TOKEN` (a random private access
password) and `ENCRYPTION_KEY` (32 random bytes encoded as base64). Never commit them.
`STATE` points at the prepared KV namespace in wrangler.jsonc. Requests fail closed until
both secrets exist. Authenticated settings writes validate provider keys before saving.
Provider keys and reports are encrypted with AES-GCM in KV; the report list shows the
latest 15 independently stored reports without a shared read-modify-write index. GET configuration
returns only status flags and the selected model. Model settings are shared across all
five adapted text workflows, not copied into browser storage or third-party websites.

For local verification: `node backend/local.js`. It listens only on 127.0.0.1:8787 and
uses private files under `~/.codex/private/research-hub`, outside the repository.
Use the generated ADMIN_TOKEN to connect the settings form. This does not provide
cross-device or always-on service.

Supported models match the DeepSeek documentation checked on 2026-10-09:
`deepseek-flash` and `deepseek-v4-pro`. All workflows are text-only. Doctor is an adapted
text diagnosis workflow inspired by JuneYaooo/social-account-doctor, not the upstream
multimodal skill or its automatic platform search. CreatorHub's actual crawler still
requires a running browser host and platform login. SocialEcho uses its separate Team API
Key and read-only `/v1/team`, `/v1/account`, `/v1/article` endpoints; first-page scope is
explicit. No platform publishing or messaging is implemented.

Sources: https://api-docs.deepseek.com/ ;
https://help.socialecho.net/docs/socialecho-openapi-docs ;
https://github.com/JuneYaooo/social-account-doctor ;
https://github.com/3441293738/creatorhub .
