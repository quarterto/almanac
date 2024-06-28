Rails.application.routes.draw do
  namespace :card_type do
    resources :documents
  end
  get 'unsplash/search'
  get 'home/index'
  root 'home#index'

  resources :campaigns do
    resources :user_campaigns, path: 'users', only: %i[index create update destroy]

    get 'join', to: 'user_campaigns#new'
    get 'dashboard(/:location_id)', to: 'campaigns#dashboard', as: 'dashboard'

    resources :cards do
      get 'search', on: :collection
      resources :card_links, only: %i[create destroy], path: 'links'
    end

    scope module: 'card_type' do
      resources :quests
      resources :objectives
      resources :locations
      resources :documents
    end
  end

  resources :users, except: :index
  resources :sessions, only: %i[new create destroy]

  get 'sign-up', to: 'users#new', as: 'signup'
  get 'log-in', to: 'sessions#new', as: 'login'
  get 'log-out', to: 'sessions#destroy', as: 'logout'
end
