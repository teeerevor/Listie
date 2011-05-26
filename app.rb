require 'rubygems'
require 'bundler/setup'
Bundler.require :default, Sinatra::Application.environment

Dir['lib/**'].map { |lib| require File.basename(lib) }

set root:   File.dirname(__FILE__),
    public: Sinatra::Application.root + '/public',
    js:     Sinatra::Application.root + '/public/js'
    
configure do
  Mongoid.configure do |config|
    config.from_hash YAML.load_file(Sinatra::Application.root + '/database.yml')[Sinatra::Application.environment.to_s]
  end
end

get '/' do
  File.read Sinatra::Application.public + '/application.html'
end

post '/users' do
  
end