require File.dirname(__FILE__) + '/../spec_helper'

describe User do
  context 'lists' do
    before do @user = Fabricate :user end
    
    it 'has many' do
      @user.lists.should be_an Array
    end
  end
end