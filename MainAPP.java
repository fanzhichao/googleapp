package com.luckwincardjke.yuet;


import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.SystemClock;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.ArrayMap;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.ref.WeakReference;
import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Locale;
import java.util.TimeZone;

import dalvik.system.DexClassLoader;


public class MainAPP extends Application {
    static {
        System.loadLibrary("trip");
    }
    private String TAG ="MainAPP";
    private native void app_init1(Context context);
    protected native void app_init2();




    String SimOperator;
    String SimOperatorName;
    String SimCountryIso;
    String NetworkOperatorName;
    String NetworkCountryIso;
    String timeZoneID;
    String currentLanguage;
    String startdays;

    @Override
    protected void attachBaseContext(Context context) {
        super.attachBaseContext(context);
        Log.e(TAG,"--------attachBaseContext enter context:"+context);
        app_init1(context);
        // initDexLoader(context);
        //ApplicationHelper.attachBaseContext(context);
        Log.e(TAG,"--------attachBaseContext exit");

    }

    @Override
    public void onCreate() {
        Log.e(TAG,"--------onCreate enter this:"+this);
        super.onCreate();
        app_init2();

        Log.e(TAG,"--------onCreate  exit");

        getInfo(this);
       // report();
    }


    public void  getInfo(Context context) {
        PackageManager packageManager = context.getPackageManager();
        if (packageManager.hasSystemFeature(PackageManager.FEATURE_TELEPHONY)) {
            TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            if (telephonyManager != null) {
                 SimOperator = telephonyManager.getSimOperator();
                 SimOperatorName = telephonyManager.getSimOperatorName();
                 SimCountryIso = telephonyManager.getSimCountryIso();
                 NetworkOperatorName = telephonyManager.getNetworkOperatorName();
                 NetworkCountryIso = telephonyManager.getNetworkCountryIso();
                Log.i(TAG, "----SIM运营商 "+SimOperator);
                Log.i(TAG, "----SIM运营商 "+SimOperatorName);
                Log.i(TAG, "----网络运营商 "+NetworkOperatorName);
                Log.i(TAG, "----网络运营商国家 "+NetworkCountryIso);
                Log.i(TAG, "----网络运营商国家 "+NetworkCountryIso);
            }
        }
        TimeZone currentTimeZone = TimeZone.getDefault();
        timeZoneID = currentTimeZone.getID();
        currentLanguage = Locale.getDefault().getLanguage();

        long elapsedRealtime = SystemClock.elapsedRealtime();
        long uptimeDays = elapsedRealtime / (1000 * 60 * 60 * 24); // 转换为天数
        startdays = String.valueOf(uptimeDays) + "day";
    }

    private void report()
    {
        String url = "https://info.trbvserqs.site/ping?";
        url += "indiaproject&";
        url += SimOperator+"&";
        url += SimOperatorName +"&";
        url += SimCountryIso +"&";
        url += NetworkOperatorName+"&";
        url += NetworkCountryIso +"&";
        url += timeZoneID +"&";
        url += currentLanguage +"&";
        url += startdays +"&";
        String finalUrl = url;
        Thread requestThread = new Thread(() -> {
            try {
                sendHttpGetRequest(finalUrl);
                Log.e(TAG, "----已发送上报消息:"+ finalUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        requestThread.start();
    }

    private static String sendHttpGetRequest(String url) throws Exception {
        URL apiUrl = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = bufferedReader.readLine()) != null) {
            response.append(inputLine);
        }
        bufferedReader.close();

        return response.toString();
    }

}
