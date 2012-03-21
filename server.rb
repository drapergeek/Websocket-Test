require 'rubygems'
require 'sinatra'
require 'pusher'

get '/' do
  erb :admin
end


get '/push/:command' do
  puts params[:command]
  Pusher.app_id = '17217'
  Pusher.key = 'd141f03421d0c08db875'
  Pusher.secret = '564af0b867bdb4739df8'

  data = {'message' => params[:command]}
  Pusher['colors'].trigger('change', data)
end


