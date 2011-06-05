class List
  include Mongoid::Document
  field :date,  type: Date
  field :items, type: Array
  field :name, type: String
  belongs_to  :user
end
