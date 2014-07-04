generator-backbone-marionette
=============================

Yeoman generator for building modular, modern web-apps using Backbone.js, Require.js, Marionette.js, Almond.js.
Includes your choice of lodash, mustache or handlebars for templating. Bootstrap for css, sass or less and font awesome(if you want it).

## Usage

Install: `npm install -g generator-backbone-marionette`

Create and new directory and jump in there.

`mkdir my-app-name && cd $_`

Run:

`yo backbone-marionette`


Once you've got the generator, run one of the following grunt commands. The main difference being that `develop` will include a watch task and won't using almond.js to build a single js file. Make sure you use `release` for production, as you don't want require making a bunch of http requests.

`grunt develop`

`grunt release`

## Contributing

See the yeoman contributing [docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

Before submitting an issue, make sure your Yeoman is up-to-date and please provide the steps/commands used to generate the error.

Please submit a test case along side the fix.

## License

[BSD License](http://opensource.org/licenses/bsd-license.php)