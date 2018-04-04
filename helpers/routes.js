var serviceExternalGitHubUrl = `http://localhost:3000`
var serviceGitHubUrl = `http://localhost:3001`
var serviceProjectSettingsUrl = `http://localhost:3002`
var serviceFeaturesUrl = `http://localhost:3003`
var serviceTagCacheUrl = `http://localhost:3004`
var serviceNameCacheUrl = `http://localhost:3005`
var serviceStepCacheUrl = `http://localhost:3006`

// Helper enrivonment variables to overwrite service URLS.
// For example when doing integration tests on CircleCI because
// services will share 172.20.0.1 and not 127.0.0.1.
if (process.env.EXTERNAL_GUTHUB_URL) serviceExternalGitHubUrl = process.env.EXTERNAL_GUTHUB_URL
if (process.env.INTERNAL_GUTHUB_URL) serviceGitHubUrl = process.env.INTERNAL_GUTHUB_URL
if (process.env.INTERNAL_PROJECT_SETTINGS_URL) serviceProjectSettingsUrl = process.env.INTERNAL_PROJECT_SETTINGS_URL
if (process.env.INTERNAL_FEATURES_URL) serviceFeaturesUrl = process.env.INTERNAL_FEATURES_URL
if (process.env.INTERNAL_TAG_CACHE_URL) serviceTagCacheUrl = process.env.INTERNAL_TAG_CACHE_URL
if (process.env.INTERNAL_NAME_CACHE_URL) serviceNameCacheUrl = process.env.INTERNAL_NAME_CACHE_URL
if (process.env.INTERNAL_STEP_CACHE_URL) serviceStepCacheUrl = process.env.INTERNAL_STEP_CACHE_URL

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  serviceExternalGitHubUrl = 'github.behave.pro'
  serviceGitHubUrl = 'github.behave.internal'
  serviceProjectSettingsUrl = 'project-settings.behave.internal'
  serviceFeaturesUrl = 'features-manager.behave.internal'
  serviceTagCacheUrl = 'tag-cache.behave.internal'
  serviceNameCacheUrl = 'name-cache.behave.internal'
  serviceStepCacheUrl = 'step-cache.behave.internal'
}

module.exports = {
  EXTERNAL_GITHUB_HEALTHCHECK: `${serviceExternalGitHubUrl}/REST/1.0/healthcheck`,
  EXTERNAL_GITHUB_WEBHOOK: `${serviceExternalGitHubUrl}/REST/1.0/hook`,
  INTERNAL_GITHUB_HEALTHCHECK: `${serviceGitHubUrl}/REST/1.0/healthcheck`,
  INTERNAL_GITHUB_CONTENTS: `${serviceGitHubUrl}/REST/1.0/contents`,
  INTERNAL_GITHUB_REPOSITORIES: `${serviceGitHubUrl}/REST/1.0/repositories`,
  INTERNAL_GITHUB_VALIDATE_PATH: `${serviceGitHubUrl}/REST/1.0/installation/validate`,
  INTERNAL_GITHUB_UPDATE_TENANT: `${serviceGitHubUrl}/REST/1.0/tenant`,
  INTERNAL_PROJECT_SETTINGS_HEALTHCHECK: `${serviceProjectSettingsUrl}/REST/1.0/healthcheck`,
  INTERNAL_PROJECT_SETTINGS: `${serviceProjectSettingsUrl}/REST/1.0/project/settings`,
  INTERNAL_PROJECT_SETTINGS_DELETE_BY_INSTALLATION: `${serviceProjectSettingsUrl}/REST/1.0/project/settings/installation`,
  INTERNAL_FEATURES_HEALTHCHECK: `${serviceFeaturesUrl}/REST/1.0/healthcheck`,
  INTERNAL_FEATURES_FEATURE: `${serviceFeaturesUrl}/REST/1.0/feature`,
  INTERNAL_FEATURES_FEATURE_ALL: `${serviceFeaturesUrl}/REST/1.0/feature/all`,
  INTERNAL_FEATURES_FEATURE_EXPORT: `${serviceFeaturesUrl}/REST/1.0/feature/export`,
  INTERNAL_FEATURES_SCENARIO: `${serviceFeaturesUrl}/REST/1.0/scenario`,
  INTERNAL_FEATURES_SCENARIO_ALL: `${serviceFeaturesUrl}/REST/1.0/scenario/all`,
  INTERNAL_FEATURES_SCENARIO_DUPLICATE: `${serviceFeaturesUrl}/REST/1.0/scenario/duplicate`,
  INTERNAL_FEATURES_SCENARIO_MOVE: `${serviceFeaturesUrl}/REST/1.0/scenario/move`,
  INTERNAL_TAG_CACHE_HEALTHCHECK: `${serviceTagCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_TAG_CACHE: `${serviceTagCacheUrl}/REST/1.0/tags`,
  INTERNAL_TAG_CACHE_ALL: `${serviceTagCacheUrl}/REST/1.0/tags/all`,
  INTERNAL_TAG_CACHE_WEBHOOK: `${serviceTagCacheUrl}/REST/1.0/webhook`,
  INTERNAL_TAG_CACHE_PROJECT_TAGS: `${serviceTagCacheUrl}/REST/1.0/project/tags`,
  INTERNAL_NAME_CACHE_ALL: `${serviceNameCacheUrl}/REST/1.0/query/all`,
  INTERNAL_NAME_CACHE_HEALTHCHECK: `${serviceNameCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_NAME_CACHE_WEBHOOK: `${serviceNameCacheUrl}/REST/1.0/webhook`,
  INTERNAL_NAME_CACHE: `${serviceNameCacheUrl}/REST/1.0/query`,
  INTERNAL_STEP_CACHE_HEALTHCHECK: `${serviceStepCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_STEP_CACHE: `${serviceStepCacheUrl}/REST/1.0/steps`,
  INTERNAL_STEP_CACHE_PREDICT: `${serviceStepCacheUrl}/REST/1.0/steps/predict`,
  INTERNAL_STEP_CACHE_WEBHOOK: `${serviceStepCacheUrl}/REST/1.0/webhook`
}
