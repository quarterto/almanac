class CampaignsController < ApplicationController
  before_action :set_campaign, only: %i[show edit update destroy dashboard]
  before_action :check_access, only: %i[new create show edit update destroy]

  layout "header_and_content"

  # GET /campaigns
  def index
    @campaigns = current_user.campaigns
  end

  # GET /campaigns/1
  def show; end

  # GET /campaigns/new
  def new
    @campaign = Campaign.new
    render 'edit'
  end

  # GET /campaigns/1/edit
  def edit
    raise HttpException::NotFound unless @campaign.owner?(current_user)
  end

  def dashboard
    @current_location = @campaign.dashboard.current_location
    @presenting = !@campaign.owner?(current_user) || params[:present]

    if @current_location && (!params[:location_id] || params[:location_id] != @current_location.to_param)
      redirect_to campaign_dashboard_path(@campaign, @current_location, {present: params[:present]})
    end

    if @presenting
      Current.minimum_visibility = "campaign"
    end

    @image = @current_location&.image || @campaign.image
  end

  # POST /campaigns
  def create
    @campaign = Campaign.new(campaign_params)
    @campaign.dashboard = Dashboard.new
    @campaign.user_campaigns.new(
      user: current_user,
      campaign: @campaign, # TODO why is this necessary
      access: :owner,
      accepted: true
    )

    if @campaign.save
      redirect_to @campaign, notice: 'Campaign was successfully created.'
    else
      render :edit
    end
  end

  # PATCH/PUT /campaigns/1
  def update
    # TODO: updating associated image
    if @campaign.update(campaign_params)
      redirect_to @campaign, notice: 'Campaign was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /campaigns/1
  def destroy
    @campaign.destroy
    redirect_to campaigns_url, notice: 'Campaign was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_campaign
    @campaign = Campaign.find_by_slug!(params[:id] || params[:campaign_id])
    @image = @campaign.image
  end

  def check_access
    unless !@campaign || @campaign.visible?(current_user)
      raise HttpException::NotFound
    end
  end

  # Only allow a list of trusted parameters through.
  def campaign_params
    params.require(:campaign).permit(
      :name,
      :tagline,
      :public,
      image_attributes: [
        :id,
        :actable_type,
        { actable_attributes: %i[id unsplash_id] }
      ]
    )
  end
end
