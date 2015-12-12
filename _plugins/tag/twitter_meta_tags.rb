require_relative 'base_tag'

module Jekyll
  class TwitterMetaTags < Jekyll::BaseTag
    def render(context)
      super
      get_meta_tags()
    end

    def get_meta_tags()
      tags = ""

      tags += "<meta name='twitter:card' content='summary_large_image'>\n"
      tags += "<meta name='twitter:creator' content='#{get_twitter_creator()}'>"
      tags += "<meta name='twitter:title' content='#{get_title()}'>\n"
      tags += "<meta name='twitter:description' content='#{get_description()}'>\n"
      tags += "<meta name='twitter:image' content='#{get_featured_image()}'>"
    end

    def get_twitter_creator()
      @config["twitter"]["creator"]
    end
  end
end

Liquid::Template.register_tag("twitter_meta_tags", Jekyll::TwitterMetaTags)
