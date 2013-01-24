#!/bin/sh
/usr/local/bin/node "/usr/local/bin/titanium" build --platform iphone --sdk 3.0.0.GA --no-prompt --no-banner --xcode
exit $?
