p = 'android/app/src/main/AndroidManifest.xml'
s = open(p, encoding='utf-8').read()
names = ['CAMERA', 'RECORD_AUDIO', 'MODIFY_AUDIO_SETTINGS', 'POST_NOTIFICATIONS', 'VIBRATE']
add = ''.join('    <uses-permission android:name="android.permission.%s" />\n' % n
              for n in names if 'android.permission.%s"' % n not in s)
s = s.replace('</manifest>', add + '</manifest>')
open(p, 'w', encoding='utf-8').write(s)
print('permissions added')
