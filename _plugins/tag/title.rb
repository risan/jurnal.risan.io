require_relative 'base_tag'

module Jekyll
  class Title < Jekyll::BaseTag
    def render(context)
      super
      get_title()
    end
  end
end

Liquid::Template.register_tag("title", Jekyll::Title)
