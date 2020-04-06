helpers = {
    'cost': {
        'trade': {
            'catpower': 50,
            'gold': 15,
            'minerals': 1000,
            'ivory': 500
        }
    },

    open_tab: function (tab_name) {
        console.log("open_tab(" + tab_name + ")")
        $("a.tab:contains('" + tab_name + "')")[0].click();
    },

    resource: function (resource_name) {
        return eval($('.res-table > div:contains("' + resource_name + '")').children()[1].textContent.replace("K", "* 1000").replace("M", "* 1000000"))
    },

    resource_max: function (resource_name) {
        return eval($('.res-table > div:contains("' + resource_name + '")').children()[2].textContent.substr(1).replace("K", "* 1000").replace("M", "* 1000000"))
    },

    resource_ratio: function (resource_name) {
        return helpers.resource(resource_name) / helpers.resource_max(resource_name);
    },

    craft_all: function (resource_name) {
        console.log("craft_all(" + resource_name + ")")
        $($('.craftTable > div:contains("' + resource_name + '")').children()[5]).children()[0].click()
    },

    observe_sky: function () {
        console.log("observe_sky()")
        var observe_sky = $("#observeBtn");

        if (observe_sky.is(":visible")) {
            observe_sky.click();
        }
    },

    send_hunters: function () {
        console.log("send_hunters()");
        $("#fastHuntContainerCount").click();
    },

    praise_the_sun: function () {
        console.log("praise_the_sun()");
        helpers.open_tab('Religion');
        $("span:contains('Praise')").parent().parent().click();
    },

    build: function (building_name) {
        // TODO: implement
    },

    trade_all: function (race) {
        console.log("trade_all(" + race + ")");
        helpers.open_tab('Trade');
        $("div.title:contains('" + race + "')").parent().find("a:contains('all')")[0].click()
    }

};

helpOptions = {
    buildings: [],
    craft_beams: true,
    craft_slabs: true,
    craft_plates: true,
    craft_steel: true,
    craft_manuscripts: false,
    craft_compendiums: false,
    send_hunters: true,
    trade_nagas: true,
    trade_lizards: true,
    praise_the_sun: true,
};

helpKitties = function () {
    helpers.observe_sky();

    const caravan_count = Math.min(
        helpers.resource_max('catpower') / helpers.cost.trade.catpower,
        helpers.resource_max('gold') / helpers.cost.trade.gold
    );

    if (helpOptions.trade_nagas
        && helpers.resource_ratio('catpower') > 0.9
        && helpers.resource_ratio('gold') > caravan_count * helpers.cost.trade.gold
        && helpers.resource('ivory') > caravan_count * helpers.cost.trade.ivory) {
        helpers.trade_all('Nagas');
    } else if (helpOptions.trade_lizards
        && helpers.resource_ratio('catpower') > 0.99
        && helpers.resource('gold') > caravan_count * helpers.cost.trade.gold
        && helpers.resource('minerals') > caravan_count * helpers.cost.trade.minerals) {
        helpers.trade_all('Lizards');
    } else if (helpOptions.send_hunters && helpers.resource_ratio('catpower') > 0.9) {
        helpers.send_hunters();
    }

    helpers.craft_all('parchment');

    if (helpOptions.craft_manuscripts || helpOptions.craft_compendiums) {
        helpers.craft_all('manuscript');
    }
    if (helpOptions.craft_compendiums) {
        helpers.craft_all('compendium');
    }

    if (helpOptions.craft_beams && helpers.resource_ratio('wood') > 0.9) {
        helpers.craft_all('beam');
    }

    if (helpOptions.craft_slabs && helpers.resource_ratio('minerals') > 0.9) {
        helpers.craft_all('slab');
    }

    if (helpOptions.craft_steel && helpers.resource_ratio('coal') > 0.1) {
        helpers.craft_all('steel');
    }

    if (helpOptions.craft_plates && helpers.resource_ratio('iron') > 0.7) {
        helpers.craft_all('plate');
    }

    if (helpers.resource_ratio('faith') > 0.9) {
        helpers.praise_the_sun();
    }

};

if (window.hasOwnProperty('helpers_interval')) {
    window.clearInterval(helpers_interval);
}
helpers_interval = window.setInterval(function () { if (window.helpKitties != undefined) { window.helpKitties() } }, 1000)
