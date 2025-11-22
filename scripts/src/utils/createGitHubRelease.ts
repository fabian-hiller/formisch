import { getGitHubClient } from './getGitHubClient';
import { getGitHubConfig } from './getGitHubConfig';

/**
 * Release config type.
 */
export type ReleaseConfig = {
  packageName: string;
  version: string;
  tagName: string;
  releaseName: string;
  body: string;
};

/**
 * Creates a GitHub release.
 *
 * @param releaseConfig The release configuration.
 *
 * @returns True if release was created successfully, false otherwise.
 */
export async function createGitHubRelease(
  releaseConfig: ReleaseConfig
): Promise<boolean> {
  try {
    const octokit = getGitHubClient();
    const { owner, repo } = getGitHubConfig();
    await octokit.repos.createRelease({
      owner,
      repo,
      tag_name: releaseConfig.tagName,
      name: releaseConfig.releaseName,
      body: releaseConfig.body,
      draft: false,
      prerelease: false,
    });
    console.log(`✅ Created release: ${releaseConfig.tagName}`);
    return true;
  } catch (error: unknown) {
    console.error(
      `❌ Failed to create release ${releaseConfig.tagName}:`,
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
