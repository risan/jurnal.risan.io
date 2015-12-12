require_relative 'base_tag'

module Jekyll
  class HeroImageUrl < Jekyll::BaseTag
    def render(context)
      super
      get_hero_image
    end
  end
end

Liquid::Template.register_tag("hero_image_url", Jekyll::HeroImageUrl)
