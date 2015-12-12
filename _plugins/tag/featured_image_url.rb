require_relative 'base_tag'

module Jekyll
  class FeaturedImageUrl < Jekyll::BaseTag
    def render(context)
      super
      get_featured_image
    end
  end
end

Liquid::Template.register_tag("featured_image_url", Jekyll::FeaturedImageUrl)
