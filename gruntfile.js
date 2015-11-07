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
						src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
						dest: 'css/bootstrap.min.css'
					},
					{
						src: 'bower_components/font-awesome/css/font-awesome.min.css',
						dest: 'css/font-awesome.min.css'
					},
					{
						src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
						dest: 'js/bootstrap.min.js'
					},
					{
						src: 'bower_components/jquery/dist/jquery.min.js',
						dest: 'js/jquery.min.js'
					},
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
			options: {
				separator: ' '
			},
			main: {
				src: ['css/bootstrap.min.css', 'css/font-awesome.min.css', 'css/rolspace.css'],
				dest: 'css/rolspace.css'
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
			debug: {
				command: function (config) {
					return 'jekyll ' + config + ' --config _config.debug.yml --force';
				}
			},
			release: {
				command: function(config) {
					return 'jekyll ' + config + ' --config _config.yml --force'
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
			tasks: ['debug']
		}
	});

	grunt.registerTask('debug', 'Deploy debug version', function(n) {
		DebugTask(grunt.option('serve') ? 'serve' : 'build');
	});

	grunt.registerTask('release', 'Deploy release version', function(n) {
		ReleaseTask(grunt.option('serve') ? 'serve' : 'build');
	});

	function DebugTask(option) {
		var shellCommand = CreateShellCommand('debug', option);
		grunt.task.run('less', 'copy', 'concat', shellCommand);
	};

	function ReleaseTask(option) {
		var shellCommand = CreateShellCommand('release', option);
		grunt.task.run('less', 'copy', 'concat', 'cssmin', shellCommand);
	};

	function CreateShellCommand(config, option) {
		var command = 'shell:{0}:{1}';
		return command.replace('{0}', config).replace('{1}', option);
	};
}