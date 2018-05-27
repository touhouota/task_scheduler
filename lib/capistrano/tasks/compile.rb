namespace :compile do
  desc 'デプロイ作業'
  task :webpack do
    `./node_modules/.bin/webpack --config ./webpack.config.production.js`
  end

  before 'deploy:assets:precompile', 'compile:webpack'
end
