module.exports = function (grunt) {
   'use strict';
   grunt.initConfig({
       babel: {
           options: {
               sourceMap: true,
               presets: ['es2015']
           },
           dist: {
               files: [{
					expand: true,
					cwd: 'es6/',
					src: ['*.js'],
					dest: 'dist/'
               }]
           }
       },
       watch:{
           scripts: {
               files : ['es6/*.js'],
               tasks: ['babel']
           }
       }
   });
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-babel');
   grunt.registerTask('default', ['babel']);
};