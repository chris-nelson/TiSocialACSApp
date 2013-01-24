/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

typedef struct TiBindingEventOpaque * TiBindingEvent;

#if TARGET_OS_IPHONE

#import "TiProxy.h"

TiBindingEvent TiBindingEventCreateWithNSObjects(TiProxy * target, TiProxy * source, NSString * type, NSDictionary * payload);

#endif

void TiBindingEventSetBubbles(TiBindingEvent event, bool bubbles);

void TiBindingEventFire(TiBindingEvent event);

void TiBindingEventDispose(TiBindingEvent event);
