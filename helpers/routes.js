var serviceExternalGitHubUrl = `http://localhost:3000`
var serviceGitHubUrl = `http://localhost:3001`
var serviceProjectSettingsUrl = `http://localhost:3002`
var serviceFeaturesUrl = `http://localhost:3003`
var serviceTagCacheUrl = `http://localhost:3004`
var serviceNameCacheUrl = `http://localhost:3005`
var serviceStepCacheUrl = `http://localhost:3006`
var serviceJiraInternalGatewayUrl = `http://localhost:3007`
var serviceIssueManagerUrl = `http://localhost:3008`
var serviceSyncManagerUrl = `http://localhost:3009`
var serviceAnalyticsUrl = `http://localhost:3010`
var serviceImportManagerUrl = `http://localhost:3011`
var serviceJobManagerUrl = `http://localhost:3012`

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
if (process.env.INTERNAL_JIRA_GATEWAY_URL) serviceJiraInternalGatewayUrl = process.env.INTERNAL_JIRA_GATEWAY_URL
if (process.env.INTERNAL_ISSUE_MANAGER_URL) serviceIssueManagerUrl = process.env.INTERNAL_ISSUE_MANAGER_URL
if (process.env.INTERNAL_SYNC_MANAGER_URL) serviceSyncManagerUrl = process.env.INTERNAL_SYNC_MANAGER_URL
if (process.env.INTERNAL_ANALYTICS_URL) serviceAnalyticsUrl = process.env.INTERNAL_ANALYTICS_URL
if (process.env.INTERNAL_IMPORT_MANAGER_URL) serviceImportManagerUrl = process.env.INTERNAL_IMPORT_MANAGER_URL
if (process.env.INTERNAL_JOB_MANAGER_URL) serviceJobManagerUrl = process.env.INTERNAL_JOB_MANAGER_URL

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  serviceExternalGitHubUrl = 'https://github.behave.pro'
  serviceGitHubUrl = 'https://github.behave.internal'
  serviceProjectSettingsUrl = 'https://project-settings.behave.internal'
  serviceFeaturesUrl = 'https://feature-manager.behave.internal'
  serviceTagCacheUrl = 'https://tag-cache.behave.internal'
  serviceNameCacheUrl = 'https://name-cache.behave.internal'
  serviceStepCacheUrl = 'https://step-cache.behave.internal'
  serviceJiraInternalGatewayUrl = 'https://jira-gateway.behave.internal'
  serviceIssueManagerUrl = 'https://issue-manager.behave.internal'
  serviceSyncManagerUrl = 'https://sync-manager.behave.internal'
  serviceAnalyticsUrl = 'https://analytics.behave.internal'
  serviceImportManagerUrl = 'https://import-manager.behave.internal'
  serviceJobManagerUrl = 'https://job-manager.behave.internal'
}

module.exports = {
  EXTERNAL_GITHUB: `${serviceExternalGitHubUrl}`,
  EXTERNAL_GITHUB_HEALTHCHECK: `${serviceExternalGitHubUrl}/REST/1.0/healthcheck`,
  EXTERNAL_GITHUB_WEBHOOK: `${serviceExternalGitHubUrl}/REST/1.0/hook`,
  INTERNAL_GITHUB: `${serviceGitHubUrl}`,
  INTERNAL_GITHUB_HEALTHCHECK: `${serviceGitHubUrl}/REST/1.0/healthcheck`,
  INTERNAL_GITHUB_CONTENTS: `${serviceGitHubUrl}/REST/1.0/contents`,
  INTERNAL_GITHUB_BULK_CONTENTS: `${serviceGitHubUrl}/REST/1.0/bulk/contents`,
  INTERNAL_GITHUB_REPOSITORIES: `${serviceGitHubUrl}/REST/1.0/repositories`,
  INTERNAL_GITHUB_VALIDATE_PATH: `${serviceGitHubUrl}/REST/1.0/installation/validate`,
  INTERNAL_GITHUB_UPDATE_TENANT: `${serviceGitHubUrl}/REST/1.0/tenant`,
  INTERNAL_GITHUB_GET_TENANT: `${serviceGitHubUrl}/REST/1.0/tenant`,
  INTERNAL_GITHUB_PAYLOAD: `${serviceGitHubUrl}/REST/1.0/payload`,
  INTERNAL_PROJECT: `${serviceProjectSettingsUrl}`,
  INTERNAL_PROJECT_SETTINGS_HEALTHCHECK: `${serviceProjectSettingsUrl}/REST/1.0/healthcheck`,
  INTERNAL_PROJECT_SETTINGS: `${serviceProjectSettingsUrl}/REST/1.0/project/settings`,
  INTERNAL_PROJECT_SETTINGS_DELETE_BY_INSTALLATION: `${serviceProjectSettingsUrl}/REST/1.0/project/settings/installation`,
  INTERNAL_PROJECT_SETTINGS_FIND_BY_INSTALLATION: `${serviceProjectSettingsUrl}/REST/1.0/project/settings/installation`,
  INTERNAL_FEATURES: `${serviceFeaturesUrl}`,
  INTERNAL_FEATURES_HEALTHCHECK: `${serviceFeaturesUrl}/REST/1.0/healthcheck`,
  INTERNAL_FEATURES_FEATURE: `${serviceFeaturesUrl}/REST/1.0/feature`,
  INTERNAL_FEATURES_FEATURE_ALL: `${serviceFeaturesUrl}/REST/1.0/feature/all`,
  INTERNAL_FEATURES_FEATURE_EXPORT: `${serviceFeaturesUrl}/REST/1.0/feature/export`,
  INTERNAL_FEATURES_SCENARIO: `${serviceFeaturesUrl}/REST/1.0/scenario`,
  INTERNAL_FEATURES_SCENARIO_ISSUE_LINK: `${serviceFeaturesUrl}/REST/1.0/scenario/issue/link`,
  INTERNAL_FEATURES_SCENARIO_ISSUE_UNLINK: `${serviceFeaturesUrl}/REST/1.0/scenario/issue/unlink`,
  INTERNAL_FEATURES_SCENARIO_ALL: `${serviceFeaturesUrl}/REST/1.0/scenario/all`,
  INTERNAL_FEATURES_SCENARIO_DUPLICATE: `${serviceFeaturesUrl}/REST/1.0/scenario/duplicate`,
  INTERNAL_FEATURES_SCENARIO_MOVE: `${serviceFeaturesUrl}/REST/1.0/scenario/move`,
  INTERNAL_FEATURES_BULK: `${serviceFeaturesUrl}/REST/1.0/bulk/features`,
  INTERNAL_FEATURES_WEBHOOK: `${serviceFeaturesUrl}/REST/1.0/webhook`,
  INTERNAL_TAG_CACHE: `${serviceTagCacheUrl}`,
  INTERNAL_TAG_CACHE_HEALTHCHECK: `${serviceTagCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_TAG_CACHE: `${serviceTagCacheUrl}/REST/1.0/tags`,
  INTERNAL_TAG_CACHE_ALL: `${serviceTagCacheUrl}/REST/1.0/tags/all`,
  INTERNAL_TAG_CACHE_WEBHOOK: `${serviceTagCacheUrl}/REST/1.0/webhook`,
  INTERNAL_TAG_CACHE_PROJECT_TAGS: `${serviceTagCacheUrl}/REST/1.0/project/tags`,
  INTERNAL_NAME_CACHE: `${serviceNameCacheUrl}`,
  INTERNAL_NAME_CACHE_ALL: `${serviceNameCacheUrl}/REST/1.0/query/all`,
  INTERNAL_NAME_CACHE_HEALTHCHECK: `${serviceNameCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_NAME_CACHE_WEBHOOK: `${serviceNameCacheUrl}/REST/1.0/webhook`,
  INTERNAL_NAME_CACHE: `${serviceNameCacheUrl}/REST/1.0/query`,
  INTERNAL_STEP_CACHE: `${serviceStepCacheUrl}`,
  INTERNAL_STEP_CACHE_HEALTHCHECK: `${serviceStepCacheUrl}/REST/1.0/healthcheck`,
  INTERNAL_STEP_CACHE: `${serviceStepCacheUrl}/REST/1.0/steps`,
  INTERNAL_STEP_CACHE_PREDICT: `${serviceStepCacheUrl}/REST/1.0/steps/predict`,
  INTERNAL_STEP_CACHE_WEBHOOK: `${serviceStepCacheUrl}/REST/1.0/webhook`,
  INTERNAL_JIRA_GATEWAY: `${serviceJiraInternalGatewayUrl}`,
  INTERNAL_JIRA_GATEWAY_HEALTHCHECK: `${serviceJiraInternalGatewayUrl}/REST/1.0/healthcheck`,
  INTERNAL_JIRA_GATEWAY_HOST: `${serviceJiraInternalGatewayUrl}/REST/1.0/host`,
  INTERNAL_JIRA_GATEWAY_ISSUE: `${serviceJiraInternalGatewayUrl}/REST/1.0/issue`,
  INTERNAL_JIRA_GATEWAY_PROJECT: `${serviceJiraInternalGatewayUrl}/REST/1.0/project`,
  INTERNAL_ISSUE_MANAGER: `${serviceIssueManagerUrl}`,
  INTERNAL_ISSUE_MANAGER_HEALTHCHECK: `${serviceIssueManagerUrl}/REST/1.0/healthcheck`,
  INTERNAL_ISSUE_MANAGER_ISSUE: `${serviceIssueManagerUrl}/REST/1.0/issue`,
  INTERNAL_ISSUE_MANAGER_ISSUE_SYNC: `${serviceIssueManagerUrl}/REST/1.0/issue/sync`,
  INTERNAL_ISSUE_MANAGER_SCENARIO: `${serviceIssueManagerUrl}/REST/1.0/issue/scenario`,
  INTERNAL_ISSUE_MANAGER_SCENARIO_ALL: `${serviceIssueManagerUrl}/REST/1.0/issue/scenario/all`,
  INTERNAL_ISSUE_MANAGER_WEBHOOK: `${serviceIssueManagerUrl}/REST/1.0/webhook`,
  INTERNAL_SYNC_MANAGER: `${serviceSyncManagerUrl}`,
  INTERNAL_SYNC_MANAGER_BULK_FEATURES: `${serviceSyncManagerUrl}/REST/1.0/bulk/features`,
  INTERNAL_SYNC_MANAGER_HEALTHCHECK: `${serviceSyncManagerUrl}/REST/1.0/healthcheck`,
  INTERNAL_ANALYTICS: `${serviceAnalyticsUrl}`,
  INTERNAL_ANALYTICS_HEALTHCHECK: `${serviceAnalyticsUrl}/REST/1.0/healthcheck`,
  INTERNAL_IMPORT_MANAGER: `${serviceImportManagerUrl}/REST/1.0/`,
  INTERNAL_JOB_MANAGER_URL: `${serviceJobManagerUrl}/REST/1.0`
}
