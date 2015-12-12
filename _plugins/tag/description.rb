require_relative 'base_tag'

module Jekyll
  class Description < Jekyll::BaseTag
    def render(context)
      super
      get_description()
    end
  end
end

Liquid::Template.register_tag("description", Jekyll::Description)
