'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var BackboneMarionetteGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
      var done = this.async();

      console.log(this.yeoman);

      this.appPath = this.options.env.cwd;
      
      var prompts = [{
        type: 'list',
        name: 'format',
        message: 'In what format would you like the Bootstrap stylesheets?',
        choices: ['css', 'sass', 'less']
      },{        
        type: 'list',
        name: 'template',
        message: 'Choose template framework:',
        choices: ['lodash', 'handlebars', 'mustache']
      },{
        type: 'confirm',
        name: 'fontawesome',
        message: 'Would you like to use Font Awesome?',
        default: true
      }];

      this.prompt(prompts, function (props) {
          this.appName = props.appName;
          this.bootstrapFormat = props.format;
          this.templateFramework = props.template;
          this.includeFontAwesome = props.fontawesome;
          this.file = '${file}';
          
          this.config.defaults({
            bootstrapFormat     : this.bootstrapFormat,
            templateFramework   : this.templateFramework,
            includeFontAwesome  : this.includeFontAwesome,
            file                : '${file}',
          });

          done();
      }.bind(this));

      this.on('end', function () {
          this.installDependencies({});
      });   
    },
    writeIndexWithRequirejs: function () {
      this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
      this.indexFile = this.engine(this.indexFile, this);   
    },       
    scaffoldFolders: function(){
      this.mkdir(this.appPath + "/app");
      this.mkdir(this.appPath + "/app/modules");
      this.mkdir(this.appPath + "/app/styles");
      this.mkdir(this.appPath + "/app/templates");
      this.mkdir(this.appPath + "/app/img");
      this.mkdir(this.appPath + "/build");
      this.mkdir(this.appPath + "/test");
      
      this.write('index.html', this.indexFile);
    },   
    copyMainFiles: function(){
      this.template("Gruntfile.js", this.appPath + "/Gruntfile.js");
      this.template("_package.json", this.appPath + "/package.json");  
      this.template("_bower.json", this.appPath + "/bower.json");

      this.template("_app.js", this.appPath + "/app/app.js");
      this.template("_main.js",this.appPath + "/app/main.js");
      this.template("_router.js", this.appPath + "/app/router.js");      

      this.copy("_test.js", this.appPath + "/test/test.js");      

      if(this.templateFramework === 'mustache'){
        this.copy("_main-layout.mustache", this.appPath + "/app/templates/main-layout.mustache");  
      }else if(this.templateFramework === 'handlebars'){
        this.copy("_main-layout.hbs", this.appPath + "/app/templates/main-layout.hbs");
      }else{
        this.copy("_main-layout.ejs", this.appPath + "/app/templates/main-layout.ejs");
      }
   
      if (this.bootstrapFormat === 'sass') {
        this.template("_main.scss", this.appPath + "/app/styles/main.scss");
      }else if(this.bootstrapFormat === 'less'){
        this.template("_main.less", this.appPath + "/app/styles/main.less");
      }else{
        this.template("_main.css", this.appPath + "/app/styles/main.css");
      }
      var context = { 
          site_name: this.appName 
      };        
    },             
});

module.exports = BackboneMarionetteGenerator;
