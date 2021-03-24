class RemoveColumnfromSnakelooses < ActiveRecord::Migration[6.1]
  def change
   remove_column :snakelooses, :game_id, :integer
  end
end
