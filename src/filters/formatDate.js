import moment from 'moment'
const formatDate = {}


formatDate.install = (Vue) => {
    Vue.filter('formatDate', (date,format) => {

        return moment(date).format(format)        
    })
}

export default formatDate


