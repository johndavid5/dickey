echo =============== >> app-express.log
c:\cygwin\bin\date >> app-express.log
node app-express.js 2>&1 | tee -a app-express.log
