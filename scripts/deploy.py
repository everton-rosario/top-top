import os, sys, time, datetime, traceback, fileinput, random, re, httplib

from subprocess import call

def ensure_directory(f):
    d = os.path.dirname(f)
    if not os.path.exists(d):
        os.makedirs(d)

ensure_directory('work/')
call(['rm', '-f', 'work/*'])

os.chdir('repository')

print 'Updating repository'
call(['git', 'pull'])

print 'Cleaning Apache directory'
ensure_directory('/var/www/html/top/')
call('sudo rm -Rf /var/www/html/top/*', shell=True)

print 'Copying files'
call('sudo cp -R webapp/* /var/www/html/top/', shell=True)
call('cp scripts/deploy/deploy.py ../', shell=True)

