# Install Vector Icons

Untuk menggunakan vector icons, jalankan command berikut:

## 1. Install Package
```bash
npm install react-native-vector-icons
```

## 2. Link Icons (React Native CLI)
```bash
npx react-native link react-native-vector-icons
```

## 3. Untuk Android - Edit android/app/build.gradle
Tambahkan di bagian bawah file:
```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

## 4. Untuk iOS - Edit ios/[ProjectName]/Info.plist
Tambahkan sebelum tag `</dict>`:
```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialIcons.ttf</string>
</array>
```

## 5. Rebuild Project
```bash
npx react-native run-android
# atau
npx react-native run-ios
```

## Icons yang Digunakan:
- **save**: Icon simpan data
- **edit**: Icon edit data  
- **close**: Icon batal/close
- **list**: Icon lihat data
- **arrow-back**: Icon kembali
- **delete**: Icon hapus data

Semua menggunakan MaterialIcons dari Google Material Design.