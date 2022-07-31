# Home Library Service

### Downloading
1. Change the current working directory to the location where you want the cloned directory.
2. Clone a repo
```
git clone git@github.com:dina-shchobova/nodejs2022Q2-service.git
```
3. Go to containerization-dev branch 
```
git checkout containerization-dev
```

### Installing NPM modules

```
npm install
```

### Running application

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
