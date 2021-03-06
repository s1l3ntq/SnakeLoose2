class GamesController < ApplicationController

    def index
        recent_scores = Game.all.reverse
        render json: recent_scores.to_json(except: [:created_at, :updated_at, :game_id], include: {snakeloose: {only: [:score]}})
    end

    def create
        
        player_score = Game.new(score_params)
       if player_score.save
         render json: player_score.to_json(except: [:created_at, :updated_at])
       else
        render json: player_score.errors, status: unprocessable_entity
       end
   end


   def high_scores
    highest = Game.all.order(score: :desc).limit(5)
    render json: highest.to_json(except: [:created_at, :updated_at])
   end

   private

   def score_params
     {name: params[:name], score: params[:score]}
   end



end