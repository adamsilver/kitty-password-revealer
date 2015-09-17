module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			jshintrc: '.jshintrc',
			src: ['src/**/*.js']
		},
		jasmine: {
			src: [
				'src/kitty.PasswordRevealer.js'
			],
			options: {
				specs: ['test/kitty.PasswordRevealer.spec.js'],
				vendor: ['bower_components/kitty-base/src/kitty.js'],
				keepRunner: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs-checker');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jshint', 'jasmine']);

};