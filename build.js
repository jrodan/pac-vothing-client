echo "started build"
echo "~ empty folder"
rm -rf 'public/*.js'
rm -rf 'public/*.html'
rm -rf 'public/css'
rm -rf 'public/fonts'
rm -rf 'public/js'
rm -rf 'public/img'
echo "~ remove dependencies from src folder"
rm -rf 'src/css/bootstrap.min.css'
echo "~ create folder"
mkdir -p 'public/img'
mkdir -p 'public/js'
mkdir -p 'public/fonts'
mkdir -p 'public/css'
echo "~ browserify"
browserify -t [ babelify --presets [ es2015 react ] scssify browserify-css] -t reactify src/js/main.jsx > public/js/bundle.js
##browserify src/js/main.jsx > public/js/bundle.js
echo "~ copyfiles"
copyfiles -f 'src/index.html' 'public/'
copyfiles -f 'src/fonts/*' 'public/fonts/'
copyfiles -f 'src/img/*' 'public/img/'
cp 'node_modules/bootstrap/dist/css/bootstrap.min.css' 'src/css/bootstrap.min.css'
echo "~ cleancss"
cleancss -o "public/css/app.min.css" "src/css/app.css"
echo "~ cleanup"
echo "~ remove dependencies from src folder"