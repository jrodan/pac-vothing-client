# PAC VoThing Client

## Development Setup
- Install Node (6.2.1 is tested)
- run `npm init` to init project and load dependencies
- run `npm run build-script` to build client. Compiled files are available under /public/
- run `npm start` to start the local development server on port `8082`. This can be changed in the `server.js` file

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





