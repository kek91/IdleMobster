<template>
    <div>

        <div>
            <h2>Shops</h2>

            <button v-on:click="openForum" v-bind:title="'Click to open forum'">
                <i class="fa fa-comment fa-3x"></i><br>
                <small>Chat Cafè</small>
            </button>
            <button v-on:click="openWeaponShop" v-if="xp > xpRankAssociate" v-bind:title="'Click to open the gun shop'">
                <i class="fa fa-store-alt fa-3x"></i><br>
                <small>Vincenzo's Guns</small>
            </button>
            <button v-on:click="openCarShop" v-if="xp > xpRankSoldier" v-bind:title="'Click to open the car shop'">
                <i class="fa fa-store fa-3x"></i><br>
                <small>Luca Auto</small>
            </button>
            <button v-on:click="openMiscShop" v-if="xp > xpRankHitman" v-bind:title="'Click to open shop'">
                <i class="fa fa-warehouse fa-3x"></i><br>
                <small>Tony's Shop</small>
            </button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'GameShops',
    props: {
        xp: Number,
        xpRankLowlife: Number,
        xpRankErrandboy: Number,
        xpRankAssociate: Number,
        xpRankSoldier: Number,
        xpRankHitman: Number,
        xpRankMademan: Number,
        xpRankCapo: Number,
        xpRankUnderboss: Number,
        xpRankConsigliere: Number,
        xpRankBoss: Number,
        xpRankGodfather: Number,
        xpRankCapoditutticapi: Number,
    },
    methods: {
        openForum() {
            this.$emit('toggleforum', 'open');
        },
        openWeaponShop() {
            // this.$modal.show('modalWeaponShop');
            this.$emit('toggleweaponshop', 'open');
        },
        openCarShop() {
            // this.$modal.show('modalCarShop');
            this.$emit('togglecarshop', 'open');
        },
        openMiscShop() {
            // this.$modal.show('modalMiscShop');
            this.$emit('togglemiscshop', 'open');
        },
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
div.modal {
    background:#fff;
    color:#333;
    float:left;
    margin:2px;
    width:95%;
}
div.modal>p {
    background:#fff;
    color:#333;
    font-size:1em;
    text-align: center;
}
div.modal>h1 {
    /* background:#eee; */
    color:#333;
    border-bottom:1px solid #333;
    width:90%;
    text-align:center;
    margin:5px auto;
    font-size:1.4em;
}

.ulweapons {
    list-style: none;
}
.ulweapons img {
    max-width:100px;
    max-height:60px;
    vertical-align: middle;
}
</style>