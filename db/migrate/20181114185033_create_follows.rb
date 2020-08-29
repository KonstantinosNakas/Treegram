class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.column :user_id_follower, :int
      t.column :user_id_followed, :int
    end
  end
end
