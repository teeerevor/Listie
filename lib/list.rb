class List
  include Mongoid::Document
  field :date,  type: Date
  has_many    :items
  belongs_to  :user
end