<template>
    <div class="products" id="products">
        <div class="container">
            <h1 class="text-center p-5">Our Products</h1>
            <div class="row">

                <div class="col-md-4">
                    <div class="card product-item">
                        <img src="/images/products/product1.jpg" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">Surface Book 1</h5>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum ipsum 
                                    iusto eaque eos culpa accusamus. A aspernatur, reprehenderit sapiente.
                                </p>
                                <a href="#" class="btn btn-primary"> Add to Cart</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card product-item">
                        <img src="/images/products/product2.jpg" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">Surface Book 2</h5>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum ipsum 
                                    iusto eaque eos culpa accusamus. A aspernatur, reprehenderit sapiente.
                                </p>
                                <a href="#" class="btn btn-primary"> Add to Cart</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card product-item">
                        <img src="/images/products/product3.jpg" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">Surface Book 3</h5>
                                <p class="card-text">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum ipsum 
                                    iusto eaque eos culpa accusamus. A aspernatur, reprehenderit sapiente.
                                </p>
                                <a href="#" class="btn btn-primary"> Add to Cart</a>
                        </div>
                    </div>
                </div>                

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Products',
        
    }
</script>

<style lang="scss" scoped>
    .products{    
        background: grey;
        padding-bottom: 3rem;
    }
</style>