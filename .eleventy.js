const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("media");
    
    eleventyConfig.addPassthroughCopy("admin");

    eleventyConfig.addCollection("writing", function(collection) {
        return collection.getAllSorted().filter(function(item) {
        return "type" in item.data && item.data.type === "writing";
        });
    });

    eleventyConfig.addCollection("media_one", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/media/*");
    });

    eleventyConfig.addCollection("media_two_beginning", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/media/*");
    });

    eleventyConfig.addCollection("media_two_ending", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/media/*");
    });

    eleventyConfig.addCollection("allMediums", function (collection) {
        let mediumsSet = new Set();
        collection.getAll().forEach(function (item) {
            if ('medium' in item.data && Array.isArray(item.data.medium)) {
            item.data.medium.forEach(m => mediumsSet.add(m));
            }
        });
        return [...mediumsSet];
    });

    eleventyConfig.addCollection("allCollaborators", function (collection) {
        let collaboratorsSet = new Set();
        collection.getAll().forEach(function (item) {
            if ('collaborator' in item.data && Array.isArray(item.data.collaborator)) {
            item.data.collaborator.forEach(m => collaboratorsSet.add(m));
            }
        });
        return [...collaboratorsSet];
    });

    eleventyConfig.addCollection("allYears", function (collection) {
        let yearsSet = new Set();
        collection.getAll().forEach(function (item) {
            if ('year' in item.data && Array.isArray(item.data.year)) {
            item.data.year.forEach(m => yearsSet.add(m));
            }
        });
        return [...yearsSet];
    });

    eleventyConfig.addCollection("selected", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.data.selected === true);
    });

    eleventyConfig.addFilter("shuffle", function(array) {
        // Copy the array to avoid modifying the original
        const shuffledArray = array.slice();

        // Fisher-Yates shuffle algorithm
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    });

    eleventyConfig.addCollection("selected_shuffled", function(collectionApi) {
        const selected = collectionApi.getAll().filter(item => item.data.selected_project === true);
        return eleventyConfig.getFilter("shuffle")(selected);
    });

    eleventyConfig.addCollection("everything", function(collectionApi) {
    return collectionApi.getAll().sort((a, b) => {
        // Assuming 'date' is a Date object
        return a.date - b.date;
    });
    });

    eleventyConfig.addNunjucksFilter("push", function(arr, value) {
        arr.push(value);
        return arr;
    });

    // Other configurations...

    return {
        // Your other Eleventy configurations...
    };

};

