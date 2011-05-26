class User
  include Mongoid::Document
  field :name, type: String
  has_many :lists
  
  def as_json
    { id: id, name: name}.to_json
  end
end