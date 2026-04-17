---
name: No "module" as variable name
description: Avoid using "module" as a variable name anywhere in the codebase
type: feedback
---

Do not use `module` as a variable name. It shadows the global and is confusing in an ESM codebase.

**Why:** User explicitly flagged this. The word "module" should be avoided as a variable/parameter name throughout the project.

**How to apply:** When naming a variable that holds a sim definition, use `sim` instead. For other contexts, use a descriptive name like `entry`, `definition`, etc.
