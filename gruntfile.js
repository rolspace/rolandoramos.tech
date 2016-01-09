module.exports = function(grunt) {
	require('grunt-task-loader')(grunt);

	grunt.initConfig({
		less: {
			options: {
				paths: ['_less']
			},
			main: {
				files: {
					'css/rolspace.css': '_less/rolspace.less'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/bootstrap/dist/fonts/',
						src: ['*'],
						dest: 'fonts/'
					},
					{
						expand: true,
						cwd: 'bower_components/font-awesome/fonts/',
						src: ['*'],
						dest: 'fonts/'
					}
				],
			},
		},
		concat: {
			main: {
				files: [
					{ src: ['bower_components/bootstrap/dist/css/bootstrap.min.css',
					  		'bower_components/font-awesome/css/font-awesome.min.css',
				  			'css/rolspace.css'],
					  dest: 'css/rolspace.css'
					},
					{ src: ['bower_components/jquery/dist/jquery.min.js',
							'bower_components/bootstrap/dist/js/bootstrap.min.js'],
					  dest: 'js/rolspace.min.js'
					}
				]
			}
		},
		cssmin: {
			options: {
				report: ['min', 'gzip']
			},
			main: {
				files: {
					'css/rolspace.min.css': ['css/rolspace.css']
				}
			}
		},
		shell: {
			main: {
				command: function(demo) {
					return 'jekyll serve --config _config' + demo + '.yml --force'
				}
			}
		},
		watch: {
			options: {
				atBegin: true,
				interrupt: true
			},
			files: ['_less/*.less', '_assets/*.*', '_includes/*.*', '_layouts/*.*',
					'_posts/*.*', 'about/*.*', 'read/*.*', 'index.html'],
			tasks: ['less', 'copy', 'concat', 'shell:main:.demo']
		}
	});

	grunt.registerTask('demo', 'Host the demo website using grunt-watch',['watch']);

	grunt.registerTask('release', 'Host the release website', ['less', 'copy', 'concat', 'cssmin', 'shell:main:']);
}