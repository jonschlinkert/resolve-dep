'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/*_test.js'],
    },
    jshint: {
      all: {src: ['Gruntfile.js', '*.js', 'test/*.js', 'lib/*.js']},
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Pull down a list of repos from Github to use on README.
    repos: {
      related: {
        options: {
          username: 'helpers',
          namespace: 'helpers',
          filter: ['!*{helper,helpers,mixin}*', '*util*']
        },
        files: {
          'docs/repos.json': ['repos?page=1&per_page=100']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-repos');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'readme']);

};
