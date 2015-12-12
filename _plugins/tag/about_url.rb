require_relative 'base_tag'

module Jekyll
  class AboutUrl < Jekyll::BaseTag
    def render(context)
      super
      get_about_url()
    end
  end
end

Liquid::Template.register_tag("about_url", Jekyll::AboutUrl)
