# How to use

Example of deployable app for the Android Playstore and IoS Store.
Change the URL in App.js to your web view.

# Create Icons and Splash
https://www.youtube.com/watch?v=QSNkU7v0MPc

##
Release App to Appstore

https://support.google.com/googleplay/android-developer/answer/9859152?hl=de

## Start App

npx expo start --android

Build:
eas build

eas build -p android --profile preview --local

npx expo-doctor

Update packeges: npx expo install --check