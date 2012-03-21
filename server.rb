require 'rubygems'
require 'sinatra'

get '/' do
  erb :admin
end


get '/push/:command' do
  puts params[:command]
end


