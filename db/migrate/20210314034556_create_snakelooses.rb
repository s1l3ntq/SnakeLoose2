class CreateSnakelooses < ActiveRecord::Migration[6.1]
  def change
    create_table :snakelooses do |t|
      t.string :name
      t.integer :score
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
