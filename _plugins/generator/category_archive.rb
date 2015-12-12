module Jekyll

  class CategoryArchivePage < Page
    def initialize(site, base, dir, category, posts)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"
      @category = site.data["categories"][category]

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "category_archive.html")
      self.data["category"] = @category
      self.data["posts"] = posts.reverse()
      self.data["title"] = @category["title"] + site.config["category_archive"]["title_suffix"]
      self.data["description"] = @category["description"]
      self.data["featured_image"] = @category["featured_image"]
    end
  end

  class CategoryArchiveGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? "category_archive"
        baseurl = site.config["category_archive"]["base_url"] || "category"
        posts_by_category(site.posts).each do |category, posts|
          site.pages << CategoryArchivePage.new(site, site.source, File.join(baseurl, category), category, posts)
        end
      end
    end

    def posts_by_category(posts)
      data = {}
      posts.docs.each do |post|
        post["categories"].each do |category|
          (data[category] ||= []) << post
        end
      end
      return data
    end
  end
end
