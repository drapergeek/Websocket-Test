require 'rubygems'
require 'sinatra'
require 'pusher'

def setup_pusher
  return if session[:pusher_setup]
  Pusher.app_id = '17217'
  Pusher.key = 'd141f03421d0c08db875'
  Pusher.secret = '564af0b867bdb4739df8'
  session[:pusher_setup] = true
end

get '/' do
  erb :admin
end

get '/push/:command' do
  puts params[:command]
  setup_pusher
  data = {'message' => params[:command]}
  Pusher['colors'].trigger('change', data)
end

get '/fade' do
  setup_pusher
  puts params.inspect
  data = {'event' => 'fade', 
          'time_delay' => 0, 
          'options' => 
              {'from_color' => params[:from_color], 
                'to_color' =>  params[:to_color],
                'delay' => params[:delay]
              }
         }
  Pusher['colors'].trigger('events', data)
end


