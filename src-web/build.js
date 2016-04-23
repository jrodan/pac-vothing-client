echo "started build"
echo "~ empty folder"
rm -rf 'src/main/webapp/*.js'
rm -rf 'src/main/webapp/*.html'
rm -rf 'src/main/webapp/css'
rm -rf 'src/main/webapp/fonts'
rm -rf 'src/main/webapp/js'
rm -rf 'src/main/webapp/img'
echo "~ remove dependencies from src-web folder"
rm -rf 'src-web/css/bootstrap.min.css'
echo "~ create folder"
mkdir -p 'src/main/webapp/img'
mkdir -p 'src/main/webapp/js'
mkdir -p 'src/main/webapp/fonts'
mkdir -p 'src/main/webapp/css'
echo "~ browserify"
browserify -t [ babelify --presets [ es2015 react ] scssify browserify-css] -t reactify src-web/js/main.jsx > src/main/webapp/js/bundle.js
echo "~ copyfiles"
copyfiles -f 'src-web/index.html' 'src/main/webapp/'
copyfiles -f 'src-web/fonts/*' 'src/main/webapp/fonts/'
cp 'node_modules/bootstrap/dist/css/bootstrap.min.css' 'src-web/css/bootstrap.min.css'
echo "~ cleancss"
cleancss -o "src/main/webapp/css/app.min.css" "src-web/css/app.css"
echo "~ build maven artifact"
echo "//mvn clean install"
echo "~ deploy war file // TODO remove this later on"
echo "//cp 'target/vothing-client-0.0.1-SNAPSHOT.war' '/Users/jrodan/dev/pac/wildfly-10.0.0.Final/standalone/deployments/'"