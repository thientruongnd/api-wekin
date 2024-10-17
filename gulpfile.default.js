const gulp = require('gulp');
const pm2 = require('pm2');
const debug = require('gulp-debug');

gulp.task('TaskName', () => {
    gulp.src('*')
        .pipe(debug());
    pm2.connect(true, () => {
        pm2.start({
            name: 'TaskName',
            script: './bin/www',
            watch: ['controllers', 'models'],
            ignore_watch: [],
        }, () => {
            console.log('pm2 started');
        });
    });
});
