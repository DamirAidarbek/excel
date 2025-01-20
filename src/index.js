import "./module";
import '@/scss/index.scss';

console.log('Working!')

async function test() {
    return await Promise.resolve('async')
}

test().then(console.log)

const ss = '23'

const obk = {a:2,b:'22'}