require 'rubygems'
require 'sinatra'

set root:   File.dirname(__FILE__), 
    public: Sinatra::Application.root + '/public',
    js:     Sinatra::Application.root + '/public/js'

get '/' do
  File.read Sinatra::Application.public + '/application.html'
end
