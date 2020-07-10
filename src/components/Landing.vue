<template>
    <div class="landing">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-5">
                    <div class="landing-content">
                        <h1 class="landing-title">
                            e-Shop for Shoppists
                        </h1>

                        <p>
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, necessitatibus 
                           dolores? Eius quidem magni illo consectetur rem eos ea ullam, sit at id veritatis 
                           asperiores quaerat? Doloremque nostrum voluptatibus quis?
                        </p>

                        <div class="landing-btn mt-5">
                            <button class="btn custom-btn btn-info mr-4">Explore</button>
                            <button class="btn custom-btn btn-outline-secondary">Products</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="graphic">
                        <img src="/images/svg/graphic.svg" alt="">
                    </div>
                </div>
            </div>
        </div>    
    </div>
</template>

<script>
    export default {
        name: 'Landing',
        
    }
</script>

<style lang="scss" scoped>
    .landing{

        width: 100%;
        height: 500px;
        text-align: left;
    }
</style>