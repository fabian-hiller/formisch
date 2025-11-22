import path from 'node:path';
import { getPackageInfos, getProjectRoot } from './utils';

// Get the root directory
const ROOT_DIR = getProjectRoot();

// Package paths
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');
const FRAMEWORKS_DIR = path.join(ROOT_DIR, 'frameworks');

/**
 * Checks and displays package versions.
 */
function checkVersions() {
  console.log('📦 Formisch Package Versions\n');
  console.log('='.repeat(80));

  // Display core packages
  console.log('\n🔧 Core Packages:');
  console.log('-'.repeat(80));
  const corePackages = getPackageInfos(PACKAGES_DIR);

  if (corePackages.length === 0) {
    console.log('  No packages found');
  } else {
    for (const pkg of corePackages) {
      console.log(`  ${pkg.name.padEnd(30)} v${pkg.version}`);
    }
  }

  // Display framework packages
  console.log('\n🎨 Framework Packages:');
  console.log('-'.repeat(80));
  const frameworkPackages = getPackageInfos(FRAMEWORKS_DIR);

  if (frameworkPackages.length === 0) {
    console.log('  No packages found');
  } else {
    for (const pkg of frameworkPackages) {
      console.log(`  ${pkg.name.padEnd(30)} v${pkg.version}`);
    }
  }

  // Display summary
  console.log('\n📈 Summary:');
  console.log('-'.repeat(80));
  console.log(
    `  Total packages: ${corePackages.length + frameworkPackages.length}`
  );
  console.log(`  Core packages: ${corePackages.length}`);
  console.log(`  Framework packages: ${frameworkPackages.length}`);

  console.log('\n' + '='.repeat(80));
  console.log('\n💡 Tip: Run "pnpm create-releases" to create GitHub releases');
  console.log('   for all framework packages.\n');
}

// Run the script
checkVersions();
