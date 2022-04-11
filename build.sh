echo 'Starting build'
npm run build.prod &
echo 'Waiting for build complete'
until [ -f /tmp/examplefile.txt ]
do
  sleep 5
done
echo 'Build complete'
