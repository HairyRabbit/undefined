import gulp from 'gulp'
import path from 'path'
import del from 'del'
import stylus from 'gulp-stylus'
import nunjucks from 'gulp-nunjucks-render'
import environment, { definePaths } from './environment'
import Taker from './taker'
import server from './server'

const env = environment()

const css = new Taker({
    gulp: gulp,
    env: env,
    extname: env.cssExtname,
    proc: stylus,
    procOpt: stylusOptions(env.paths, transformComponentPathForStylus)
})

const html = new Taker({
    gulp: gulp,
    env: env,
    extname: env.htmlExtname,
    proc: nunjucks,
    procOpt: nunjucksOptions(env.paths)
})

const js = new Taker({
    gulp: gulp,
    env: env,
    extname: env.jsExtname
})

function transformComponentPathForStylus(render) {
    render.str = render.str.replace(/[\"|\']@(\w+)[\"|\']/, '\"$1/index\"')
}

function stylusOptions(paths, ...transforms) {
    return {
	include: paths,
	use: transforms
    }
}

function nunjucksOptions(paths) {
    return {
	path: paths,
	envOptions: {
	    watch: false,
	    noCache: false
	}
    }
}


function watch(done) {
    css.majorWatch()
    css.minorWatch()
    html.majorWatch()
    html.minorWatch()
    // @todo add logger
    gulp.watch(js.majorPath, done => done())
    gulp.watch(js.minorPath, done => done())
    done()
}

/**
 * clean template
 */
function clean(done) {
    return del(`${env.tmp}/*`, done)
}

const main = do {
    gulp.task('clean',
	      gulp.series(clean))
    gulp.task('init',
	      gulp.parallel(::css.majorBuild,
			    ::html.majorBuild))
    gulp.task('server',
	      gulp.parallel(watch,
			    server(js)))
    gulp.task('default',
	      gulp.series('clean', 'init', 'server'))
}

