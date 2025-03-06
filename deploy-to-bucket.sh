rm -rf build
npm run build
gsutil -m cp -r build/* gs://writeopia-landing-page