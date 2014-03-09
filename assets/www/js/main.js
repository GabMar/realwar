require.config({
  paths: {
    jquery: '../lib/jquery/zepto',
    jqueryparse:'../lib/jquery/jquery.parse',
    underscore: '../lib/underscore/underscore-min',
    parse: "../lib/parse/parse-1.2.8.min",
    text: '../lib/require/text-1.0.6',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    IScroll: '../lib/iscroll/iscroll-lite',
    Spinner: '../lib/spinner/spin.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'jqueryparse': {
        exports: '$p'
      },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'parse': {
      deps: ['jquery', 'underscore'],
      exports: 'Parse'
    },
    'leaflet': {
      exports: 'L'
    },
    'IScroll': {
             exports: 'IScroll'
         }
  }
});

// We launch the App
require(['underscore', 'parse', 'router'],
    function (_, Parse, AppRouter) {
Parse.initialize("PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY", "fFGAiJk3k4eOUjsALSGd3wzbIGaOe84SMS6hSA9q"); //ApplicationID e javascript KEY

      document.addEventListener("deviceready", run, false);
      function run() {
        new AppRouter();
        Parse.history.start();
      }
  });
