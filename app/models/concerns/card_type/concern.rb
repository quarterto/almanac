module CardType
   module Concern
      extend ActiveSupport::Concern

      included do
         acts_as :card

         def self.model_name
            ActiveModel::Name.new(self, nil, self.name.demodulize)
         end

         def self.icon; end
      end

      def to_param
         card.to_param
      end

      def to_partial_path
         "#{self.class.model_name.plural}/#{self.class.model_name.singular}"
      end

      def icon
         self.class.icon
      end

      def parent
         super
      end
   end
end
