class CardLink < ApplicationRecord
   belongs_to :card
   belongs_to :to, class_name: 'Card'

   after_create :create_reciprocal
   after_destroy :destroy_reciprocal

   def visible?(user, minimum_visibility = nil)
      to.visible?(user, minimum_visibility)
   end

   def create_reciprocal
      CardLink.find_or_create_by(card_id: to_id, to_id: card_id)
   end

   def destroy_reciprocal
      if reciprocal = CardLink.find_by(card_id: to_id, to_id: card_id)
         reciprocal.destroy
      end
   end
end
