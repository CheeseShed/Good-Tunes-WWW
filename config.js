System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ],
    "blacklist": []
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "JMPerez/spotify-web-api-js": "github:JMPerez/spotify-web-api-js@0.15.0",
    "angular": "github:angular/bower-angular@1.4.6",
    "angular-resource": "github:angular/bower-angular-resource@1.4.4",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.6",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "angularjs-facebook": "npm:angularjs-facebook@0.2.3",
    "babel": "npm:babel-core@5.8.22",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "core-js": "npm:core-js@0.9.18",
    "lodash": "npm:lodash@3.10.1",
    "moment": "github:moment/moment@2.10.6",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-angular-sanitize@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angularjs-facebook@0.2.3": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

