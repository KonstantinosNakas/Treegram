class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.column :photo_id, :int
      t.column :user_id, :int
      t.column :comment_text, :string
    end
  end
end
