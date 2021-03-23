class SnakeloosesController < ApplicationController

  def index
    all_top_scores = Snakeloose.all
    render json: all_top_scores
  end  
  
  
  def create
         user_score = Snakeloose.create(score_params)
        if user_score.save
          render json: user_score
        end
    end

    def update
        score = SnakeLoose.order("Desc").limit(10)
        render json: score ,except:[:id]
    end

    private

  def score_params
    {name: params[:name], score: params[:score]}
  end


end
