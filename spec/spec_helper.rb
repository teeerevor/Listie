require 'bundler/setup'
require 'sinatra'
require 'rack/test'
Sinatra::Application.environment = :test
Bundler.require :default, Sinatra::Application.environment
Mongoid.logger.level = 5
require File.dirname(__FILE__) + '/../app'

RSpec.configure do |config|
  config.include Rack::Test::Methods
  config.before :all do
    User.destroy_all
  end
end

def app
  Sinatra::Application
end

set :views, Sinatra::Application.root + '/views'

Fabricator :user do
  name  { Fabricate.sequence(:number) { |i| "Montenegro #{i}" } } 
end

Fabricator :list do
  date  { Date.today  - rand(20).days }
end

Fabricator :item do
  name  { Fabricate.sequence(:number) { |i| "Item #{i}" } } 
end