var serviceGitHubUrl = 'http://localhost:3001'
var serviceProjectSettingsUrl = 'http://localhost:3002'
var serviceTagCacheUrl = 'http://localhost:3004'
var serviceNameCacheUrl = 'http://localhost:3005'

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  serviceGitHubUrl = 'github.behave.pro'
  serviceProjectSettingsUrl = 'project-settings.behave.pro'
  serviceTagCacheUrl = 'tag-cache.behave.pro'
  serviceNameCacheUrl = 'name-cache.behave.pro'
}

module.exports = {
  INTERNAL_GITHUB_CONTENTS: `${serviceGitHubUrl}/REST/1.0/contents`,
  INTERNAL_PROJECT_SETTINGS: `${serviceProjectSettingsUrl}/REST/1.0/project/settings`,
  INTERNAL_TAG_CACHE: `${serviceTagCacheUrl}/REST/1.0/tags`,
  INTERNAL_TAG_CACHE_ALL: `${serviceTagCacheUrl}/REST/1.0/tags/all`,
  INTERNAL_NAME_CACHE_ALL: `${serviceNameCacheUrl}/REST/1.0/query/all`,
  INTERNAL_NAME_CACHE: `${serviceNameCacheUrl}/REST/1.0/query`
}
