<template>

    <div v-if="name == ''">

        <GameHeader
            v-bind:showHelp="false"
        />
        
        <GameStartNewCharacter
            @savename="saveName"
            @saveemail="saveEmail"
        />

    </div>

    <div v-else-if="isDead">
        <GameHeader
            v-bind:showHelp="false"
        />
        <h1 class="text-warning">
            <i class="fa fa-skull fa-3x"></i>
            <br><br>
            Sleeping with the fishes...
            <br><br>
            Click the Restart button below to keep your current prestige level, some start money and your name.
            <br><br>
            <button v-on:click="restartGame">
                Restart game
            </button>
        </h1>
        
    </div>

    <div v-else-if="showWeaponShop">
        <GameHeader v-bind:showHelp="true"/>
        <GameWeaponShop
            v-bind:xp="xp"
            v-bind:money="money"
            v-bind:inventory="inventory"
            v-bind:weapon="weapon"
            v-bind:weaponStore="weaponStore"
            @clicked="doGameAction"
            @updatexp="updateXP"
            @purchaseweapon="purchaseWeapon"
            @updatebullets="updateBullets"
            @updatemoney="updateMoney"
            @equipweapon="equipWeapon"
            @toggleweaponshop="toggleWeaponShop"
        />
    </div>

    <div v-else-if="showCarShop">
        <GameHeader v-bind:showHelp="true"/>
        <GameCarShop
            v-bind:xp="xp"
            v-bind:money="money"
            v-bind:inventory="inventory"
            v-bind:car="car"
            v-bind:carStore="carStore"
            @clicked="doGameAction"
            @updatexp="updateXP"
            @purchasecar="purchaseCar"
            @equipcar="equipCar"
            @togglecarshop="toggleCarShop"
        />
    </div>

    <div v-else-if="showMiscShop">
        <GameHeader v-bind:showHelp="true"/>
        <GameMiscShop
            v-bind:xp="xp"
            v-bind:money="money"
            v-bind:inventory="inventory"
            v-bind:miscStore="miscStore"
            @clicked="doGameAction"
            @updatexp="updateXP"
            @purchasemisc="purchaseMisc"
            @togglemiscshop="toggleMiscShop"
        />
    </div>

    <div v-else-if="showForum">
        <GameHeader v-bind:showHelp="false"/>
        <GameForum
            v-bind:name="name"
            v-bind:email="email"
            @toggleforum="toggleForum"
        />
    </div>

    <div v-else>
    
        <GameHeader v-bind:showHelp="true"/>

        <div>
            <div>
                <h2 class="h2capitalize">
                    {{ name }}
                </h2>
                <span v-if="prestige > 0" v-bind:title="'Prestige level ' + prestige">
                    <span v-for="n in prestige" v-bind:key="n">
                        <i class="fa fa-star text-legendary"></i>
                    </span>
                </span><br>
                <GameStats gameKey="Rank" v-bind:gameVal="rank"/>
                <GameStats gameKey="XP" v-bind:gameVal="xp"/>
                <GameStats gameKey="Money" v-bind:gameVal="money"/>
                <GameStats gameKey="Health" v-bind:gameVal="health"/>
                <GameStats gameKey="Power" v-bind:gameVal="power"/>
                <GameStats gameKey="Heat" v-bind:gameVal="heat"/>
                <GameStats gameKey="Weapon" v-bind:gameVal="weapon"/>
                <GameStats gameKey="Bullets" v-bind:gameVal="bullets"/>
                <GameStats gameKey="Car" v-bind:gameVal="car"/>
            </div>
        </div>
        <div style="clear:both;"></div><br>

        <GameActions 
            v-bind:xp="xp"
            v-bind:money="money"
            v-bind:power="power"
            v-bind:weapon="weapon"
            v-bind:inventory="inventory"
            v-bind:pettyCrimeTimer="pettyCrimeTimer"
            v-bind:heavyCrimeTimer="heavyCrimeTimer"
            v-bind:carTheftTimer="carTheftTimer"
            v-bind:trainGymTimer="trainGymTimer"
            v-bind:targetPracticeTimer="targetPracticeTimer"
            v-bind:ocTimer="ocTimer"
            v-bind:killTimer="killTimer"
            v-bind:bribePoliceTimer="bribePoliceTimer"
            v-bind:resetAllTimersTimer="resetAllTimersTimer"
            v-bind:xpRankLowlife="xpRankLowlife"
            v-bind:xpRankErrandboy="xpRankErrandboy"
            v-bind:xpRankAssociate="xpRankAssociate"
            v-bind:xpRankSoldier="xpRankSoldier"
            v-bind:xpRankHitman="xpRankHitman"
            v-bind:xpRankMademan="xpRankMademan"
            v-bind:xpRankCapo="xpRankCapo"
            v-bind:xpRankUnderboss="xpRankUnderboss"
            v-bind:xpRankConsigliere="xpRankConsigliere"
            v-bind:xpRankBoss="xpRankBoss"
            v-bind:xpRankGodfather="xpRankGodfather"
            v-bind:xpRankCapoditutticapi="xpRankCapoditutticapi"
            @clicked="doGameAction"
            @updatexp="updateXP"
            @updatemoney="updateMoney"
            @updatehealth="updateHealth"
            @updateheat="updateHeat"
            @updatebullets="updateBullets"
            @updatetimer="updateTimer"
            @reducealltimers="reduceAllTimers"
            @resetalltimers="resetAllTimers"
            @doprestige="doPrestige"
        />

        <div>
            <span class="text-stylized text-large" v-html="status"></span><br>
            <span class="text-stylized text-large" v-html="statustwo"></span><br>
            <p v-if="health < 20" class="text-warning text-stylized text-superlarge healthwarning">
                You ok there buddy?<br>Perhaps you should take some rest, your health is running pretty low.
            </p>
            <p v-if="showRankPromotion" class=" text-stylized text-superlarge text-uncommon rankpromotion">
                <i class="fa fa-star"></i> Rank promotion <i class="fa fa-star"></i><br>
                Congrats, you are now {{ rank }}!
                <button v-on:click="toggleShowRankPromotion">Dismiss</button>
            </p>
        </div>

        <GameShops
            v-if="xp > xpRankLowlife"
            v-bind:xp="xp"
            v-bind:xpRankLowlife="xpRankLowlife"
            v-bind:xpRankErrandboy="xpRankErrandboy"
            v-bind:xpRankAssociate="xpRankAssociate"
            v-bind:xpRankSoldier="xpRankSoldier"
            v-bind:xpRankHitman="xpRankHitman"
            v-bind:xpRankMademan="xpRankMademan"
            v-bind:xpRankCapo="xpRankCapo"
            v-bind:xpRankUnderboss="xpRankUnderboss"
            v-bind:xpRankConsigliere="xpRankConsigliere"
            v-bind:xpRankBoss="xpRankBoss"
            v-bind:xpRankGodfather="xpRankGodfather"
            v-bind:xpRankCapoditutticapi="xpRankCapoditutticapi"
            @clicked="doGameAction"
            @toggleforum="toggleForum"
            @toggleweaponshop="toggleWeaponShop"
            @togglecarshop="toggleCarShop"
            @togglemiscshop="toggleMiscShop"
        />

        <GameProperties
            v-if="xp > xpRankErrandboy || hotdogstands > 0 || gasstations > 0 || distilleries > 0 || casinos > 0 || hotels > 0"
            v-bind:xp="xp"
            v-bind:money="money"
            v-bind:inventory="inventory"
            v-bind:xpRankLowlife="xpRankLowlife"
            v-bind:xpRankErrandboy="xpRankErrandboy"
            v-bind:xpRankAssociate="xpRankAssociate"
            v-bind:xpRankSoldier="xpRankSoldier"
            v-bind:xpRankHitman="xpRankHitman"
            v-bind:xpRankMademan="xpRankMademan"
            v-bind:xpRankCapo="xpRankCapo"
            v-bind:xpRankUnderboss="xpRankUnderboss"
            v-bind:xpRankConsigliere="xpRankConsigliere"
            v-bind:xpRankBoss="xpRankBoss"
            v-bind:xpRankGodfather="xpRankGodfather"
            v-bind:xpRankCapoditutticapi="xpRankCapoditutticapi"
            v-bind:priceHotdogstand="priceHotdogstand"
            v-bind:priceGasstation="priceGasstation"
            v-bind:priceDistillery="priceDistillery"
            v-bind:priceCasino="priceCasino"
            v-bind:priceHotel="priceHotel"
            v-bind:hotdogstands="hotdogstands"
            v-bind:gasstations="gasstations"
            v-bind:distilleries="distilleries"
            v-bind:casinos="casinos"
            v-bind:hotels="hotels"
            v-bind:incomePerTickHotdogstand="incomePerTickHotdogstand"
            v-bind:dailyRevenueHotdogstand="dailyRevenueHotdogstand"
            v-bind:incomePerTickGasstation="incomePerTickGasstation"
            v-bind:dailyRevenueGasstation="dailyRevenueGasstation"
            v-bind:incomePerTickDistillery="incomePerTickDistillery"
            v-bind:dailyRevenueDistillery="dailyRevenueDistillery"
            v-bind:incomePerTickCasino="incomePerTickCasino"
            v-bind:dailyRevenueCasino="dailyRevenueCasino"
            v-bind:incomePerTickHotel="incomePerTickHotel"
            v-bind:dailyRevenueHotel="dailyRevenueHotel"

            @clicked="doGameAction"
            @updateproperties="updateProperties"
            @updatexp="updateXP"
        />

        <div v-if="hotdogstands > 0 || gasstations > 0 || distilleries > 0 || casinos > 0 || hotels > 0" style="float:left;">
            <GameStats gameKey="Revenue/sec" v-bind:gameVal="(incomePerTickHotdogstand*4)+(incomePerTickGasstation*4)+(incomePerTickDistillery*4)+(incomePerTickCasino*4)+(incomePerTickHotel*4)"/>
            <GameStats gameKey="Revenue/day" v-bind:gameVal="(dailyRevenueHotdogstand+dailyRevenueGasstation+dailyRevenueDistillery+dailyRevenueCasino+dailyRevenueHotel)"/>
        </div>
        <div style="clear:both;"></div><br>


        <GameDebugFunctions v-if="debugMode"
            @debugaddmoney="debugAddmoney"
            @debugaddxp="debugAddxp"
            @debugaddhealth="debugAddhealth"
        />

        <GameSettings
            v-bind:xp="xp"
            v-bind:name="name"
            v-bind:email="email"
            v-bind:rank="rank"
            v-bind:prestige="prestige"
            @clicked="doGameAction"
            @loaddata="loadData"
            @resetprogress="resetProgress"
            @togglemusic="toggleMusic"
            @savename="saveName"
            @saveemail="saveEmail"
        />

        <GameBackgroundMusic v-if="playMusic"/>

        <br><br><br><br><br><br><br><br>

    </div>

</template>




<script>
import GameHeader from './components/GameHeader.vue'
import GameActions from './components/GameActions.vue'
import GameShops from './components/GameShops.vue'
import GameWeaponShop from './components/GameWeaponShop.vue'
import GameCarShop from './components/GameCarShop.vue'
import GameMiscShop from './components/GameMiscShop.vue'
import GameProperties from './components/GameProperties.vue'
import GameStats from './components/GameStats.vue'
import GameDebugFunctions from './components/GameDebugFunctions.vue'
import GameStartNewCharacter from './components/GameStartNewCharacter.vue'
import GameSettings from './components/GameSettings.vue'
import GameBackgroundMusic from './components/GameBackgroundMusic.vue'
import GameForum from './components/GameForum.vue'
import { loadDefaultData } from './defaultdata.js'

export default {
    name: 'App',
    components: {
        GameHeader,
        GameActions,
        GameShops,
        GameWeaponShop,
        GameCarShop,
        GameMiscShop,
        GameProperties,
        GameStats,
        GameDebugFunctions,
        GameStartNewCharacter,
        GameSettings,
        GameBackgroundMusic,
        GameForum,
    },
    data: function() {
        return loadDefaultData();
    },
    methods: {
        random: function(min,max) {
            return parseInt(Math.floor(Math.random()*(max-min+1)+min));
        },
        doGameAction(value) {
            let dateObj = new Date();
            let dateString = dateObj.getHours()+':'+ (dateObj.getMinutes().toString().length < 2 ? '0'+dateObj.getMinutes() : dateObj.getMinutes())+':'+ (dateObj.getSeconds().toString().length < 2 ? '0'+dateObj.getSeconds() : dateObj.getSeconds());
            this.status = dateString + ' &raquo; ' + value;
        },
        doSecondaryGameAction(value) {
            let dateObj = new Date();
            let dateString = dateObj.getHours()+':'+ (dateObj.getMinutes().toString().length < 2 ? '0'+dateObj.getMinutes() : dateObj.getMinutes())+':'+ (dateObj.getSeconds().toString().length < 2 ? '0'+dateObj.getSeconds() : dateObj.getSeconds());
            this.statustwo = dateString + ' &raquo; ' + value;
            setTimeout(() => {
                this.statustwo = '';
            }, 10000);
        },
        updateXP(value) {
            this.xp = this.xp+value;
        },
        updateMoney(value) {
            this.money = this.money+value;
        },
        updateHealth(value) {
            this.health = Math.min(100,this.health+value);
        },
        updateHeat(value) {
            this.heat = Math.max(0,this.heat+value);
        },
        updateBullets(value) {
            this.bullets = parseInt(this.bullets+value);
        },
        updateTimer(activity, value) {
            this[activity] = value;
        },
        reduceAllTimers(value) {
            if(value === 1) {
                this.pettyCrimeTimer = Math.max(0,this.pettyCrimeTimer-4);
                this.heavyCrimeTimer = Math.max(0,this.heavyCrimeTimer-4);
                this.carTheftTimer = Math.max(0,this.carTheftTimer-4);
                this.trainGymTimer = Math.max(0,this.trainGymTimer-4);
                this.targetPracticeTimer = Math.max(0,this.targetPracticeTimer-4);
                this.ocTimer = Math.max(0,this.ocTimer-4);
                this.killTimer = Math.max(0,this.killTimer-4);
                this.bribePoliceTimer = Math.max(0,this.bribePoliceTimer-4);
            }
        },
        resetAllTimers(value) {
            if(value === 1) {
                this.pettyCrimeTimer = 0;
                this.heavyCrimeTimer = 0;
                this.carTheftTimer = 0;
                this.trainGymTimer = 0;
                this.targetPracticeTimer = 0;
                this.ocTimer = 0;
                this.killTimer = 0;
                this.bribePoliceTimer = 0;
            }
        },
        updateProperties(property,amount) {
            if(property == 'hotdogstand') {
                this.hotdogstands += parseInt(amount);
                this.updateMoney(-this.priceHotdogstand);
            }
            if(property == 'gasstation') {
                this.gasstations += parseInt(amount);
                this.updateMoney(-this.priceGasstation);
            }
            if(property == 'distillery') {
                this.distilleries += parseInt(amount);
                this.updateMoney(-this.priceDistillery);
            }
            if(property == 'casino') {
                this.casinos += parseInt(amount);
                this.updateMoney(-this.priceCasino);
            }
            if(property == 'hotel') {
                this.hotels += parseInt(amount);
                this.updateMoney(-this.priceHotel);
            }
        },
        saveName(value) {
            this.name = value;
        },
        saveEmail(value) {
            this.email = value;
        },

        toggleWeaponShop(value) {
            if(value == "open") {
                this.showWeaponShop = true;
            }
            else {
                this.showWeaponShop = false;
            } 
        },
        toggleCarShop(value) {
            if(value == "open") {
                this.showCarShop = true;
            }
            else {
                this.showCarShop = false;
            }
        },
        toggleMiscShop(value) {
            if(value == "open") {
                this.showMiscShop = true;
            }
            else {
                this.showMiscShop = false;
            }
        },
        toggleForum(value) {
            if(value == "open") {
                this.showForum = true;
            }
            else {
                this.showForum = false;
            }
        },

        purchaseWeapon(weapon,price) {
            this.weapon = weapon;
            this.inventory.push(weapon);
            if(weapon != 'Knife') {
                this.updateBullets(30);
            }
            this.updateMoney(-price);
        },
        purchaseCar(car,price) {
            this.car = car;
            this.inventory.push(car);
            this.updateMoney(-price);
        },
        purchaseMisc(item,price) {
            this.inventory.push(item);
            this.updateMoney(-price);
        },

        equipWeapon(weapon) {
            this.weapon = weapon;
        },

        equipCar(car) {
            this.car = car;
        },

        debugAddmoney(value) {
            this.money = this.money+value;
        },
        debugAddxp(value) {
            this.xp = this.xp+value;
        },
        debugAddhealth(value) {
            this.health = Math.min(100, this.health+value);
        },
        debugResurrect(value) {
            if(value === 1) {
                this.health = 100;
                this.isDead = false;
            }
        },
        doPrestige(value) {
            if(value === 1) {
                // Delete everything except name, existing prestige bonus, 90% money and 1 hotdog stand
                let prestigelvl = parseInt(this.prestige + 1);
                let nickname = this.name;
                let emailaddr = this.email;
                let keepmoney = parseInt(this.money*0.9);
                this.resetProgress(1);
                this.prestige = prestigelvl;
                this.name = nickname;
                this.email = emailaddr;
                this.money = Math.max(100, keepmoney);
                this.hotdogstands = 1;
                // localStorage.setItem('prestige', this.prestige);
                // localStorage.setItem('name', this.name);
                // localStorage.setItem('money', this.money);
                // localStorage.setItem('hotdogstands', this.hotdogstands);
                this.doGameAction('Congrats! You have prestiged to level '+prestigelvl+'!');
            }
        },
        restartGame() {
            /* Restart game if player dies, but keep some money, the name and prestige lvl */
            // if(this.lifeinsurance)
            let prestigelvl = parseInt(this.prestige);
            let nickname = this.name;
            let emailaddr = this.email;
            let keepmoney = Math.min(100000, this.money);
            this.resetProgress(1);
            this.prestige = prestigelvl;
            this.name = nickname;
            this.email = emailaddr;
            this.money = Math.max(100, keepmoney);
            // localStorage.setItem('prestige', this.prestige);
            // localStorage.setItem('name', this.name);
            // localStorage.setItem('money', this.money);
            this.doGameAction('Welcome back, ' + nickname + '. Try to stay alive this time!');
        },
        resetProgress(value) {
            if(value === 1) {
                Object.assign(this.$data, loadDefaultData());
                localStorage.clear();
            }
        },

        loadData(data) {
            if(data === "sexyii") {
                this.name = "Vito";
                this.xp = 2000000;
                this.money = 20000000;
                this.health = 100;
                this.weapon = "MG42";
                this.car = "1931 Bugatti Sports Coupe";
                this.inventory = ['MG42', '1931 Bugatti Sports Coupe', 'Stylish Suit', 'Mask'];
                this.bullets = 100;
                this.prestige = 3;
                this.hotdogstands = 70;
                this.gasstations = 55;
                this.distilleries = 30;
                this.casinos = 25;
                this.hotels = 0;
                this.doGameAction('<span class="text-superlarge text-legendary">Hei på deg lekkerbisken. Velkommen tilbake <3 :-)</span>');
            }
            else {
                try {
                    let jsondata = JSON.parse(atob(data));
                    this.name = jsondata.name;
                    this.xp = parseInt(jsondata.xp);
                    this.money = parseInt(jsondata.money);
                    this.health = parseInt(jsondata.health);
                    this.weapon = jsondata.weapon;
                    this.car = jsondata.car;
                    this.inventory = JSON.parse(jsondata.inventory);
                    this.bullets = parseInt(jsondata.bullets);
                    this.prestige = parseInt(jsondata.prestige);
                    this.hotdogstands = parseInt(jsondata.hotdogstands);
                    this.gasstations = parseInt(jsondata.gasstations);
                    this.distilleries = parseInt(jsondata.distilleries);
                    this.casinos = parseInt(jsondata.casinos);
                    this.hotels = parseInt(jsondata.hotels);
                    this.doGameAction('Successfully loaded save data.');
                } catch (error) {
                    this.doGameAction('Unable to load saved data - could not parse data string. Please try again.');
                }
            }
        },

        toggleMusic() {
            this.playMusic = this.playMusic === true ? false : true;
        },

        toggleShowRankPromotion() {
            this.showRankPromotion = false;
        },

        calcRank() {
            if(this.xp > this.xpRankCapoditutticapi) { this.rank = "Capo di tutti capi"; }
            else if(this.xp > this.xpRankGodfather) { this.rank = "Godfather"; }
            else if(this.xp > this.xpRankBoss) { this.rank = "Boss"; }
            else if(this.xp > this.xpRankConsigliere) { this.rank = "Consigliere"; }
            else if(this.xp > this.xpRankUnderboss) { this.rank = "Underboss"; }
            else if(this.xp > this.xpRankCapo) { this.rank = "Capo"; }
            else if(this.xp > this.xpRankMademan) { this.rank = "Made man"; }
            else if(this.xp > this.xpRankHitman) { this.rank = "Hitman"; }
            else if(this.xp > this.xpRankSoldier) { this.rank = "Soldier"; }
            else if(this.xp > this.xpRankAssociate) { this.rank = "Associate"; }
            else if(this.xp > this.xpRankErrandboy) { this.rank = "Errand boy"; }
            else if(this.xp > this.xpRankLowlife) { this.rank = "Low life"; }
            else if(this.xp > this.xpRankStraydog) { this.rank = "Stray dog"; }
            if(this.rank != this.rankPrev && this.rankPrev != 'Stray dog') {
                this.showRankPromotion = true;
            }
            this.rankPrev = this.rank;
            
        },

        calcPrices() {
            this.priceHotdogstand = parseInt(this.defaultPriceHotdogstand + (this.hotdogstands*this.defaultPriceHotdogstand*0.3));
            this.priceGasstation = parseInt(this.defaultPriceGasstation + (this.gasstations*this.defaultPriceGasstation*0.3));
            this.priceDistillery = parseInt(this.defaultPriceDistillery + (this.distilleries*this.defaultPriceDistillery*0.3));
            this.priceCasino = parseInt(this.defaultPriceCasino + (this.casinos*this.defaultPriceCasino*0.3));
            this.priceHotel = parseInt(this.defaultPriceHotel + (this.hotels*this.defaultPriceHotel*0.3));
            // this.priceGasstation = parseInt(this.defaultPriceGasstation * ( (this.gasstations+1) * 1.3) );
            // this.priceDistillery = parseInt(this.defaultPriceDistillery * ( (this.distilleries+1) * 1.3) );
            // this.priceCasino = parseInt(this.defaultPriceCasino * ( (this.casinos+1) * 1.3) );
            // this.priceHotel = parseInt(this.defaultPriceHotel * ( (this.hotels+1) * 1.3) );
        },

        adjustTimers() {
            if(this.pettyCrimeTimer > 0) {
                this.pettyCrimeTimer -= 1;
            }
            if(this.heavyCrimeTimer > 0) {
                this.heavyCrimeTimer -= 1;
            }
            if(this.carTheftTimer > 0) {
                this.carTheftTimer -= 1;
            }
            if(this.trainGymTimer > 0) {
                this.trainGymTimer -= 1;
            }
            if(this.targetPracticeTimer > 0) {
                this.targetPracticeTimer -= 1;
            }
            if(this.ocTimer > 0) {
                this.ocTimer -= 1;
            }
            if(this.killTimer > 0) {
                this.killTimer -= 1;
            }
            if(this.bribePoliceTimer > 0) {
                this.bribePoliceTimer -= 1;
            }
            if(this.resetAllTimersTimer > 0) {
                this.resetAllTimersTimer -= 1;
            }
        },

        calcPower() {
            let currentpower = (this.xp*0.002);
            if(this.weapon != 'None') { 
                if(this.weaponStore[this.weapon]) {
                    currentpower += this.weaponStore[this.weapon].power;
                }
            }
            if(this.car != 'None') { 
                if(this.carStore[this.car]) {
                    currentpower += this.carStore[this.car].power;
                } 
            }
            if(this.inventory.includes('Bodyguards')) { currentpower = currentpower * 2; }
            if(this.prestige > 0) { currentpower = currentpower * this.prestige * 2; }
            this.power = parseInt(Math.max(1,currentpower));
        },

        propertiesIncome() {
            this.incomePerTickHotdogstand = parseInt(this.defaultIncomePerTickHotdogstand * this.hotdogstands * 2);
            this.incomePerTickGasstation = parseInt(this.defaultIncomePerTickGasstation * this.gasstations * 2);
            this.incomePerTickDistillery = parseInt(this.defaultIncomePerTickDistillery * this.distilleries * 2);
            this.incomePerTickCasino = parseInt(this.defaultIncomePerTickCasino * this.casinos * 2);
            this.incomePerTickHotel = parseInt(this.defaultIncomePerTickHotel * this.hotels * 2);

            if(this.prestige > 0) {
                this.incomePerTickHotdogstand = this.incomePerTickHotdogstand * this.prestige * 2;
                this.incomePerTickGasstation = this.incomePerTickGasstation * this.prestige * 2;
                this.incomePerTickDistillery = this.incomePerTickDistillery * this.prestige * 2;
                this.incomePerTickCasino = this.incomePerTickCasino * this.prestige * 2;
                this.incomePerTickHotel = this.incomePerTickHotel * this.prestige * 2;
            }

            this.dailyRevenueHotdogstand = this.incomePerTickHotdogstand*4*60*60*24;
            this.dailyRevenueGasstation = this.incomePerTickGasstation*4*60*60*24;
            this.dailyRevenueDistillery = this.incomePerTickDistillery*4*60*60*24;
            this.dailyRevenueCasino = this.incomePerTickCasino*4*60*60*24;
            this.dailyRevenueHotel = this.incomePerTickHotel*4*60*60*24;

            this.updateMoney(this.incomePerTickHotdogstand);
            this.updateMoney(this.incomePerTickGasstation);
            this.updateMoney(this.incomePerTickDistillery);
            this.updateMoney(this.incomePerTickCasino);
            this.updateMoney(this.incomePerTickHotel);

            this.updateXP(
                (this.incomePerTickHotdogstand*0.01)+
                (this.incomePerTickGasstation*0.01)+
                (this.incomePerTickDistillery*0.01)+
                (this.incomePerTickCasino*0.01)+
                (this.incomePerTickHotel*0.01)
            );
        },

        checkForPoliceFines() {
            if(this.heat > 90) {
                let dice = this.random(0,10);
                if(dice === 1) {
                    let fine = this.money*0.1;
                    this.updateMoney(-fine);
                    this.updateHeat(-10);
                    this.doSecondaryGameAction('<span class="text-danger">You\'ve been fined by the police and had to pay $ '+fine.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.');
                }
            }
            else if(this.heat > 50) {
                let dice = this.random(0,30);
                if(dice === 1) {
                    let fine = this.money*0.1;
                    this.updateMoney(-fine);
                    this.updateHeat(-10);
                    this.doSecondaryGameAction('<span class="text-danger">You\'ve been fined by the police and had to pay $ '+fine.toLocaleString('US', {minimumFractionDigits: 0, maximumFractionDigits: 0})+'.');
                }
            }
        },

        checkForBullets() {
            if(this.bullets < 0) {
                this.doSecondaryGameAction('<span class="text-danger">You spent all your bullets and tried to dryfire your gun. Unfortunately it broke so you\'ll have to buy a new one. Remember to watch your bullets!</span>');
                let weaponInventoryIndex = this.inventory.indexOf(this.weapon);
                this.$delete(this.inventory, weaponInventoryIndex);
                this.weapon = 'None';
                this.bullets = 0;
            }
        },

        gameLoop() {
            setInterval(() => {  
                
                if(this.debugMode) {
                    // this.xp += 1;
                }

                if(this.health < 1) {
                    this.isDead = true;
                }
                else {
                    this.calcRank();
                    this.calcPrices();
                    this.adjustTimers();
                    this.calcPower();
                    this.propertiesIncome();
                    this.updateHealth(this.hpRegen);
                    this.updateHeat(-this.heatDiminisher);
                    this.checkForPoliceFines();
                    this.checkForBullets();
                }

            }, 250);

        },

    },

    mounted() {
        
        this.gameLoop();

        if(localStorage.name) { this.name = localStorage.name; }
        if(localStorage.email) { this.email = localStorage.email; }
        if(localStorage.xp) { this.xp = parseInt(localStorage.xp); }
        if(localStorage.money) { this.money = parseInt(localStorage.money); }
        if(localStorage.health) { this.health = parseInt(localStorage.health); }
        if(localStorage.bullets) { this.bullets = parseInt(localStorage.bullets); }
        if(localStorage.heat) { this.heat = parseInt(localStorage.heat); }
        if(localStorage.power) { this.power = parseInt(localStorage.power); }
        if(localStorage.weapon) { this.weapon = localStorage.weapon; }
        if(localStorage.car) { this.car = localStorage.car; }
        if(localStorage.prestige) { this.prestige = parseInt(localStorage.prestige); }
        if(localStorage.inventory) { this.inventory = JSON.parse(localStorage.inventory); }
        
        if(localStorage.pettyCrimeTimer) { this.pettyCrimeTimer = parseInt(localStorage.pettyCrimeTimer); }
        if(localStorage.heavyCrimeTimer) { this.heavyCrimeTimer = parseInt(localStorage.heavyCrimeTimer); }
        if(localStorage.carTheftTimer) { this.carTheftTimer = parseInt(localStorage.carTheftTimer); }
        if(localStorage.trainGymTimer) { this.trainGymTimer = parseInt(localStorage.trainGymTimer); }
        if(localStorage.targetPracticeTimer) { this.targetPracticeTimer = parseInt(localStorage.targetPracticeTimer); }
        if(localStorage.ocTimer) { this.ocTimer = parseInt(localStorage.ocTimer); }
        if(localStorage.killTimer) { this.killTimer = parseInt(localStorage.killTimer); }
        if(localStorage.bribePoliceTimer) { this.bribePoliceTimer = parseInt(localStorage.bribePoliceTimer); }
        if(localStorage.resetAllTimersTimer) { this.resetAllTimersTimer = parseInt(localStorage.resetAllTimersTimer); }
        
        if(localStorage.hotdogstands) { this.hotdogstands = parseInt(localStorage.hotdogstands); }
        if(localStorage.gasstations) { this.gasstations = parseInt(localStorage.gasstations); }
        if(localStorage.distilleries) { this.distilleries = parseInt(localStorage.distilleries); }
        if(localStorage.casinos) { this.casinos = parseInt(localStorage.casinos); }
        if(localStorage.hotels) { this.hotels = parseInt(localStorage.hotels); }
    },

    watch: {
        name(newval) { localStorage.name = newval; },
        email(newval) { localStorage.email = newval; },
        xp(newval) { localStorage.xp = parseInt(newval); },
        money(newval) { localStorage.money = parseInt(newval); },
        health(newval) { localStorage.health = parseInt(newval); },
        bullets(newval) { localStorage.bullets = parseInt(newval); },
        heat(newval) { localStorage.heat = parseInt(newval); },
        power(newval) { localStorage.power = parseInt(newval); },
        weapon(newval) { localStorage.weapon = newval; },
        car(newval) { localStorage.car = newval; },
        prestige(newval) { localStorage.prestige = newval; },
        inventory(newval) { localStorage.inventory = JSON.stringify(newval); },

        pettyCrimeTimer(newval) { localStorage.pettyCrimeTimer = parseInt(newval); },
        heavyCrimeTimer(newval) { localStorage.heavyCrimeTimer = parseInt(newval); },
        carTheftTimer(newval) { localStorage.carTheftTimer = parseInt(newval); },
        trainGymTimer(newval) { localStorage.trainGymTimer = parseInt(newval); },
        targetPracticeTimer(newval) { localStorage.targetPracticeTimer = parseInt(newval); },
        ocTimer(newval) { localStorage.ocTimer = parseInt(newval); },
        killTimer(newval) { localStorage.killTimer = parseInt(newval); },
        bribePoliceTimer(newval) { localStorage.bribePoliceTimer = parseInt(newval); },
        resetAllTimersTimer(newval) { localStorage.resetAllTimersTimer = parseInt(newval); },

        hotdogstands(newval) { localStorage.hotdogstands = parseInt(newval); },
        gasstations(newval) { localStorage.gasstations = parseInt(newval); },
        distilleries(newval) { localStorage.distilleries = parseInt(newval); },
        casinos(newval) { localStorage.casinos = parseInt(newval); },
        hotels(newval) { localStorage.hotels = parseInt(newval); },
    }
}
</script>






<style>
body,html {
  background:#333;
  color:#eee;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
    color:#eee;
}
a:hover {
    color:#fff;
}
body {
    font-size:0.8em;
}
div {
    margin-top: 10px;
}
h2 {
    font-size:1.2em;
    margin:0px;
    padding:0px;
}
</style>

<style scoped>
h1 {
    text-align:center;
}
.statusEvents {
    width:100%; 
    border:1px solid #ccc;
}
.h2capitalize {
    text-transform: capitalize;
    /* font-size:2em; */
}
.rankpromotion {
    position:fixed;
    top:20px;
    left:10px;
    width:90%;
    text-align:center;
    background:rgba(0,0,0,0.8);
    border-radius:30px;
    border:2px dashed yellowgreen;
    padding:100px 10px;
    color:yellowgreen;
}
.healthwarning {
    position:fixed;
    top:5px;
    left:5px;
    width:90%;
    text-align:center;
    background:rgba(0,0,0,0.8);
    border-radius:10px;
    border:2px dashed orange;
    padding:10px 10px;
    color:orange;
}
</style>