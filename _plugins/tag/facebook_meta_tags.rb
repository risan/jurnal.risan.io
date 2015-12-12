require_relative 'base_tag'

module Jekyll
  class FacebookMetaTags < Jekyll::BaseTag
    def render(context)
      super
      get_meta_tags()
    end

    def get_meta_tags()
      tags = ""
      type = get_type()

      tags += "<meta property='og:site_name' content='#{@config['title']}'>\n"
      tags += "<meta property='og:locale' content='#{get_locale()}'>\n"
      tags += "<meta property='og:url' content='#{get_canonical_url()}'>\n"
      tags += "<meta property='og:type' content='#{type}'>\n"

      if type == 'article'
        tags += "<meta property='article:published_time' content='#{get_published_date()}'>\n"
        tags += "<meta property='article:author' content='#{get_facebook_author()}'>\n"
        tags += "<meta property='article:section' content='#{get_category_title()}'>\n"
      end

      tags += "<meta property='og:title' content='#{get_title()}'>\n"
      tags += "<meta property='og:description' content='#{get_description()}'>\n"
      tags += "<meta property='og:image' content='#{get_featured_image()}'>"
    end

    def get_locale()
      @config["facebook"]["locale"]
    end

    def get_type()
      if @page["excerpt"]
        return "article"
      end

      "website"
    end

    def get_facebook_author()
      @config["facebook"]["author"]
    end
  end
end

Liquid::Template.register_tag("facebook_meta_tags", Jekyll::FacebookMetaTags)
