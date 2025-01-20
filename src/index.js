import './module'
import '@/scss/index.scss'

console.log('Working!')

async function test() {
    return await Promise.resolve('async')
}

test().then(console.log)
