class GamesController < ApplicationController

    def index
        recent_scores = Game.all.limit(10)
        render json: recent_scores.to_json(except: [:created_at, :updated_at])
    end

    def create
        player_score = Game.create(score_params)
       if player_score.save
         render json: player_score
       end
   end

   def update
       scores = Game.order("Desc").limit(10)
       render json: scores ,except:[:id]
   end

   private

   def score_params
     {name: params[:name]}
   end



end