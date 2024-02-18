const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("media");
    
    eleventyConfig.addPassthroughCopy("admin");

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

    eleventyConfig.addCollection("allWorlds", function (collection) {
        let worldsSet = new Set();
        collection.getAll().forEach(function (item) {
            if ('world' in item.data && Array.isArray(item.data.world)) {
            item.data.world.forEach(m => worldsSet.add(m));
            }
        });
        return [...worldsSet];
    });

    eleventyConfig.addCollection("allTypefaces", function (collection) {
        let typefacesSet = new Set();
        collection.getAll().forEach(function (item) {
            if ('typeface' in item.data && Array.isArray(item.data.typeface)) {
            item.data.typeface.forEach(m => typefacesSet.add(m));
            }
        });
        return [...typefacesSet];
    });

    eleventyConfig.addCollection("selected", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.data.selected === true);
    });

    eleventyConfig.addCollection("selected_section", function(collectionApi) {
        return collectionApi.getAll().filter(item => item.data.selected_section === true);
    });

    eleventyConfig.addCollection("selected_section_shuffled", function(collectionApi) {
        const selected = collectionApi.getAll().filter(item => item.data.selected_section === true);
        return eleventyConfig.getFilter("shuffle")(selected);
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

    eleventyConfig.addCollection("everything", function(collectionApi) {
        const sortedCollection = collectionApi.getAll().sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            console.log(dateA, dateB); // Output the dates for debugging
            return dateB - dateA;
        });
    
        return sortedCollection;
    });

    eleventyConfig.addCollection("p", function(collectionApi) {
        return collectionApi.getAll();
    });

    module.exports = function(eleventyConfig) {
        eleventyConfig.addGlobalData("layout", function() {
          return this.page.data.layout;
        });
      };

    eleventyConfig.addNunjucksFilter("push", function(arr, value) {
        arr.push(value);
        return arr;
    });

    module.exports = function(eleventyConfig) {
        // Custom filter to modify the title dynamically
        eleventyConfig.addFilter("modifyTitle", function(title, collaborator) {
            return title.replace("{{ collaborator }}", collaborator);
        });
    };


    // Other configurations...

    return {
        // Your other Eleventy configurations...
    };

};

