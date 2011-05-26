class List
  include Mongoid::Document
  field :date,  type: Date
  has_many    :items
  belongs_to  :user
  
  def as_json
    { date: date, user_id: user.id }.to_s
  end
end