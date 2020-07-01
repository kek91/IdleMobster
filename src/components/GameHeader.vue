<template>
    <div>
        <h1>
            <!-- <img src="../assets/logo.png"> --> 
            <i class="fa fa-user-secret"></i>
            Idle Mobster
        </h1>
        <h2>
            v{{ version }} &nbsp; &nbsp; &nbsp; 
        </h2>
        <p v-if="showHelp">
            <a href="#" v-on:click="showGameInstructionsModal">Game instructions</a>
        </p>

        <modal name="modalGameInstructions" width="95%" height="80%">
             <!-- width="80%" height="auto" -->
            
            <div class="modal">
                <h1>Goal</h1>
                <p>
                    The goal of the game is to rise through the ranks of the mafia underground
                    and ultimately become the <span class="text-stylized text-legendary">Capo di tutti capi</span>.<br><br>
                
                    In order to achieve that you must commit to the mafioso lifestyle
                    by doing an excessive amount of criminal activities.<br><br>
                
                    Once you start to make some dough, you should invest in some properties. 
                    These will net you passive income meaning you don't have to waste your 
                    time doing silly criminal activites for errand boys.<br><br>
                
                    Be careful though! 
                    If you die, you will lose your inventory and all properties.<br><br>
                
                    Do you have what it takes to become the next Capo di tutti capi, 
                    or will you give up as a Made man?
                </p>
            </div>

            <div class="modal">
                <h1>Actions</h1>
                <p>
                    <b>Petty crime</b><br>
                    Low risk, low reward. Gains XP and money. May lose health and gain some heat from the police.<br><br>
                
                    <b>Heavy crime</b><br>
                    Gains more XP and more money, with the risk of higher health loss and more heat.<br><br>
                
                    <b>Car theft</b><br>
                    Gain XP and a small chance for a car. Even higher chance of health loss and more heat.<br><br>
                
                    <b>OC (Organised Crime)</b><br>
                    High risk but also very high money reward. 
                    Requires a team of 4 specialists and the best equipment money can buy.<br><br>
                
                    <b>Rest</b><br>
                    Lowers your heat and increase your health.<br><br>

                    ++ (TBA)
                </p>
            </div>
            
            <div class="modal">
                <h1>Ranks</h1>
                <p>
                    Stray dog<br>
                    Low life<br>
                    Errand boy<br>
                    Associate<br>
                    Soldier<br>
                    <span class="text-stylized text-uncommon">Hitman</span><br>
                    <span class="text-stylized text-uncommon">Made man</span><br>
                    <span class="text-stylized text-uncommon">Capo</span><br>
                    <span class="text-stylized text-rare">Underboss</span><br>
                    <span class="text-stylized text-rare">Consigliere</span><br>
                    <span class="text-stylized text-rare">Boss</span><br>
                    <span class="text-stylized text-epic">Godfather</span><br>
                    <span class="text-stylized text-legendary">Capo di tutti capi</span><br>
                </p><br>
            </div>
            
            <div class="modal">
                <h1>Properties</h1>
                <p>
                    <b>Hot dog stand</b><br>
                    Generates low passive income.<br><br>
                
                    <b>Gas station</b><br>
                    Generates enough money to pay your bills but nothing too crazy.<br><br>
                    
                    <b>Casino</b><br>
                    Generates a shitload of cash. Requires a special item from Tony's Shop to be unlocked.<br><br>
                    
                    <b>Hotel</b><br>
                    Generates an even more shitload of cash. Requires a special item from Tony's Shop to be unlocked.<br><br>
                </p>
            </div>

            <div style="clear:both;"></div>

            <p class="text-credits">
                Made by Kim Eirik Kvassheim<br>
                Source code: <a href="https://github.com/kek91/IdleMobster">github.com/kek91/IdleMobster</a><br>
                Icons: FontAwesome<br>
                <i class="fa fa-user-secret fa-3x"></i>
            </p>

        </modal>

        

       



    </div>
</template>

<script>
import { version } from '../../package.json'

export default {
    name: 'GameHeader',

    props: {
        showHelp: Boolean,
    },
    
    data: function() {
        return {
            version: version
        }
    },
    
    methods: {
        showInstructions() {
            alert("\
            \n\n\
            Game instructions\n\n\
            Help\n\n\
            ");
        },
        showGameInstructionsModal() {
            this.$modal.show('modalGameInstructions');
        }
    }
    // props: {
    //     version: String
    // }
}




</script>

<style scoped>
div {
  margin: 5px auto 0px auto;
  width:300px;
  color:#eee;
}
div.modal {
    background:#fff;
    color:#333;
    float:left;
    margin:0;
    width:33%;
}
div.modal>p {
    background:#fff;
    color:#333;
    font-size:1em;
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
h1, h2, p {
  text-align:center;
  margin:0;
}
h2, p {
  font-size:0.9em;
}
div > h1 > img {
  vertical-align: middle;
  height:40px;
}
.text-credits {
    color:#333;
    font-size:1.2em;
}
.text-credits a {
    color:#000;
}
</style>