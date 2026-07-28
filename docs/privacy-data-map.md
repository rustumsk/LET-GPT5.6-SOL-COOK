# Privacy data map

## Validation asset

| Field                                         | Purpose                            | Storage                       | Access            | Retention             | Deletion          | Third parties |
| --------------------------------------------- | ---------------------------------- | ----------------------------- | ----------------- | --------------------- | ----------------- | ------------- |
| Project value, hours, rate, request frequency | Calculate estimated margin leakage | Browser memory only           | Visitor           | Page session          | Close/reload page | None          |
| Optional change description                   | Render preview                     | Browser memory only           | Visitor           | Page session          | Clear/close page  | None          |
| Aggregate local analytics event               | Development verification           | Browser console in local mode | Developer/visitor | Session/log lifecycle | Clear console     | None          |
| Optional aggregate funnel event name          | Production learning when enabled   | Plausible event stream        | Operator/provider | Provider retention    | Provider controls | Plausible     |

No names, email addresses, client data, cookies, or sensitive data are collected in the first asset. If Plausible is enabled, ScopeSignal sends only aggregate page/event names; calculator inputs and change descriptions still remain local. The live privacy notice must stay linked, and browser Do Not Track / Global Privacy Control must continue to disable event collection.
