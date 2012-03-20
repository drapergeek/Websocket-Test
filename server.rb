require 'rubygems'
require 'sinatra'

get '/' do
  erb :iphone, :format=>:html5
end

get '/admin' do
  erb :admin
end

