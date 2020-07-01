# Changelog

## v0.1.8
- Project uploaded to github (firebase config excluded from repo)
- 

## v0.1.7
- Prestige is only unlocked after reaching Capo di tutti capi
- Slightly adjusted some game actions XP requirements
- Game actions becomes easier (higher chance for success) the higher your rank is
- Bribing the police is available from a lower rank but the price is dynamic (connected with your rank)
- Criminal activities gains more heat
- Misc bug fixes and code improvements
- Game actions text has been replaced so it now says what kind of activity it is (instead of just "Ready")

## v0.1.6 - Some online features
- Implemented forum (or Chat Cafè as it's called ingame)
- Implemented cloud save
- Implemented Google Firebase realtime database - stores forum messages and user cloud data
- Added possibility to set email address (when loading a cloud backup it searches for the email address)
- Changed intro/welcome screen
- Hot dog stands are a bit cheaper
- Fixed bug where number of bullets were reset when purchasing a weapon
- Fixed bug where rank Capo di tutti capi weren't highlighted properly like the other ranks (from Hitman and above)

## v0.1.5
- Adjusted the number of bullets you use when doing Kill action
- Unlocking abilities are now a little more consistent with unlocking new ranks
- Added more ranks (Associate, Hitman, Consigliere), bringing the total amount of possible ranks up to 13 if you include the starting rank
- Fixed exploit bug where timers for OC and Kill didn't persist through browser refresh
- Added new special game action (colored orange instead of green when ready): Bribe the police (reduce heat by 80 for $ 100 000)
- Organised crime and Target practice now spend some bullets every time
- Added larger ammunition box to Misc shop
- If you dryfire your gun (no more ammo left) it will be destroyed and you have to buy a new one
- Special messages such as getting a fine from the police and if your weapon is destroyed is now shown in a secondary status-bar so it doesn't accidently get overwritten by other action messages
- Made text on disabled buttons a little lighter to make it easier to read
- Added new property: Hotels (only unlocked after reaching rank Capo and having purchased a Fake Business School Degree)
- Ammunition removed from misc shop and added to weapon shop
- Casinos are only unlocked after reaching rank Made man and having a Stylish Suit
- Slightly improved the chance for a successful OC (bank heist)
- Removed unused items from Misc shop. Everything that remains unlocks a function in the game or gives you some kind of bonus when purchased. More stuff will be implemented later
- Several GUI changes to better accomodate mobile/smaller screens

## v0.1.4
- Backup/Save and Load data function implemented (in addition to autosaving in browser local storage)
- Prestige will keep 90% of your current money (instead of max $ 100 000) and 1 hotdog stand to make the beginning a little faster
- Various UI improvements 
- Timer for actions are now present on the buttons
- Property/business stats are visible on the buttons
- Various bug fixes
- If your heat is over 50 you might get a fine from the police costing you 10% of your current cash. The chance to receive a fine is greatly higher if your heat is over 90. There are no limits for how many fines you can get so you better hurry and reduce your heat ASAP (by resting).
- Kill function uses x bullets (where x is a random number between 0-10)
- Ammunition has been added to the misc shop

## v0.1.3
- Adjusted default income per tick for all properties
- Bundled fontawesome icons so they work while offline
- Fixed bug where Prestige button was not showing
- Redid Shops interface: removed modals. Works better for mobile/smaller screens
- Added more weapons and removed some
- New weapon images (ref credits)
- New items in Misc shop
- Implemented inventory system so you can't buy the same item (car/weapon/misc) twice
- Train Gym is now unlocked by purchasing a gym membership card from the misc shop
- Target practice is only unlocked if you have a gun equipped (and xp > 299)
- Various bug fixes

## v0.1.2
- Adjusted power and prices for weapons and cars
- New table to show total revenue per second and per day for all properties
- Compressed image assets to reduce file size
- Adjusted xp requirements for some ranks
- Removed debug functions
- Added two new actions
 - Train gym (gives XP)
 - Target practice (gives XP)
- Various adjustments to user interface
- Implementeded proper death mechanic: When you die and press restart game you keep some of your money, your prestige level and your name. Everything else resets.
- Added background music (disabled by default)
- Fixed bug where purchased properties were not saved to next play session

## v0.1.1
- Tooltip for missing XP requirement for properties
- Properties also earns XP every second
- Actions and game functions are invisible until gradually unlocked
- Misc bug fixes/improvements

## v0.1.0
- Initial release on itch.io
