/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.project.realwar;

import android.os.Bundle;
import org.apache.cordova.*;

import com.parse.Parse;
import com.parse.ParseAnalytics;
import com.parse.PushService;
import com.parse.ParseInstallation;

public class realwar extends CordovaActivity 
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
        Parse.initialize(this, "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY", "19xXwpk6OMaEo7AWR1JQJ83aDo0qNPndIWk7s2ZJ");
        PushService.setDefaultPushCallback(this, CordovaActivity.class);
        ParseInstallation.getCurrentInstallation().saveInBackground();
        
        
        super.init();
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html")
    }
}

