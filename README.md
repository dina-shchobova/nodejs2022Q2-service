# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading
1. Change the current working directory to the location where you want the cloned directory.
2. Clone a repo
```
git clone git@github.com:dina-shchobova/nodejs2022Q2-service.git
```
3. Go to development branch 
```
git checkout develop
```

### Installing NPM modules

```
npm install
```

### Running application

```
docker compose up 
```
or
```
npm run docker:compose
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Scanning application

```
npm run scan 
```

### Auto-fix and format

```
npm run lint
```

### Running test auth

```
npm run test:auth 
```
