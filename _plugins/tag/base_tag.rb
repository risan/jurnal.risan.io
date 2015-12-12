module Jekyll
  class BaseTag < Liquid::Tag
    include Liquid::StandardFilters

    def render(context)
      @config = context.registers[:site].config
      @categories = context.registers[:site].data["categories"]
      @page = context.environments.first["page"]
      @base_url = File.join(@config["url"], @config["baseurl"])
    end

    def get_homepage_url()
      @base_url
    end

    def get_canonical_url()
      url = replace(@page["url"], "index.html", "")
      File.join(@base_url, url);
    end

    def get_about_url()
      File.join(@base_url, 'about.html');
    end

    def get_title()
      if @page["title"]
        @page["title"].strip!
        return @page["title"]
      end

      @config["title"].strip!
      return @config["title"]
    end

    def get_description(length = 155)
      if @page["description"]
        @page["description"].strip!
        return @page["description"]
      end

      if @page["excerpt"]
        description = strip_newlines(strip_html(@page["excerpt"]))

        if (length > 0)
          description = truncate(description, length)
        end

        return description
      end

      @config["description"].strip!
      @config["description"]
    end

    def get_published_date()
      date(@page["date"], "%Y-%m-%d")
    end

    def get_category_title()
      @categories[@page["categories"][0]]["title"]
    end

    def get_featured_image()
      base_url = File.join(@base_url, @config["image_dir"])

      if @page["featured_image"]
        if @page["slug"]
          base_url = File.join(base_url, @page["slug"])
        end

        return File.join(base_url, @page["featured_image"])
      end

      File.join(base_url, @config["default_featured_image"])
    end

    def get_hero_image()
      featured_image = get_featured_image()
      suffix = @config["hero_image_suffix"]
      ext = File.extname(featured_image)
      name = File.basename(featured_image, ext)
      dir = File.dirname(featured_image)
      filename = "#{name}#{suffix}#{ext}"

      File.join(dir, filename)
    end
  end
end

