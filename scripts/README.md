# Formisch Scripts

Maintenance and automation scripts for the Formisch repository.

## Setup

1. Install dependencies: `pnpm install`
2. Get a GitHub Personal Access Token with Contents (read/write) permissions
3. Create `.env.local` with GitHub info:
   ```
   GITHUB_OWNER=fabian-hiller
   GITHUB_REPO=formisch
   GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
   ```

## Scripts

### Check Versions

```bash
pnpm check-versions
```

Displays current versions of all packages in the monorepo.

### Create Releases

```bash
pnpm create-releases
```

Creates GitHub releases for framework packages.
