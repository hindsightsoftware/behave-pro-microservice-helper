var serviceGitHubUrl = `http://localhost:3001`
var serviceProjectSettingsUrl = `http://localhost:3002`
var serviceFeaturesUrl = `http://localhost:3003`
var serviceTagCacheUrl = `http://localhost:3004`
var serviceNameCacheUrl = `http://localhost:3005`

// Helper enrivonment variables to overwrite service URLS.
// For example when doing integration tests on CircleCI because
// services will share 172.20.0.1 and not 127.0.0.1.
if (process.env.INTERNAL_GUTHUB_URL) serviceGitHubUrl = process.env.INTERNAL_GUTHUB_URL
if (process.env.INTERNAL_PROJECT_SETTINGS_URL) serviceProjectSettingsUrl = process.env.INTERNAL_PROJECT_SETTINGS_URL
if (process.env.INTERNAL_FEATURES_URL) serviceFeaturesUrl = process.env.INTERNAL_FEATURES_URL
if (process.env.INTERNAL_TAG_CACHE_URL) serviceTagCacheUrl = process.env.INTERNAL_TAG_CACHE_URL
if (process.env.INTERNAL_NAME_CACHE_URL) serviceNameCacheUrl = process.env.INTERNAL_NAME_CACHE_URL

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  serviceGitHubUrl = 'github.behave.pro'
  serviceProjectSettingsUrl = 'project-settings.behave.pro'
  serviceTagCacheUrl = 'tag-cache.behave.pro'
  serviceNameCacheUrl = 'name-cache.behave.pro'
}

module.exports = {
  INTERNAL_GITHUB_CONTENTS: `${serviceGitHubUrl}/REST/1.0/contents`,
  INTERNAL_PROJECT_SETTINGS: `${serviceProjectSettingsUrl}/REST/1.0/project/settings`,
  INTERNAL_FEATURES_FEATURE: `${serviceFeaturesUrl}/REST/1.0/feature`,
  INTERNAL_FEATURES_FEATURE_ALL: `${serviceFeaturesUrl}/REST/1.0/feature/all`,
  INTERNAL_FEATURES_FEATURE_EXPORT: `${serviceFeaturesUrl}/REST/1.0/feature/export`,
  INTERNAL_FEATURES_SCENARIO: `${serviceFeaturesUrl}/REST/1.0/scenario`,
  INTERNAL_FEATURES_SCENARIO_ALL: `${serviceFeaturesUrl}/REST/1.0/scenario/all`,
  INTERNAL_FEATURES_SCENARIO_DUPLICATE: `${serviceFeaturesUrl}/REST/1.0/scenario/duplicate`,
  INTERNAL_FEATURES_SCENARIO_MOVE: `${serviceFeaturesUrl}/REST/1.0/scenario/move`,
  INTERNAL_TAG_CACHE: `${serviceTagCacheUrl}/REST/1.0/tags`,
  INTERNAL_TAG_CACHE_ALL: `${serviceTagCacheUrl}/REST/1.0/tags/all`,
  INTERNAL_NAME_CACHE_ALL: `${serviceNameCacheUrl}/REST/1.0/query/all`,
  INTERNAL_NAME_CACHE: `${serviceNameCacheUrl}/REST/1.0/query`
}
