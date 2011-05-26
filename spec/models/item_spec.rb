require File.dirname(__FILE__) + '/../spec_helper'

describe Item do
  context 'lists' do
    before do 
      @user = Fabricate :user
      @list = Fabricate :list, user: @user
      @item = Fabricate :item, list: @list
    end
    
    it 'belongs to one' do
      @item.list.should == @list
    end
  end
end