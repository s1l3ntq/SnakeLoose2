class SnakeloosesController < ApplicationController

    def add_a_score
        Snakeloose.create(score_params)
    end

    def add_recent_scores
        score = SnakeLoose.order("Desc").limit(10)
        render json: score ,except:[:id]
    end

    private

  def score_params
    {name: params[:name], score: params[:score]}
  end


end
