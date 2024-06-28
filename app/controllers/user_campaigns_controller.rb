class UserCampaignsController < ApplicationController
	before_action :set_campaign
	layout "header_and_content"

	def index; end

	def new
		@token = params[:token]
		raise HttpException::Forbidden unless @campaign.invite_token == @token
		redirect_to @campaign if @campaign.users.where(id: current_user.id).exists?
	end

	def create
		if params.has_key? :token
			create_with_token
		else
			create_invite
		end
	end

	def create_with_token
		user_campaign = UserCampaign.new(join_params.merge(
			campaign: @campaign,
			access: :member,
			accepted: true
		))

		token_valid = params[:token] == @campaign.invite_token
		user_is_self = user_campaign.user == current_user

		raise HttpException::Forbidden unless token_valid and user_is_self

		if user_campaign.save
			redirect_to @campaign
		else
			render :new
		end
	end

	def create_invite
		raise HttpException::Forbidden unless @campaign.owner? current_user

		user = User.find_by_username! params[:user_campaign][:user][:username]
		user_campaign = UserCampaign.new(
			user: user,
			campaign: @campaign,
			access: params[:user_campaign][:access]
		)

		if user_campaign.save
			redirect_to campaign_user_campaigns_path(@campaign)
		else
			render :index
		end
	end

	def update
		user_campaign = UserCampaign.find(params[:id])

		raise HttpException::Forbidden unless user_campaign.user == current_user

		if user_campaign.update(accept_params)
			redirect_to user_campaign.campaign
		else
			redirect_to user_campaign.campaign # TODO what
		end
	end

	def destroy
		user_campaign = UserCampaign.find(params[:id])
		deleting_self = user_campaign.user == current_user

		raise HttpException::Forbidden unless deleting_self || @campaign.owner?(current_user)

		user_campaign.destroy
		if deleting_self
			redirect_to current_user
		else
			redirect_to campaign_user_campaigns_path(@campaign)
		end
	end

	def set_campaign
		@campaign = Campaign.find_by_slug!(params[:campaign_id])
		@image = @campaign.image
	end

	def accept_params
		params.require(:user_campaign).permit(:accepted)
	end

	def join_params
		params.require(:user_campaign).permit(:user_id)
	end
end
