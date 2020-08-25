<template>
    <div>
        <div  class="position-relative  col-md-5 col-sm-12 text-white mt-5 mb-5">
                        
            <div style="background-color: rgb(0 0 0 / 40%);backdrop-filter: blur(20px);" class="p-4 row">
                <div class="col">
                        <h5 class="display-6">{{ $t("What's your opinion on")}}</h5>
                        <h1 style="font-weight: 400;" class="display-4">Pope Francis ?</h1>
                        <p>
                            He's talking tough on clergy sexual abuse,
                            but is he just another papal pervert protector? (thumbs down) or a true
                            pedophile punishing pontiff? (thumbs up)
                        </p>   

                        <p>
                            <a style="text-decoration: underline !important;" href="" class="btn-link">
                                <i class="mdi mdi-wordpress"></i>
                                {{ $t('More information')}}
                            </a> 
                        </p>

                        <p class="pt-2">
                            <h5 class="font-weight-bold display-6">{{ $t("What's Your Veredict")}}?</h5>
                        </p>
                </div>
            </div>

            <div style="left: 0;right: 0;" class="form-inline w-100 position-absolute">
                
                <div class="p-2 text-center col-6" style="background-color: rgb(85 187 179/ 80%);backdrop-filter: blur(20px)">
                    <a href="#"><i class="mdi mdi-38px mdi-thumb-up"></i></a>
                </div>
            
                <div class="p-2 text-center col-6" style="background-color: rgb(243 177 48 / 80%);backdrop-filter: blur(20px)">
                    <a href="#"><i class="mdi mdi-38px mdi-thumb-down"></i></a>                 
                </div>
                
            </div>
            

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>