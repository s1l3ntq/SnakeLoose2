class GamesController < ApplicationController

    def top_scores
        games = Game.all 
        render json: games
    end


end