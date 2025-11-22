export type GitHubConfig = {
  owner: string;
  repo: string;
};

/**
 * Gets GitHub configuration from environment variables.
 *
 * @returns GitHub configuration object.
 */
export function getGitHubConfig(): GitHubConfig {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!owner || !repo) {
    throw new Error(
      'GITHUB_OWNER and GITHUB_REPO environment variables must be set'
    );
  }

  return { owner, repo };
}
