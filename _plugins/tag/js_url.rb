require_relative 'base_asset_url'

module Jekyll
  class JsUrl < Jekyll::BaseAssetUrl
    def render(context)
      super
      get_url(@config["js_dir"])
    end
  end
end

Liquid::Template.register_tag("js_url", Jekyll::JsUrl)
