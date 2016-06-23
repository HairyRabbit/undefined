import del from 'del'
import gulp from 'gulp'
import path from 'path'
import Taker from './taker'
import stylus from 'gulp-stylus'
import server from './server'
import nunjucks from 'gulp-nunjucks-render'
import environment from './environment'

const env = environment()

const css = new Taker({
    gulp: gulp,
    env: env,
    extname: env.cssExtname,
    proc: stylus,
    procOpt: stylusOptions(env.paths, transformComponentPathForStylus),
    errHandle: console.log,
})

const html = new Taker({
    gulp: gulp,
    env: env,
    extname: env.htmlExtname,
    proc: nunjucks,
    procOpt: nunjucksOptions(env.paths),
})

const js = new Taker({
    gulp: gulp,
    env: env,
    extname: env.jsExtname,
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
    gulp.watch([js.majorPath, js.minorPath])
	.on('change', function(file, stat) {
	    console.log(file)
	})
    done()
}

/**
 * clean template
 */
function clean(done) {
    return del(`${env.tmp}/*`, done)
}

const main = do {
    gulp.task('init',
	      gulp.parallel(::css.majorBuild,
			    ::html.majorBuild))
    gulp.task('server',
	      gulp.parallel(watch,
			    server(js)))
    gulp.task('default',
	      gulp.series(clean, 'init', 'server'))
    
    gulp.on('stop', function(evt) {
	let { name, duration } = evt
    })
}

