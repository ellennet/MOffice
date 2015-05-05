package org.apache.cordova.MOffice;

import java.io.IOException;
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.telephony.PhoneNumberUtils;

public class CustomNativeAccess extends CordovaPlugin {
	
	public static DefaultHttpClient gHttpClient = null;	
	public static final String TAG = "DominoLoginPlugin";  
	
	private static final int PHONE_CALL = 0;
	
	public static final String ACTION_DOMINO_LOGIN = "dominoLogin"; //登录
	public static final String ACTION_GET_LOGIN = "getLogin"; //得到登录用户
	public static final String ACTION_EXIT = "sysExit"; //退出
	public static final String ACTION_CALL = "call"; //拨号
	public static final String ACTION_SMS = "sms"; //发短信
	
	public String username;
	public String password;
	private String HostAddress = "http://127.0.0.1:81";
		
	@Override  
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		//打开短信界面
		if(ACTION_SMS.equals(action)){
			String phoneNumber = args.getString(0);
			
			if(PhoneNumberUtils.isGlobalPhoneNumber(phoneNumber)){														
				Intent i = new Intent();
				i.setAction(Intent.ACTION_VIEW);				
				i.setData(Uri.parse("sms:" + phoneNumber));				
				this.cordova.startActivityForResult(this,i,PHONE_CALL);
				callbackContext.success();
				return true;
			}
			else{
				return false;
			}			
		}
		
		//打开拨号界面
		if(ACTION_CALL.equals(action)){
			String phoneNumber = args.getString(0);
			
			if(PhoneNumberUtils.isGlobalPhoneNumber(phoneNumber)){
				Intent i = new Intent();
				i.setAction(Intent.ACTION_DIAL);
				i.setData(Uri.parse("tel:" + phoneNumber));				
				this.cordova.startActivityForResult(this,i,PHONE_CALL);
				callbackContext.success();
				return true;
			}
			else{
				return false;
			}
		}
		
		//退出程序
		if(ACTION_EXIT.equals(action)){
			System.exit(0);
		}		
					
		//得到登录的用户名和密码
		if(ACTION_GET_LOGIN.equals(action)){
			//PluginResult mPlugin = new PluginResult(PluginResult.Status.OK, this.username);  
            callbackContext.success("[{'uname':'"+this.username+"','pwd':'"+this.password+"'}]");
			return true;					
		}
		
		//domino系统登录
        if (ACTION_DOMINO_LOGIN.equals(action)) {  

        	
        	
        	
        	
        	
        	this.username = args.getString(0);
        	this.password = args.getString(1);
        	        	
        	//domino登录
            DefaultHttpClient httpclient = new DefaultHttpClient();
            HttpGet httpget = new HttpGet(HostAddress + "/names.nsf?Login&username=" + this.username + "&password=" + this.password);
            HttpResponse response = null;
			try {
				response = httpclient.execute(httpget);
				if(response==null){
					return false;
				}
			} catch (ClientProtocolException e) {
				e.printStackTrace();
				return false;
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}        		
            //HttpEntity entity = response.getEntity();
            List<Cookie> cookies = httpclient.getCookieStore().getCookies();
    		                                  
            if(cookies.isEmpty()){
            	return false;
            }
            
            gHttpClient = httpclient;                	           
            
//            for (int i = 0; i < cookies.size(); i++) {              	
//                String a = "- domain " + cookies.get(i).getDomain();
//                String b = "- path " + cookies.get(i).getPath();
//                String c = "- value " + cookies.get(i).getValue();
//                String d = "- name " + cookies.get(i).getName();
//                String e = "- port " + cookies.get(i).getPorts();
//                String f = "- comment " + cookies.get(i).getComment();
//                String g = "- commenturl" + cookies.get(i).getCommentURL();
//                String h  = "- all " + cookies.get(i).toString(); 
//            }              
            
            callbackContext.success();
            return true;                               	                                                                    
        }
        else{        	
        	return false;
        }
        

    }  	
    
}