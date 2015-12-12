require_relative 'base_asset_url'

module Jekyll
  class AssetUrl < Jekyll::BaseAssetUrl
    def render(context)
      super
      get_url(@config["assets_dir"])
    end
  end
end

Liquid::Template.register_tag("asset_url", Jekyll::AssetUrl)
