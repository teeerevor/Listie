$: << (File.dirname(__FILE__) + '/lib')
require 'rubygems'
require 'bundler/setup'
require 'sinatra'
Bundler.require :default, Sinatra::Application.environment

Dir['lib/**'].map { |lib| require File.basename(lib) }

set root:   File.dirname(__FILE__),
    public: Sinatra::Application.root + '/public',
    js:     Sinatra::Application.root + '/public/js',
    sessions: true
                               
configure do
  Mongoid.configure do |config|
    config.from_hash YAML.load_file(Sinatra::Application.root + '/database.yml')[Sinatra::Application.environment.to_s]
  end
end

def parse_json_request
  request.body.rewind
  params.merge!(JSON.parse request.body.read) rescue nil
end

def json_request?
  request.env['HTTP_ACCEPT'] =~ /json/i
end

def login_required!
  halt 401, {}, { message: 'Login required!' }.to_json unless @user
end

before do
  parse_json_request if json_request?
  begin
    @user = User.find session[:user_id] unless session[:user_id].blank?
  rescue Mongoid::Errors::DocumentNotFound
    session.clear
  end
end

get '/' do
  erb :application
end

post '/users' do
  content_type :json
  user = User.create name: params[:name]
  session[:user_id] = user.id.to_s
  user.to_json methods: [:id]
end

post '/sign-in' do
  content_type :json
  user = User.where(name: params['name']).first
  halt(401, {}, 'Invalid user name!') unless user
  session[:user_id] = user.name
  user.to_json methods: [:id]
end

get '/sign-out' do
  content_type :json
  session.clear
  { message: 'Logged out!'}.to_json
end

post '/lists' do
  content_type :json
  login_required!
  list = @user.lists.create date: Date.today, items: params[:items] || []
  list.to_json methods: [:id]
end

put '/lists/:id' do
  content_type :json
  list = @user.lists.find params[:id]
  list.update_attributes items: params[:items]
  list.to_json methods: [:id]
end