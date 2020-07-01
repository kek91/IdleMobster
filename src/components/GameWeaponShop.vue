<template>
    <div>

        <button v-on:click="closeWeaponShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>

        <h2>Vincenzo's Guns</h2>

        <p>
            Oy there lad. Welcome to my gun shop. See anything you like?
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
                <tr v-for="item in weaponStore" :key="item.name">
                    
                    <td v-if="item.name == 'Ammunition Box' || item.name == 'Ammunition Box XL' || item.name == 'Ammunition Box XXL'"></td>
                    <td v-else><img :src="item.img"></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.power }}</td>
                    <td><i>{{ item.description }}</i></td>
                    <td>
                        <span v-if="item.name == 'Ammunition Box' || item.name == 'Ammunition Box XL' || item.name == 'Ammunition Box XXL'">
                            <button v-on:click="purchaseAmmo(item.name, item.price)" v-bind:disabled="money < item.price">
                                <small>${{ item.price | filterNumber }}</small>
                            </button>
                        </span>
                        <span v-else-if="weapon == item.name">
                            <button disabled>
                                <small>Equipped</small>
                            </button>
                        </span>
                        <span v-else-if="inventory.includes(item.name)">
                            <button v-on:click="equipWeapon(item.name)">
                                <small>Equip</small>
                            </button>
                        </span>
                        <span v-else>
                            <button v-on:click="purchaseWeapon(item.name, item.price)" v-bind:disabled="money < item.price">
                                <small>${{ item.price | filterNumber }}</small>
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <br><span class="text-large text-stylized">Current money: $ {{ money | filterNumber }}</span><br>
        <br>
        <button v-on:click="closeWeaponShop">
            <i class="fa fa-door-open fa-3x"></i><br>
            <small>Exit shop</small>
        </button>
        <br><br>

    </div>
</template>

<script>
export default {
    name: 'GameWeaponShop',
    props: {
        xp: Number,
        money: Number,
        inventory: Array,
        weapon: String,
        weaponStore: Object,
    },
    methods: {
        closeWeaponShop() {
            this.$emit('toggleweaponshop', 'close');
        },
        purchaseAmmo(item, price) {
            if(item == 'Ammunition Box') {
                this.$emit('clicked', 'Purchased ' + item + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
                this.$emit('updatebullets', 10);
                this.$emit('updatemoney', -price);
                this.$emit('updatexp', 10);
            }
            else if(item == 'Ammunition Box XL') {
                this.$emit('clicked', 'Purchased ' + item + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
                this.$emit('updatebullets', 100);
                this.$emit('updatemoney', -price);
                this.$emit('updatexp', 25);
            }
            else if(item == 'Ammunition Box XXL') {
                this.$emit('clicked', 'Purchased ' + item + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
                this.$emit('updatebullets', 1000);
                this.$emit('updatemoney', -price);
                this.$emit('updatexp', 50);
            }
        },
        purchaseWeapon(weapon, price) {
            this.$emit('clicked', 'Purchased ' + weapon + ' for $ ' + new Intl.NumberFormat().format(price) + '!');
            this.$emit('updatexp', 100);
            this.$emit('purchaseweapon', weapon, price);
            // this.$emit('toggleweaponshop', 'close');
        },
        equipWeapon(weapon) {
            this.$emit('clicked', 'Changed weapon to ' + weapon + '.');
            this.$emit('equipweapon', weapon);
            // this.$emit('toggleweaponshop', 'close');
        }
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