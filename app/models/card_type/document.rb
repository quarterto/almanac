class CardType::Document < ApplicationRecord
  include CardType::Concern
  belongs_to :location, class_name: 'CardType::Location', optional: true

  def self.permitted_attributes
    %i[location_id]
 end

 def self.description
  "A letter, poster, book, or quest log."
 end

 def self.icon
  "ra ra-quill-ink"
 end

 def parent
  nil
 end
end
