class Task < ApplicationRecord
  belongs_to class_name: User, foreign_key: user_id, primary_key: user_id
end
