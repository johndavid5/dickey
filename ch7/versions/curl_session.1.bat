curl -v --noproxy localhost -XPOST --data "{\"username\": \"dickeyxxx\"}" -H "Content-Type: application/json" http://localhost:3000/session 2>&1 | tee curl_session.out
