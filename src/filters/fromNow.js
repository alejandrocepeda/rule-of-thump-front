import moment from 'moment'
const fromNow = {}


fromNow.install = (Vue) => {
    Vue.filter('fromNow', (date) => {
        return moment(date).fromNow()        
    })
}

export default fromNow


