// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,


  // Initialize Firebase
  firebase : {
    apiKey: "AIzaSyABZXPZoxicQZg7GtAqjLoxv5D8yt6ZqyU",
    authDomain: "keep-36c8f.firebaseapp.com",
    databaseURL: "https://keep-36c8f.firebaseio.com",
    projectId: "keep-36c8f",
    storageBucket: "keep-36c8f.appspot.com",
    messagingSenderId: "807845235526"
  }
 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
