module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
            options: {
                nospawn: true,
                livereload: true
            },<% if (templateFramework === 'mustache') { %>
            mustache: {
                files: [
                    'app/templates/**/*.mustache'
                ],
                tasks: ['mustache']
            },<% } else if (templateFramework === 'handlebars') { %>
            handlebars: {
                files: [
                    'app/templates/**/*.hbs'
                ],
                tasks: ['handlebars']
            },<% } else { %>
            jst: {
                files: [
                    'app/templates/**/*.ejs'
                ],
                tasks: ['jst']
            },
            <% } %><% if (bootstrapFormat === 'sass') { %>
            css: {
                files: 'app/styles/**/*.scss',
                tasks: ['sass']
            },<% } else if (bootstrapFormat === 'less') { %>
            css: {
                files: 'app/styles/**/*.less',
                tasks: ['less']
            },<% } else { %>
            css: {
                files: [
                    'app/styles/**/*.css'
                ],
                tasks: ['jst']
            },<% } %>                                          
			livereload: {
                files: [
                    '*.html',
                    'app/styles/{,*/}*.css',
                    'app/scripts/{,*/}*.js',
                ]
            }
        },		
        clean: {
            dist: ['build'],
        },   
        jshint: {
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'app/modules/**/*.js',
            ]
        },                 
		requirejs: {
            compile: {
                options: {
                    baseUrl: "app",
                    mainConfigFile: "app/main.js",
                    include: "main",
                    name: "../bower_components/almond/almond",
                    out: "build/prod.js"
                }
            } 
        },<% if (bootstrapFormat === 'sass') { %>
        sass: {
            dist: {
                files: {
                    'app/styles/main.css' : 'app/styles/main.scss'
                }
            }
        },<% } else if (bootstrapFormat === 'less') { %>
        less: {
            dist: {
                files: {
                    'app/styles/main.css' : 'app/styles/main.less'
                }
            }
        },      
        <% } %><% if (templateFramework === 'mustache') { %>
        mustache: {
            files: {
                src: 'app/templates/**/*.mustache',
                dest: 'build/templates.js',
                options: {
                    prefix: 'define(function() { this.JST = ',
                    postfix: '; return this.JST;});'
                }
            }
        },<% } else if (templateFramework === 'handlebars') { %>
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST'
                },
                files: {
                    'build/templates.js': ['app/templates/**/*.hbs']
                }
            }
        },<% }else{ %>
        jst: {
            compile: {
                files: {
                    'build/templates.js': ['app/templates/**/*.ejs']
                }
            }
        },<% } %>
        jasmine: {
            all:{
                src : 'app/modules/{,*/}*.js',
                options: {
                    keepRunner: true,
                    specs : 'test/**/*.js',
                    vendor : [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/lodash/dist/lodash.js',
                        'bower_components/backbone/backbone.js',
                        'bower_components/marionette/lib/core/backbone.marionette.js',
                        'bower_components/backbone.babysitter/lib/backbone.babysitter.js',
                        'bower_components/backbone.wreqr/lib/backbone.wreqr.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js',      
                    ]
                }
            }
        }, 
        cssmin: {
            dist: {
                files: {
                    'app/styles/main.css': [
                        'build/styles/{,*/}*.css',
                        'app/styles/{,*/}*.css'
                    ]
                }
            }
        },  
        fileblocks: {  
            options: {
                templates: {
                    'js': '<script data-main="app/main" src="${file}"></script>',
                },
                removeFiles : true
            },                    
            prod: {
                src: 'index.html',
                blocks: {
                    'app': { src: 'build/prod.js' }
                }
            },
            develop: {
                src: 'index.html',
                blocks: {
                    'app': { src: 'bower_components/requirejs/require.js' }
                }
            },             
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');	
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');<% if (templateFramework === 'mustache') { %>
	grunt.loadNpmTasks('grunt-mustache');<% } else if (templateFramework === 'handlebars') { %>
	grunt.loadNpmTasks('grunt-contrib-handlebars');<% }else{ %>
	grunt.loadNpmTasks('grunt-contrib-jst');<% } %><% if (bootstrapFormat === 'sass') { %>
    grunt.loadNpmTasks('grunt-contrib-sass');<% } else if (bootstrapFormat === 'less') { %>
    grunt.loadNpmTasks('grunt-contrib-less');<% } %>
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-file-blocks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	
    grunt.registerTask('build', [
        'jshint',
        'clean:dist',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'jst',<% } %><% if (bootstrapFormat === 'sass') { %>
        'sass',<% } else if (bootstrapFormat === 'less') { %>
        'less',<% } %>
        'requirejs',
        'cssmin',
        'jasmine',
    ]);

    grunt.registerTask('develop', ['build', 'fileblocks:develop', 'watch']);

    grunt.registerTask('release', ['build', 'fileblocks:prod']);
};