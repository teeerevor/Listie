require File.dirname(__FILE__) + '/../spec_helper'

describe List do
  context 'users' do
    before do 
      @user = Fabricate :user
      @list = Fabricate :list, user: @user
    end
    
    it 'belongs to one' do
      @list.user.should == @user
    end
  end
end