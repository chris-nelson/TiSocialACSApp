/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"H2MSsusI1EYaOQ6Uoqy8s6mQrgc7FwuO"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"bzFqhgmn61sqIO4I5Vi9Dx1M2rlRuCFy"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"ZkOsTTUyaaLndUcokxwObppVvgYosr1I"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"872kWts8TvesGoyxzZDUrvU305USUbM0"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"M3ICQwR7gFXFidSsLYtZeKugLBioHGEl"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"2Ioq1GGUjseR4GrDVl0DRJwHfnD0bP7W"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end