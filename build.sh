rm -rf dist
echo 'Starting build'
npm run build.prod &
echo 'Waiting for build complete'
until [ -f ./dist/spa-mat/index.html ]
do
  sleep 5
done
echo 'Build complete'
