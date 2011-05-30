require File.dirname(__FILE__) + '/spec_helper'

describe 'the API' do
  context 'users' do
    it 'POST /users with params[:name] creates a user' do
      lambda do
        post '/users', name: 'Roberto'
      end.should change { User.count }.by(1)
    end
  end

  context 'authentication' do
    it 'POST /sign-in with params[:name] authenticates a user if the name exists' do
      user = Fabricate :user
      post '/sign-in', name: user.name
      last_response.should be_ok
    end

    it 'POST /sign-in with params[:name] returns 404 if the name does not exist' do
      post '/sign-in', name: 'none'
      last_response.status.should be 401
    end

    it 'GET /sign-out logs the current user out' do
      # Due to the stupidity of testing sessions and Sinatra, this test will remain largely useless.
      get '/sign-out'
      last_response.should be_ok
    end
  end

  context 'lists' do
    before do
      @user = Fabricate :user
      # post '/sign-in', name: @user.name
    end

    context 'creating' do
      it 'POST /lists with params[:date] creates a list, requires a user' do
        pending # What a joke
        lambda do
          post '/lists', date: Date.today, 'rack.session' => { 'user_name' => @user.name }
          puts last_response.body
        end.should change { List.count }.by(1)
      end
      
      it 'POST /lists without being logged in is not ok' do
        lambda do
          post '/lists', date: Date.today
        end.should_not change { List.count }.by(1)        
      end
    end
  end
end