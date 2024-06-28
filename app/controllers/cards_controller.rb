class CardsController < ApplicationController
  before_action :set_campaign
  before_action :set_card, only: %i[show update destroy]

  layout "header_and_content"

  # GET /cards/new
  def new
    @types = Card.types
  end

  def show
    redirect_to [@campaign, @card.specific]
  end

  def search
    query = @campaign._cards.where(
      'lower(title) LIKE :query',
      query: "%#{params[:q]}%"
    )

    if params[:count]
      query = query.limit(params[:count].to_i)
    end

    cards = query.filter { _1.visible?(current_user) }

    render json: {
      success: true,
      items: cards.map do |card|
        {
          name: card.friendly_title,
          href: polymorphic_path([@campaign, card.specific]),
          description: card.description || card.excerpt
        }
      end
    }
  end

  # POST /cards
  def create
    @card = Card.new(card_params)
    @card.campaign = @campaign
    @card.owner = current_user

    if @card.save!
      if params[:redirect_back]
        redirect_back fallback_location: [@campaign, @card.specific], allow_other_host: false
      else
        redirect_to [@campaign, @card.specific], notice: 'Card was successfully created.'
      end
    else
      @card = @card.specific
      render :new
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      respond_to do |format|
        format.html { redirect_to [@campaign, @card.specific], notice: 'Card was successfully updated.' }
        format.json { render json: @card }
      end

    else
      @card = @card.specific
      render :show
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy
    redirect_to campaign_cards_url(@campaign), notice: 'Card was successfully destroyed.'
  end

  private

  def set_campaign
    @campaign = Campaign.find_by_slug!(params[:campaign_id])
    raise HttpException::NotFound unless @campaign.visible?(current_user)
  end

  def set_card
    @card = Card.find_by_id!(params[:id])
    raise HttpException::NotFound unless @card.visible?(current_user)
  end

  # Only allow a list of trusted parameters through.
  def card_params
    if params[:card][:actable_type]
      unless params[:card][:actable_type].start_with?('CardType::')
        raise ActionController::BadRequest
      end

      actable_attributes = params[:card][:actable_type].constantize.permitted_attributes
    else
      actable_attributes = []
    end

    params.require(:card).permit(
      :title, :description, :slug, :campaign_id, :actable_type,
      :visible, :editable,
      content: {},
      actable_attributes: %i[id] + actable_attributes,
      image_attributes: [
        :id,
        :actable_type,
        { actable_attributes: %i[id unsplash_id] }
      ]
    )
  end
end
