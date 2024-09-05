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

For APK:
eas build -p android --profile preview

npx expo-doctor

Update packeges: npx expo install --check

eas credentials


Submit app - https://www.youtube.com/watch?v=wsaautyq00g
- Build first in Ios or Android: eas build
- Submit to Platform: npx eas submit --platform ios