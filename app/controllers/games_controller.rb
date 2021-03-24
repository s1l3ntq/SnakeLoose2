class GamesController < ApplicationController

    def index
        recent_scores = Game.all.limit(20)
        render json: recent_scores.to_json(except: [:created_at, :updated_at])
    end

    def create
        # byebug
        player_score = Game.new(score_params)
       if player_score.save
         render json: player_score.to_json(except: [:created_at, :updated_at])
       else
        render json: player_score.errors, status: unprocessable_entity
       end
   end

   def update
       scores = Game.order("Desc").limit(10)
       render json: scores ,except:[:id]
   end

   private

   def score_params
     {name: params[:name], score: params[:score]}
   end



end