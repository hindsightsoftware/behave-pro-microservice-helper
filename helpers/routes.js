var serviceGitHubUrl = 'http://localhost:3001'
var serviceProjectSettingsUrl = 'http://localhost:3002'

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  serviceGitHubUrl = 'github.behave.pro'
  serviceProjectSettingsUrl = 'project-settings.behave.pro'
}

module.exports = {
  INTERNAL_GITHUB_CONTENTS: `${serviceGitHubUrl}/REST/1.0/contents`,
  INTERNAL_PROJECT_SETTINGS: `${serviceProjectSettingsUrl}/REST/1.0/project/settings`
}
