# Personal Blog

This is a repository of my personal blog. All posts are written in Bahasa and mostly about my daily life, my thoughts, travelling stories and some fictions. Built on top of [Jekyll](http://jekyllrb.com/) to gain a maximum performance and high security level over the generated static files.

You may visit the website here: [jurnal.risan.io](https://jurnal.risan.io)

## Install Jekyll

In order to install this blog on your machine, you will need [Jekyll](http://jekyllrb.com/) installed. Before installing Jekyll, make sure you have the following stuff:

- [Ruby](http://www.ruby-lang.org/en/downloads/)
- [RubyGems](http://rubygems.org/pages/download)

If you already have Ruby and RubyGems, simply run the following command:

```bash
gem install jekyll
```

You will also need [bundler](http://bundler.io/) to install third party Jekyll plugin. To install bundler, run the following command:

```bash
gem install bundler
```

## Install Node & Automation Tools

This blog leverages some Node.JS based automation tools to automatically build assets. Make sure you have the following stuff on your machine:

- [Node.JS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/) (Included in Node.JS package)
- [Gulp](http://gulpjs.com/)

### Install ImageMagick

This blog using [gulp-image-resize](https://github.com/scalableminds/gulp-image-resize) package for resizing and optimizing images. This pacakge will require you to have ImageMagick library.

To install ImageMagick on Ubuntu:

```bash
sudo apt-get install
sudo apt-get install imagemagick
```

To install ImageMagick on OS X via [Homebrew](http://brew.sh/):

```bash
brew install imagemagick
```

## Setup Blog

Once you have all required dependencies above, it's time to setup this blog on your machine.

### Clone to Your Local Machine

Using git command, clone this repository to `my-blog` directory or whatever directory you want:

```bash
git clone git@github.com:risan/jurnal.risan.io.git my-blog
```

Change the current directory to `my-blog`:

```bash
cd my-blog
```

### Install Jekyll Plugin

The next step is to install third party Jekyll plugins. This blog using the following external plugins:

- [Jekyll Paginate](https://github.com/jekyll/jekyll-paginate)

To install these plugins, we can use [bundler](http://bundler.io/) command. Run the following command inside `my-blog` directory:

```bash
bundle install
```

### Install NPM Packages

Install all required NPM packages by running the following command:

```bash
npm install
```

### Setup _config.yml

We have all required plugins and packages to generate this blog. The next step is to configure the `_config.yml` file. Open up this file:

```bash
sudo nano _config.yml
```

Then update the following directives to match your configuration.

```bash
...
port: 4000
host: localhost
url: "http://localhost"
...
```

## Build The Site!

Now it's time to build our website.

### Build Assets File with Gulp

First we build our assets files (js, css and images) using Gulp command:

```bash
gulp
```

Or if you want to watch over the asset file changes and automatically run `gulp` command to rebuild it, run the following command:

```bash
gulp watch
```

The asset files will be put on `_site/assets` directory. While some inline css and js files will reside at `_includes/assets` directory.

### Generate Web Pages

Lastly, we generate the web pages by running the following command:

```bash
jekyll build
```

This command will generate a static web pages at `_site` directory.

If you want to watch over a file changes and rebuild the Jekyll website, run the following command instead:

```bash
jekyll serve
```

With the above command, you can also visit the generated static file using browser:

```bash
http://localhost:4000
```

The host and the port number depends on the `_config.yml` directive values you have defined.

