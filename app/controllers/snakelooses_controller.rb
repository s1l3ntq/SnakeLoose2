class SnakeloosesController < ApplicationController

  def index
    all_top_scores = Snakeloose.all
    render json: all_top_scores.to_json(except: [:created_at, :updated_at])
  end  
  
  
  def create
         user_score = Snakeloose.new(score_params)
        if user_score.save
          render json: user_score.to_json(except: [:created_at, :updated_at])
        else
          render json: user_score.errors, status: unprocessable_entity
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
