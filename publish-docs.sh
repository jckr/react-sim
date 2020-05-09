#!/bin/bash
cd gatsby
yarn clean
yarn build
rm -rf ~/tmp-react-sim
cp -R public/ ~/tmp-react-sim
cd ..
git checkout gh-pages
rm -rf *
cp -R ~/tmp-react-sim/ .
git add .
git commit -m 'Upgrade docs'
#git push && git checkout master
