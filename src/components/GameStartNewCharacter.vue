<template>
    
    <div>

        <p>Welcome to Idle Mobster!<br><br>
        Please choose a name for your mobster.<br><br>
        <small>Email address is optional, but strongly encouraged if you want to participate in the forums and have your savegame synced to the cloud.</small></p>
        
        <br><br>

        <input type="text" id="inputName" placeholder="Vito Corleone" class="inputcapitalize">

        <br><br>

        <input type="text" id="inputEmail" placeholder="johndoe@example.com">

        <br><br>

        <button v-on:click="saveNameAndEmail">
            <i class="fa fa-user-secret fa-3x"></i><br>
            <small>Enter game</small>
        </button>

        <div id="statusCharacterName"></div>

    </div>

</template>

<script>
export default {
    name: 'GameStartNewCharacter',
    methods: {
        saveNameAndEmail: function() {
            let characterName = document.getElementById('inputName').value;
            let characterEmail = document.getElementById('inputEmail').value;
            if(characterName.length > 2 && characterName.length < 21) {
                this.$emit('savename', characterName);   
                this.$emit('saveemail', characterEmail);
            }
            else {
                document.getElementById('statusCharacterName').innerText = 'Name must be between 3-20 characters.';
            }
        }
    }
}
</script>

<style scoped>
div {
    text-align:center;
    font-size:1em;
    max-width:500px;
    margin:20px auto;
}
div p {
    font-size:1.4em;
}
div p small {
    font-size:0.8em;
}
input {
    width:300px;
    padding:10px;
}
input.inputcapitalize {
    text-transform: capitalize;
}
button {
    width:320px;
    padding:10px;
    color:yellowgreen;
}
</style>

<style>
input {
    background:#444;
    border:1px solid #000;
    color:#ccc;
    font-size:1.2em;
}
input:hover {
    background:#555;
    color:#eee;
}
</style>
