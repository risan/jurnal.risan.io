require_relative 'base_tag'

module Jekyll
  class HomepageUrl < Jekyll::BaseTag
    def render(context)
      super
      get_homepage_url()
    end
  end
end

Liquid::Template.register_tag("homepage_url", Jekyll::HomepageUrl)
