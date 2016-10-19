var gulp = require('gulp'),
    consolidate = require('gulp-consolidate'),
    iconfont = require('gulp-iconfont'),
    rename = require('gulp-rename'),
    del = require('del'),
    runSequence = require('run-sequence'),
    iconConfig = require('./icons.json');

gulp.task('generate', function () {
    return gulp.src('tmp/*.svg')
        .pipe(iconfont({
            fontName: iconConfig['font-name'],
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            appendCodepoints: true,
            appendUnicode: false,
            normalize: true,
            fontHeight: 1000,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src('template/iconfont.css')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    className: iconConfig['class-name'],
                    fontName: options.fontName,
                    fontDate: new Date().getTime()
                }))
                .pipe(rename(options.fontName + '.css'))
                .pipe(gulp.dest('dist'));

            gulp.src('template/index.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    className: iconConfig['class-name'],
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('dist'));
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist', function () {
    return del(['dist']);
})

gulp.task('clean-tmp', function () {
    return del(['tmp']);
})

gulp.task('copy', function () {
    let total = iconConfig.icons.length;
    return new Promise(function (resolve, reject) {
        iconConfig.icons.forEach(function (icon) {
            gulp.src(icon.svg)
                .pipe(rename(icon.name + '.svg'))
                .pipe(gulp.dest('./tmp'))
                .on('end', function () {
                    if (--total == 0) {
                        reject();
                    }
                })
                .on('error', reject);
        });
    });
});

gulp.task('default', function () {
    return runSequence(
        ['clean-dist', 'copy'],
        'generate',
        'clean-tmp'
    );
})