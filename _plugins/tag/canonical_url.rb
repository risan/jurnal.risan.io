require_relative 'base_tag'

module Jekyll
  class CanonicalUrl < Jekyll::BaseTag
    def render(context)
      super
      get_canonical_url()
    end
  end
end

Liquid::Template.register_tag("canonical_url", Jekyll::CanonicalUrl)
