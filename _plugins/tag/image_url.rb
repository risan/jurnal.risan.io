require_relative 'base_asset_url'

module Jekyll
  class ImageUrl < Jekyll::BaseAssetUrl
    def render(context)
      super

      directory = @config["image_dir"]

      if (@page["slug"])
        directory = File.join(directory, @page["slug"])
      end

      get_url(directory)
    end
  end
end

Liquid::Template.register_tag('image_url', Jekyll::ImageUrl)
