require_relative 'base_tag'

module Jekyll
  class CategoriesLink < Jekyll::BaseTag
    def render(context)
      super
      generate_categories_link()
    end

    def generate_categories_link()
      category_base_url = @config["category_archive"]["base_url"] || "category"
      base_url = File.join(@base_url, category_base_url)
      link_tags = []

      @page["categories"].each do |key|
        category = @categories[key]
        url = File.join(base_url, category["slug"])
        link_tags.push("<a href='#{url}'>#{category['title']}</a>")
      end

      link_tags.join(", ")
    end
  end
end

Liquid::Template.register_tag("categories_link", Jekyll::CategoriesLink)
