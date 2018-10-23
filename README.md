# Behave Pro Microservice helpers

## Using the internal NPM registry
NPM packages internal to Hindsight Software are published under the scope `@hindsightsoftware` and you need to tell NPM where it can fetch packages under this scope. The registry for the scope is also private and requires authenication via Bintray

```
npm config set @hindsightsoftware:registry https://api.bintray.com/npm/hindsightsoftware/npm-internal
RUN curl -u bintry_username:bintray_api_key https://api.bintray.com/npm/hindsightsoftware/npm-internal/auth/scope/hindsightsoftware > ~/.npmrc
```

## Publishing
Publishing is control using git tags, simple update the `package.json` version, commit, create and push a new git tag

```
git tag -a v0.1.1 -m "Version 0.1.1"
git push origin v0.1.1
```