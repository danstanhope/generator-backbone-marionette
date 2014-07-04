generator-backbone-marionette
=============================

Yeoman generator for building modular, modern web-apps using Backbone.js, Require.js, Marionette.js, Almond.js and your choice of lodash, mustache or handlebars for templating.

## Usage

Once you've got the generator, run one of the following grunt commands. The main difference being that develop will include a watch task and won't using almond.js to build a single js file. Make sure you use release for production, as you don't want require making a bunch of http requests.

'grunt develop'

'grunt release'

