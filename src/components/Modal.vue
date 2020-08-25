<template>
    <div>
        <div id="modalOverlay" @click="closeModal">
        </div>   

        <transition name="slide">
            <div id="modal-box" class="text-left bg-white position-fixed p-3 border rounded">
                
                <div class="row">
                    <div class="col">
                        <slot name="top">                            
                        </slot>
                    </div>
                </div>
                
                <div class="row pb-3">
                    <div class="col text-center">
                        <h5 class="page-title modal-title">
                            <slot name="title"></slot>
                        </h5>
                    </div>
                </div>
                
                
                <div class="row pl-3 pr-3">
                    <div class="col">
                        <div class="mt-3">
                            <slot name="body" ></slot>
                        </div>
                    </div>
                </div>

            </div>    
        </transition>
    
     </div>
    
</template>

<script>


import { mapState } from 'vuex'

export default {        
    name: 'Modal',          
    data () {
        return {}
    },   
    computed: {
        ...mapState(['showModal']),
        showModal(){
            return this.$store.state.showModal
        },
    },     
    methods:{       
        toggleModal(){
            this.$store.commit('toggleShowModal')
        },
        closeModal(e){

            if(e.target.id == 'modalOverlay'){                
                this.$store.commit('toggleShowModal')
            }
          
        }
    }
}
</script>

<style scped>
    .page-title.modal-title{
        font-size: 1.3rem !important;
        font-weight: 700;
    }

    #modalOverlay{
        background-color: rgba(0,0,0,0.6);
        z-index:1040;
        position:fixed;
        top:0;
        bottom:0;
        right:0;
        left:0 
    }
    
    #modal-box{
        max-height: 80%;
        overflow-y: hidden;
        overflow-x: hidden;
        width: auto;
        transform: translate(0, -50%);
        top: 50%;
        right: 25%;
        left: 25%;
        z-index: 10000
    }


@media 
only screen and (max-width: 778px),
(min-device-width: 768px) and (max-device-width: 937px)  {
    #modal-box{
        max-height: 100%;                
        right: 5% !important;
        left: 5% !important;        
    }   
}

</style>
