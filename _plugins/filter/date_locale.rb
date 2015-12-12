require 'date'

module Jekyll
  module DateLocaleFilter
    def date_locale(input)
      return input unless input = time(input)

      lang = @context.registers[:site].config["lang"]
      locale = @context.registers[:site].data["locale"][lang]

      day = input.day
      month = locale["month"][input.month - 1]
      year = input.year

      return "#{day} #{month} #{year}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::DateLocaleFilter)
