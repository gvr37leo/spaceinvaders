cd client
start tsc
cd ../

cd server
start tsc
start nodemon --inspect --watch .\server.js .\server.js
cd ../

start http://localhost:8000/