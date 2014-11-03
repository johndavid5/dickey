# "It's all been such great fun...!"
# curl -v --noproxy localhost --trace-ascii curl_user.trace-ascii.out -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRpY2tleXh4eCJ9.0w1RshE-2k7r94VmFZeSH_JBOTAg90EecznduMwaEGc" http://localhost:3000/user 2>&1 | tee curl_user.out
curl -v --noproxy localhost -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRpY2tleXh4eCJ9.0w1RshE-2k7r94VmFZeSH_JBOTAg90EecznduMwaEGc" http://localhost:3000/user 2>&1 | tee curl_user.out
