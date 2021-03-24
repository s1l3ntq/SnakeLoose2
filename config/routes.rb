Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :games
  resources :snakelooses

  get '/high_scores', to: 'games#high_scores'

end
