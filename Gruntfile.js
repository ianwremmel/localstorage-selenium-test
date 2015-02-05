'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    express: {
      test: {
        options: {
          script: 'src/server.js'
        }
      }
    },

    mochaTest: {
      automation: {
        src: ['test/automation/spec/**/*.js']
      }
    }
  });

  grunt.registerTask('default', [
    'express',
    'selenium_start',
    'continue:on',
    'mochaTest',
    'continue:off',
    'selenium_stop',
    'continue:fail-on-warning'
  ]);
};
