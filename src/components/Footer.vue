<template>
    <div>
        <div  class="container mt-1 position-relative pl-0 pr-0" >
                    
            <img style="width:100%; object-fit: cover; background-color:#fff; opacity: 0.2" height="100" width="100%" :src="require(`@/assets/img/footer.png`)" alt="">
        
            <div style="bottom:0; top:0px" class="ml-2 row position-absolute w-100 form-inline">
                <div class="col-md-10 col-sm-12">
                    <h2 style="font-weight: 300;" class="text-dark">{{ $t('Is there anymore else you would want us to add')}} ?</h2>
                </div>

                <div class="col-md-2 col-sm-12">
                    <button style="border: #000 3px solid; color:#333" type="button" class="font-weight-bold rounded-0 btn btn-outline btn-lg">{{ $t('Submit a Name')}}</button>
                </div>
                
            </div>

        
        </div>
        
        <div class="container mt-5">
            <div style="border-top: 1px dashed #999;" class="pt-4 row text-muted">
                <div class="col-md-8 pl-0">                    
                    <a href="#" class="text-muted btn btn-link pl-0">{{ $t('Terms and Conditions')}}</a>
                    <a href="#" class="text-muted btn btn-link">{{ $t('Privacy Policy')}}</a>
                    <a href="#" class="text-muted btn btn-link">{{ $t('Contact Us')}}</a>
                </div>
                <div class="col-md-4 pr-0 text-right float-right">
                    <a href="#" class="text-muted btn btn-link">{{ $t('Follow Us') }}</a>
                    <a href="#" class="text-dark btn btn-link"><i class="mdi mdi-28px mdi-facebook"></i></a>
                    <a href="#" class="text-dark btn btn-link pr-0"><i class="mdi mdi-28px mdi-twitter"></i></a>
                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>