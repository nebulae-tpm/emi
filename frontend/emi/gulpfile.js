const gulp = require('gulp');
const paths = {
    ignoreFromDistFolder: [
        '!src/app/main/content/content.component.html',
        '!src/app/main/content/content.component.scss',
        '!src/app/main/content/content.component.ts'],
    srcFolder: `../../frontend/emi`,
    devFolder: 'src/app/main/content'
}
let LAST_SYNC_TIMESTAMP = 0;
const DEBOUNCE_TIME = 2000;
// gulp.task('default', ['syncSource'] );

// configure which files to watch and what tasks to use on file changes
gulp.task('dev-sync-source', () => {
    gulp.watch([
        `${paths.devFolder}/**/*`,
        ...paths.ignoreFromDistFolder
    ],['updateRepoFiles']);

    gulp.watch(`${paths.srcFolder}/**/*`, ['updateDevelpmentFiles'])
});

// update from dev to src
gulp.task('updateRepoFiles', ()=> {
    if( (Date.now() - LAST_SYNC_TIMESTAMP) >= DEBOUNCE_TIME){
    console.log('#################### UPDATING SRC FOLDER ###################');
    LAST_SYNC_TIMESTAMP = Date.now();
    return gulp.src([
        `${paths.devFolder}/**/*`,
        ...paths.ignoreFromDistFolder
    ])
    .pipe(gulp.dest(`${paths.srcFolder}`));
    }
});

// update from src to dev
gulp.task('updateDevelpmentFiles', ()=> {
    if( (Date.now() - LAST_SYNC_TIMESTAMP) >= DEBOUNCE_TIME){
        console.log('############### UPDATING DEVELOPMENT FOLDER ###############');
        LAST_SYNC_TIMESTAMP = Date.now();
        return gulp.src(`${paths.srcFolder}/**/*`)
        .pipe(gulp.dest(`src/app/main/content`));
    }
});
