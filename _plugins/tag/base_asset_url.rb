module Jekyll
  class BaseAssetUrl < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text.strip!
    end

    def render(context)
      @config = context.registers[:site].config
      @page = context.environments.first["page"]
      @base_url = File.join(@config["url"], @config["baseurl"])
    end

    def get_url(directory)
      File.join(@base_url, directory, @text)
    end
  end
end
