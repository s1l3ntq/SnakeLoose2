class AddColumnfromSnakelooses < ActiveRecord::Migration[6.1]
  def change
    add_column :snakelooses, :game_id, :integer
  end
end
