module.exports = function(grunt) {
    var ignoreMain = [
        '**/*.html',
        '!**/node_modules/**',
        '!**/.idea/**',
        '!**/*.text**',
        '!**/*.txt**',
        '!**/.DS_Store**',
        '!.DS_Store',
        '!dist',
        '!**/__MACOSX/**',
        '!__MACOSX',
        '!**/__macosx/**',
        '!validation-report.json',
        '!validation-status.json',
        '!npm-debug.log'
    ];
    
    var cssFiles = ['css/**/**/*.css', '!css/app-1.css', '!css/app-2.css', '!css/app-3.css'],
        cssMain = 'css/**/**/*.css',
        scssFiles = 'scss/**/*.scss',
        htmlFiles = ['*.html', '_includes/**/*.html', 'variants/*.html'],
        jsFiles = 'js/**/*',
        miscFiles = ['gruntfile.js', 'package.json'],
        demoFiles = 'demo/**/*',
        fontFiles = 'fonts/**/*',
        imgFiles = 'img/**/*',
        distHtmlFiles = '../dist/*.html',
        vendorFiles = 'vendors/**/*',
        distPathBase = '../dist';


    // Configuração
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // sass para css
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "css/app.css": "scss/app.scss"
                }
            }
        },

        // Minificar css
        cssmin: {
            minify: {
                options: {
                    keepSpecialComments: 0
                },
                expand: true,
                src: ['css/app.css'],
                ext: '.min.css'
            }
        },

         // Combine API js files
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: [
                        'js/inc/api/config.js', 
                        'js/inc/api/request.js',
                        'js/inc/api/model/*'
                   ],
              dest: 'js/inc/api/api.js',
            },
        },

        // Babel
        babel: {
            options: {
              sourceMap: true,
              //presets: ['@babel/preset-env']
            },
            dist: {
              files: {
                'js/inc/api.es5.js': 'js/inc/api/api.js'
              }
            }
        },

        // Minifica js
        uglify: {
            my_target: {
                files: {
                    'js/app.min.js': ['js/inc/api.es5.js', 'js/inc/functions/*.js', 'js/inc/actions.js']
                }
            }
        },

        // Clean
        clean: {
            options: {
                force: true
            },
            idea: '**/.idea',
            ds: '**/.DS_Store',
            thumbsdb: '**/Thumbs.db',
            dist: distPathBase
        },

        postcss: {

            css: {
                src: cssMain
            }
        },


        // Watch
        watch: {
            styles: {
                files: scssFiles,
                tasks: ['sass', 'postcss', 'cssmin', 'copy:css']
            },
            js: {
                files: jsFiles,
                tasks: ['concat', 'babel','uglify', 'copy:js']
            },
            misc: {
                files: miscFiles,
                tasks: ['copy:misc']
            },
            demo: {
                files: demoFiles,
                tasks: ['copy:demo']
            },
            font: {
                files: fontFiles,
                tasks: ['copy:font']
            },
            img: {
                files: imgFiles,
                tasks: ['copy:img']
            },
            vendors: {
                files: vendorFiles,
                tasks: ['copy:vendors']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'sass', 'postcss', 'cssmin', 'concat', 'babel', 'uglify']);


};