class List
  include Mongoid::Document
  field :date,  type: Date
  field :items, type: Array
  belongs_to  :user
end