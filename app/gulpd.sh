# REM gulp js 2>&1 | tee gulp_js.out
# REM gulp watch:js 2>&1 | tee gulp_js.out
set -x
gulp dev 2>&1 | tee gulpd.out
set +x
