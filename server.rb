require 'rubygems'
require 'sinatra'

get '/' do
  erb :admin, :format=>:html5
end

get '/admin' do
  erb :admin
end

get '/cordova-1.5.0.js' do
  erb :cordova
end
