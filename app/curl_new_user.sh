set -x
curl -v --noproxy localhost -XPOST --data "{\"username\": \"dickeyxxx\", \"password\": \"pass\"}" -H "Content-Type: application/json" "http://localhost:3000/api/users" 2>&1 | tee curl_new_user.out
curl -v --noproxy localhost -XPOST --data "{\"username\": \"arnie\", \"password\": \"pass\"}" -H "Content-Type: application/json" "http://localhost:3000/api/users" 2>&1 | tee curl_new_user.out
set +x
