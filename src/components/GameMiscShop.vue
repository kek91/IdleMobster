<template>
    <div>

        <button v-on:click="closeMiscShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>

        <h2>Tony's Shop</h2>
        <p>
            Good afternoon kid. What can I get ya?
        </p>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Buy</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in miscStore" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td><i>{{ item.description }}</i></td>
                    <td>
                        <span v-if="inventory.includes(item.name)">
                            <button disabled>
                                <small>Already owned</small>
                            </button>
                        </span>
                        <span v-else>
                            <button v-on:click="purchaseMisc(item.name, item.price)" v-bind:disabled="money < item.price">
                                <small>${{ item.price | filterNumber }}</small>
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <br><span class="text-large text-stylized">Current money: $ {{ money | filterNumber }}</span><br>
        <br>
        <button v-on:click="closeMiscShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>
        <br><br>

    </div>
</template>

<script>
export default {
    name: 'GameMiscShop',
    props: {
        xp: Number,
        money: Number,
        inventory: Array,
        miscStore: Object,
    },
    methods: {
        closeMiscShop() {
            this.$emit('togglemiscshop', 'close');
        },
        purchaseMisc(item, price) {
            this.$emit('clicked', 'Purchased ' + item + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
            this.$emit('purchasemisc', item, price);
            this.$emit('updatexp', 100);
            // this.$emit('togglemiscshop', 'close');
        },
    },
    filters: {
        filterNumber(val) {
            if(typeof(val) == "number") {
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
    height:100px;
    background:rgba(255,255,255,0.8);
}
table td {
    text-align:center;
    border:1px solid #777;
}
</style>