<template>
    <div>

        <button v-on:click="closeCarShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>

        <h2>Luca Auto</h2>

        <p>
            Need some wheels?
        </p>

        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Power</th>
                    <th>Description</th>
                    <th>Buy</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in carStore" :key="item.name">
                    <td><img :src="item.img"></td>
                    <td>{{ item.name }}</td>
                    <td>+{{ item.power }}</td>
                    <td><i>{{ item.description }}</i></td>
                    <td>
                        <span v-if="car == item.name">
                            <button disabled>
                                <small>Current</small>
                            </button>
                        </span>
                        <span v-else-if="inventory.includes(item.name)">
                            <button v-on:click="equipCar(item.name)">
                                <small>Use</small>
                            </button>
                        </span>
                        <span v-else>
                            <button v-on:click="purchaseCar(item.name, item.price)" v-bind:disabled="money < item.price">
                                <small>${{ item.price | filterNumber }}</small>
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <br><span class="text-large text-stylized">Current money: $ {{ money | filterNumber }}</span><br>
        <br>
        <button v-on:click="closeCarShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>
        <br><br>

    </div>
</template>

<script>
export default {
    name: 'GameCarShop',
    props: {
        xp: Number,
        money: Number,
        inventory: Array,
        car: String,
        carStore: Object,
    },
    methods: {
        closeCarShop() {
            this.$emit('togglecarshop', 'close');
        },
        purchaseCar(car, price) {
            this.$emit('clicked', 'Purchased ' + car + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
            this.$emit('updatexp', 100);
            this.$emit('purchasecar', car, price);
            // this.$emit('togglecarshop', 'close');
        },
        equipCar(car) {
            this.$emit('clicked', 'Changed car to ' + car + '.');
            this.$emit('equipcar', car);
            // this.$emit('togglecarshop', 'close');
        }
    },
    filters: {
        filterNumber(val) {
            if(typeof(val) == "number") {
                // return new Intl.NumberFormat().format(val);
                return val.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
            }
            return val;
        },
    }
}
</script>



<style scoped>
table img {
    width:100px;
    height:60px;
    background:rgba(255,255,255,0.8);
}
table td {
    text-align:center;
    border:1px solid #777;
}
</style>