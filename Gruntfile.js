/**
 * Created by Donghui Huo on 2015/5/28.
 */
module.exports = function (grunt) {
    grunt.config.init({
        'compass': {
            dev: {
                options: {
                    force: true,
                    sassDir: ['scss'],
                    specify: 'scss/basic.scss',
                    cssDir: ['public/css'],
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    force: true,
                    sassDir: ['scss'],
                    specify: 'scss/basic.scss',
                    cssDir: ['public/css'],
                    environment: 'production'
                }
            }
        },
        'copy': {
            once:{
                files:[{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
                    dest: 'public/assets/fonts/bootstrap/',
                    filter: 'isFile'
                },{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/animate.css/animate.min.css'],
                    dest: 'public/css/animate/',
                    filter: 'isFile'
                },{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/flexslider/flexslider.css'],
                    dest: 'public/css/flexslider/'
                },{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/flexslider/fonts/*'],
                    dest: 'public/css/flexslider/fonts/'
                },{
                    expand: true,
                    flatten: true,
                    src: ['node_modules/holderjs/holder.min.js'],
                    dest: 'public/js/dev/'
                }]
            }
            ,main: {
                files:[
                    {expand: true,cwd: 'public/', src: ['*.html'], dest: 'dest/', filter: 'isFile'},
                    {expand: true,cwd: 'public/', src: ['assets/**'], dest: 'dest/'},
                    {expand: true,cwd: 'public/',  src: ['js/basic.browserify.min.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true,cwd: 'public/',  src: ['js/dev/holder.min.js'], dest: 'dest/', filter: 'isFile'},
                    {expand: true,cwd: 'public/',  src: ['css/**'], dest: 'dest/', filter: 'isFile'}
                ]
            }
        },
        browserify: {
            //http://aeflash.com/2014-05/grunt-browserify-2-x-update.html
            options: {
                transform: [require('grunt-react').browserify]
            },
            basic: {
                src: ['public/js/dev/self/basic.js'],
                dest: 'public/js/basic.browserify.js',
                options: {
                    transform: [require('grunt-react').browserify]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/basic.browserify.min.js': ['public/js/basic.browserify.js']
                }
            }
        },
        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['public/js/dev/self/*.js','public/js/dev/self/*.jsx'],
                tasks: ['browserify:basic']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', "Builds the application.",
        ['compass:prod', 'browserify:basic', 'uglify','copy:main']);
}