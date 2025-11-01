import { getGitHubClient } from './getGitHubClient';
import { getGitHubConfig } from './getGitHubConfig';

/**
 * Checks if a GitHub release already exists for a given tag.
 *
 * @param tagName The tag name to check.
 *
 * @returns True if release exists, false otherwise.
 */
export async function hasGitHubRelease(tagName: string): Promise<boolean> {
  try {
    const octokit = getGitHubClient();
    const { owner, repo } = getGitHubConfig();
    await octokit.repos.getReleaseByTag({
      owner,
      repo,
      tag: tagName,
    });
    return true;
  } catch (error: unknown) {
    // 404 means release does not exist
    if (error instanceof Error && 'status' in error && error.status === 404) {
      return false;
    }
    throw error;
  }
}
