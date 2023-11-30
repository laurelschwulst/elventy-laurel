module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("images");
    
    eleventyConfig.addPassthroughCopy("admin");

    eleventyConfig.addCollection("writing", function(collection) {
        return collection.getAllSorted().filter(function(item) {
        return "type" in item.data && item.data.type === "writing";
        });
    });

    eleventyConfig.addCollection("media_one", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/images/*");
    });

    eleventyConfig.addCollection("media_two_beginning", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/images/*");
    });

    eleventyConfig.addCollection("media_two_ending", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/images/*");
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

    eleventyConfig.addCollection("everything", function(collectionApi) {
    return collectionApi.getAll().sort((a, b) => {
        // Assuming 'date' is a Date object
        return a.date - b.date;
    });
    });

};

