import { Octokit } from '@octokit/rest';

// Global Octokit instance for lazy initialization
let octokitInstance: Octokit | null = null;

/**
 * Gets a lazily initialized Octokit instance with authentication.
 *
 * @returns Configured Octokit instance.
 */
export function getGitHubClient(): Octokit {
  if (octokitInstance) {
    return octokitInstance;
  }

  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      'GITHUB_PERSONAL_ACCESS_TOKEN environment variable is not set'
    );
  }

  octokitInstance = new Octokit({
    auth: token,
    log: {
      debug: () => {},
      info: () => {},
      warn: console.warn,
      error: console.error,
    },
  });

  return octokitInstance;
}
