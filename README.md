# PAC VoThing Client

## Development Setup
- Install Node (6.2.1 is tested)
- run `npm init` to init project and load dependencies
- run `npm run build-script` to build client. Compiled files are available under /public/
- run `npm start` to start the local development server on port `8082`. This can be changed in the `server.js` file

# Project Structure

```
├── README.md         
├── build.js          - build script for npm
├── node_modules      - downloaded NPM dependencies
├── package.json      - NPM dependencies and settings
├── public            - Distribution folder
├── server.js         - node server config
├── src
│   ├── css
│   │   ├── app.css
│   │   ├── bootstrap-responsive.css
│   │   └── bootstrap.min.css
│   ├── fonts
│   │   ├── glyphicons-halflings-regular.eot
│   │   ├── glyphicons-halflings-regular.svg
│   │   ├── glyphicons-halflings-regular.ttf
│   │   ├── glyphicons-halflings-regular.woff
│   │   └── glyphicons-halflings-regular.woff2
│   ├── img
│   │   ├── vothing-large.png
│   │   └── vothing-small.png
│   ├── index.html
│   └── js
│       ├── actions
│       │   └── Actions.js
│       ├── components
│       │   ├── Dockbar.jsx
│       │   ├── Login.jsx
│       │   ├── Survey.jsx
│       │   ├── SurveyDelete.jsx
│       │   ├── SurveyEdit.jsx
│       │   ├── SurveyEditOption.jsx
│       │   ├── SurveyList.jsx
│       │   └── SurveyOption.jsx
│       ├── config.js
│       ├── main.jsx
│       ├── pages
│       │   └── Master.jsx
│       ├── stores
│       │   └── AuthStore.js
│       └── util
│           ├── PermissionHelper.js
│           └── RequestHelper.js
└── vothing-client.iml
```

# TODO 1.0.0
- [ ] integrate client in the core assembly project
- [ ] use a mechanism to auto deploy changes in a dev environment with node
- [ ] use npm config module for application configurations
- [ ] add / edit survey validation
- [ ] error and success messages 
- [ ] sort by modified date
- [ ] implement paging
- [ ] detail page of one survey
- [ ] create tests (mockito)
- [ ] implement web tracking
- [ ] configure npm watch for faster development
- [ ] CI
- [ ] cleanup
- [ ] documentation
- [ ] reimplementation of model level - how to improve handling of JSON entities from the backend?

# Resolved Tasks
- [x] fix npm module versions
- [x] show survey list
- [x] add survey (just a bugfix is still open)
- [x] check and get permissions for edit / delete actions 
- [x] add voting function





