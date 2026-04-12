rm -rf dist
npm run build
gsutil -m cp -r dist/* gs://writeopia-landing-page