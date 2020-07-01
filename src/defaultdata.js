export function loadDefaultData() {
    return {
        name: "",
        email: "",
        xp: 1,
        money: 100,
        health: 100,
        weapon: 'None',
        car: 'None',
        bullets: 0,
        power: 1,
        heat: 0,
        status: 'Idle',
        statustwo: '',
        rank: 'Calculating...',
        rankPrev: 'Stray dog',
        showRankPromotion: false,
        prestige: 0,
        debugMode: false,
        playMusic: false,

        weaponStore: {
            "Ammunition Box": {
                name: 'Ammunition Box',
                description: '10x untracable bullets.',
                power: 0,
                price: 99
            },
            "Ammunition Box XL": {
                name: 'Ammunition Box XL',
                description: '100x untracable bullets.',
                power: 0,
                price: 990
            },
            "Ammunition Box XXL": {
                name: 'Ammunition Box XXL',
                description: '1000x untracable bullets.',
                power: 0,
                price: 9900
            },
            "Knife": {
                name: 'Knife',
                description: 'A knife can do great damage but offers short range.',
                img: './images/weapons/knife_1.png',
                power: 7,
                price: 600
            },
            "Luger": {
                name: 'Luger',
                description: 'Simple pistol',
                img: './images/weapons/luger.png',
                power: 20,
                price: 4500
            },
            "Nagan": {
                name: 'Nagan',
                description: 'Revolver, high damage but low capacity.',
                img: './images/weapons/nagan.png',
                power: 50,
                price: 12000
            },
            "Colt 45": {
                name: 'Colt 45',
                description: 'The trusty Colt will help you in any situation you might end up in.',
                img: './images/weapons/colt_45.png',
                power: 120,
                price: 70000
            },
            "MP40": {
                name: 'MP40',
                description: 'Trusted SMG from the WWII era.',
                img: './images/weapons/mp40.png',
                power: 220,
                price: 125000
            },
            "PPSH": {
                name: 'PPSH',
                description: 'Low damage but high capacity and very fast and effecient.',
                img: './images/weapons/ppsh.png',
                power: 290,
                price: 200000
            },
            "G43": {
                name: 'G43',
                description: 'Single bolt rifle, great for long range assassination',
                img: './images/weapons/G43.png',
                power: 450,
                price: 490000
            },
            "Thompson": {
                name: 'Thompson',
                description: 'The trusty tommy gun is perfect for spraying your enemies full of lead.',
                img: './images/weapons/tompson.png',
                power: 680,
                price: 900000
            },
            "MG42": {
                name: 'MG42',
                description: 'The creme de la creme, this heavy machine gun will annihilate your enemies with ease!',
                img: './images/weapons/mg42.png',
                power: 1200,
                price: 1500000
            },
        },

        carStore: {
            "1930 Buick": {
                name: '1930 Buick',
                description: '1930 Buick',
                img: './images/cars/1930Buick.jpg',
                power: 10,
                price: 4500
            },
            "1932 Ford V8": {
                name: '1932 Ford V8',
                description: '1932 Ford V8',
                img: './images/cars/1932FordV8.jpg',
                power: 50,
                price: 22000
            },
            "1939 Cadillac Series 75": {
                name: '1939 Cadillac Series 75',
                description: '1939 Cadillac Series 75',
                img: './images/cars/1939CadillacSeries75.jpg',
                power: 100,
                price: 95000
            },
            "1937 Jaguar SS 100 Roadster": {
                name: '1937 Jaguar SS 100 Roadster',
                description: '1937 Jaguar SS 100 Roadster',
                img: './images/cars/1937JaguarSS100Roadster.jpg',
                power: 225,
                price: 350000
            },
            "1931 Bugatti Sports Coupe": {
                name: '1931 Bugatti Sports Coupe',
                description: '1931 Bugatti Sports Coupe',
                img: './images/cars/1931BugattiSportsCoupe.jpg',
                power: 500,
                price: 800000
            },
        },

        miscStore: {
            // "Shovel": {
            //     name: 'Shovel',
            //     description: 'Never know when a shovel might come in handy.',
            //     price: 500
            // },
            "Stylish Suit": {
                name: 'Stylish Suit',
                description: 'Stylish mafioso suit, tailored for both lefties and righties, if you know what I mean. Definitely need to look good if you want to establish some fine casinos.',
                price: 3000
            },
            // "Hat": {
            //     name: 'Hat',
            //     description: 'Can\'t be going around in a suit without a hat!',
            //     price: 5000
            // },
            "Mask": {
                name: 'Mask',
                description: 'A mask can be quite useful when doing certain activities... such as robbing a bank.',
                price: 30000
            },
            // "Fake passport": {
            //     name: 'Fake passport',
            //     description: 'Having a fake passport will lower your heat generation when doing criminal activities.',
            //     price: 100000
            // },
            // "Life insurance": {
            //     name: 'Life insurance',
            //     description: 'Having a life insurance will make you regain 80% of your money if you die.',
            //     price: 800000
            // },
            "Bodyguards": {
                name: 'Bodyguards',
                description: 'Bodyguards will follow you around and double your Power.',
                price: 900000
            },
            "Fake Business School Degree": {
                name: 'Fake Business School Degree',
                description: 'Never finished your education? No worries. My friend will fix you a fake degree showing your potential investors how great you are. Who knows, maybe it\'ll open up some business opportunities for you?',
                price: 1500000
            },
            "License to kill": {
                name: 'License to kill',
                description: 'Before you can run around and whack people you need to a License to kill, issued by The Commission itself.',
                price: 10000000
            },
            
        },

        inventory: [],

        isDead: false,
        showWeaponShop: false,
        showCarShop: false,
        showMiscShop: false,
        showForum: false,
        
        pettyCrimeTimer: 0, // ticks remaining (gameLoop)
        heavyCrimeTimer: 0,
        carTheftTimer: 0,
        trainGymTimer: 0,
        targetPracticeTimer: 0,
        ocTimer: 0,
        killTimer: 0,
        bribePoliceTimer: 0,
        resetAllTimersTimer: 0,

        hotdogstands: 0,
        gasstations: 0,
        distilleries: 0,
        casinos: 0,
        hotels: 0,

        priceHotdogstand: 0,
        priceGasstation: 0,
        priceDistillery: 0,
        priceCasino: 0,
        priceHotel: 0,

        defaultPriceHotdogstand: 200,
        defaultPriceGasstation: 3000,
        defaultPriceDistillery: 15000,
        defaultPriceCasino: 100000,
        defaultPriceHotel: 1000000,

        incomePerTickHotdogstand: 0,
        incomePerTickGasstation: 0,
        incomePerTickDistillery: 0,
        incomePerTickCasino: 0,
        incomePerTickHotel: 0,

        defaultIncomePerTickHotdogstand: 1,
        defaultIncomePerTickGasstation: 6,
        defaultIncomePerTickDistillery: 35,
        defaultIncomePerTickCasino: 80,
        defaultIncomePerTickHotel: 600,

        dailyRevenueHotdogstand: 0,
        dailyRevenueGasstation: 0,
        dailyRevenueDistillery: 0,
        dailyRevenueCasino: 0,
        dailyRevenueHotel: 0,

        amountPettyCrimes: 0,
        amountHeavyCrimes: 0,
        amountCarThefts: 0,
        amountOCs: 0,
        amountRests: 0,

        hpRegen: 0.02,
        heatDiminisher: 0.01,

        xpRankStraydog: 0,
        xpRankLowlife: 100,
        xpRankErrandboy: 500,
        xpRankAssociate: 1500,
        xpRankSoldier: 3000,
        xpRankHitman: 10000,
        xpRankMademan: 30000,
        xpRankCapo: 100000,
        xpRankUnderboss: 500000,
        xpRankConsigliere: 1000000,
        xpRankBoss: 3000000,
        xpRankGodfather: 10000000,
        xpRankCapoditutticapi: 100000000,
    }
}