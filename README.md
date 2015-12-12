## Jurnal - My Personal Blog

This a repository of my personal blog in Bahasa, mostly about my daily life, my thoughts, travelling stories and some short fictions. Built on top of [Jekyll](http://jekyllrb.com/) to gain a maximum performance and hight security level over generated static files.

## Install Jekyll

In order to install this Jekyll powered blog, of course you will need [Jekyll](http://jekyllrb.com/) on your machine. Before installing Jekyll, make sure you have:

- [Ruby](http://www.ruby-lang.org/en/downloads/)
- [RubyGems](http://rubygems.org/pages/download)

If you already have Ruby and RubyGems, simply run the following command:

```
gem install jekyll
```

You will also need [bundler](http://bundler.io/) to easily manage Ruby Gems:

```
gem install bundler
```

## Install Node & Automation Tools

You will also need the following stuff installed:

- [Node.JS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/) (Included in Node.JS package)
- [Gulp](http://gulpjs.com/)
- [Bower](http://bower.io/)

### Install ImageMagick

This blog using [gulp-image-resize](https://github.com/scalableminds/gulp-image-resize) package for resizing images. And it will require you to have ImageMagick library.

On Ubuntu machine:

```
sudo apt-get install
sudo apt-get install imagemagick
```

On OS X with [Homebrew](http://brew.sh/):

```
brew install imagemagick
```

## Setup Blog

Once you have all required dependencies, it's time to setup this blog on your machine.

### Clone to Your Local Machine

Using git command, clone this repository to `my-blog` directory:

```
git clone git@github.com:risan/jurnal.risan.io.git my-blog
```

Then change the current directory to `my-blog`:

```
cd my-blog
```

### Install Jekyll Plugin

This blog using the following external plugin:

- [Jekyll Paginate](https://github.com/jekyll/jekyll-paginate)

To install it using [bundler](http://bundler.io/), run the following command inside `my-blog` directory:

```
bundle install
```

### Install NPM Packages

Next, install all required NPM packages by simply running:

```
npm install
```

### Install Bower Packages

Now we need to install all required bower packages:

```
bower install
```

### Setup _config.yml

We have all required dependencies to generate this blog. Now we need to configure `_config.yml` file.

```
sudo nano _config.yml
```

Then update the following directives to match your configuration.

```
...
port: 4000
host: localhost
url: "http://localhost"
...
```

## Build The Site!

Finally, we can now build our Jekyll powered website.

### Build Assets File with Gulp

First we build our assets files (js, css and images) using Gulp command:

```
gulp
```

If you want to watch over the asset file changes and automatically run `gulp` command to rebuild it, run the following command:

```
gulp watch
```

The asset files will be put on `_site/assets` directory. While some inline css and js will go to `_includes/assets` directory.

### Build Jekyll Website

Now it's time to build the Jekyll powered website. Just run the following command:

```
jekyll build
```

The generated website will be at `_site` directory.

If you want to watch over a file changes and rebuild the Jekyll website, run the following command:

```
jekyll serve
```

With the above command, you can also visit the generated static file on browser:

```
http://localhost:4000
```

The host and the port number depends on the `_config.yml` directive values.

