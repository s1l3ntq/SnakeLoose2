# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
all_scores = Game.create([{name: "Q  15,000"}, {name: "QIM 11,000"}, {name: "QVT 9,000"}] )

 high_scores = Snakeloose.create([{name: "Q", score:15000}])
 Snakeloose.create(name: "QIM", score:11000)
 Snakeloose.create(name: "QVT", score:9000)
 Snakeloose.create(name: "QRS", score:5000)