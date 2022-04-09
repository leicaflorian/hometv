let mix = require('laravel-mix')

mix.setPublicPath('public')
mix.setResourceRoot('../')

mix.disableNotifications()
mix.js('resources/js/app.js', 'public/assets').vue()
mix.sass('resources/sass/app.scss', 'public/assets')
