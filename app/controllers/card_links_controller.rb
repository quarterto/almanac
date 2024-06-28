class CardLinksController < ApplicationController
   before_action :set_card

   def create
      link = CardLink.new(link_params)
      link.card = @card
      link.save

      redirect_back fallback_location: @card.specific
   end

   def destroy
      CardLink.destroy(params[:id])
      redirect_back fallback_location: @card.specific
   end

   def set_card
      @card = Card.find_by_id(params[:card_id])
      raise HttpException::Forbidden unless @card.editable?(current_user)
   end

   def link_params
      params.require(:card_link).permit(:to_id)
   end
end
