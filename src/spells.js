const spells = {
    spiritShell: {
        name: "Sprit Shell + Mindbender",
        cast: 0,
        // todo: calculate haste
        global: 1.3,
        cooldown: 60,
        active: 11,
        class: "Priest"
    },
    radiance: {
        name: "Radiance",
        cast: 1.7,
        global: 1.3,
        cooldown: 20,
        atonement: 9,
        class: "Priest"
    },
    doubleRadiance: {
        name: "Double Radiance",
        cast: 1.7 * 2,
        cooldown: 40,
        atonement: 9,
        class: "Priest"
    },
    manualAtonement: {
        name: "Atonement",
        cast: 1.3,
        cooldown: 0,
        atonement: 15,
        class: "Priest"
    },
    schism: {
        name: "Schism",
        cast: 1.3,
        cooldown: 24,
        active: 9,
        class: "Priest"
    },
    kyrian: {
        name: "Kyrian",
        cast: 1.3,
        cooldown: 180,
        active: 10,
        class: "Priest"
    },
    barrier: {
        name: "Barrier",
        cast: 0,
        global: 1.3,
        cooldown: 180,
        active: 10,
        class: "Priest"
    },
    hand1: {
        name: "Hand 1",
        cast: 6,
        time: 28,
        class: "Sire"
    },
    ravage1: {
        name: "Ravage 1",
        cast: 6,
        time: 53,
        class: "Sire"
    },
    massacre1: {
        name: "Massacre 1",
        cast: 0,
        time: 90,
        class: "Sire"
    },
    hand2: {
        name: "Hand 2",
        cast: 6,
        time: 118,
        class: "Sire"
    },
    ravage2: {
        name: "Ravage 2",
        cast: 6,
        time: 133,
        class: "Sire"
    },
    hand3: {
        name: "Hand 3",
        cast: 6,
        time: 150,
        class: "Sire"
    },
    seed1: {
        name: "Seed 1",
        cast: 0,
        time: 18,
        class: "Sire"
    },
    seed2: {
        name: "Seed 2",
        cast: 0,
        time: 66,
        class: "Sire"
    },
    seed3: {
        name: "Seed 3",
        cast: 0,
        time: 72,
        class: "Sire"
    },
    seed4: {
        name: "Seed 4",
        cast: 0,
        time: 93,
        class: "Sire"
    },
    seed5: {
        name: "Seed 5",
        cast: 0,
        time: 120,
        class: "Sire"
    },
    seed6: {
        name: "Seed 6",
        cast: 0,
        time: 139,
        class: "Sire"
    }
}

const bossSpells = Object.keys(spells)
    .filter(key => spells[key].class === "Sire")
    .reduce((obj, key) => {
        return {
            ...obj,
            [key]: spells[key]
        };
    }, {});

const nonBossSpells = Object.keys(spells)
    .filter(key => spells[key].class !== "Sire")
    .reduce((obj, key) => {
        return {
            ...obj,
            [key]: spells[key]
        };
    }, {});


module.exports = { spells, nonBossSpells, bossSpells }
