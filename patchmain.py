import glob, re
fs = glob.glob('android/app/src/main/java/**/MainActivity.java', recursive=True)
if not fs:
    raise SystemExit('MainActivity.java not found')
p = fs[0]
s = open(p, encoding='utf-8').read()
pkg = re.search(r'^package\s+([\w.]+);', s, re.M).group(1)
code = '''package %s;

import android.webkit.ValueCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onBackPressed() {
        try {
            getBridge().getWebView().evaluateJavascript(
                "(function(){try{return window.__pkBack?window.__pkBack():false}catch(e){return false}})()",
                new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String v) {
                        if (!"true".equals(v)) {
                            moveTaskToBack(true);
                        }
                    }
                });
        } catch (Exception e) {
            moveTaskToBack(true);
        }
    }
}
''' % pkg
open(p, 'w', encoding='utf-8').write(code)
print('MainActivity patched:', p)
