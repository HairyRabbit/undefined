import del from 'del'
import gulp from 'gulp'
import path from 'path'
import environment from './environment'
import {
  ComponentSylesTasttaker
} from './taker'

const env = environment()
const instance = {
  env: env,
}

const styles = new ComponentSylesTasttaker({ instance: instance })
gulp.registry(styles)

/**
 * Clean `tmp`
 *
 * @todo add deep clean tasks
 */
function clean(done) {
  return del(`${env.test}/*`, done)
}


gulp.task('default', gulp.series(
  clean,
  styles.taskName
))
