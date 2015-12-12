require_relative 'base_asset_url'

module Jekyll
  class CssUrl < Jekyll::BaseAssetUrl
    def render(context)
      super
      get_url(@config["css_dir"])
    end
  end
end

Liquid::Template.register_tag("css_url", Jekyll::CssUrl)
