<script setup>
    const model = defineModel();
    function updateModel(event){
        console.log(event.target.name);
        console.log(event.target.value)
        model.value[event.target.name] = event.target.value
    }
</script>
<template>
    <div>
        <div class="row">
            <span>Name:</span>
            <input type="text" name="name" id="customer_hint_name" size="5"
            :value="model.name"
            @input="updateModel">
        </div>
        <div class="row">
            <span>Second:</span>
            <input type="text" name="second" id="customer_hint_second" size="5"
            :value="model.second"
            @input="updateModel">
        </div>
    </div>
</template>
<style scoped>
    .row{
        display: flex;
        justify-content: space-between;
    }
</style>