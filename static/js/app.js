//read in local json file
d3.json("samples.json").then((data) =>{
    // create the trace for top 10 OTU

    var belly_samples = data.samples;
    // get the all samples
    console.log('here are all the samples');
    console.log(belly_samples);

    //get demographic info
    var demographic = data.metadata;
    console.log("here's the demographic data");
    console.log(demographic);

    // //get all id's of the samples from a list of dictionaries
    //use this list to populate the pull down list of Test Subject ID's
    //https://stackoverflow.com/questions/32915516/how-to-i-parse-json-list-of-dictionaries-in-javascript
    function getID(main) {
        ids = [];
        for (var i = 0; i < main.length; i++ ) {
            ids.push(main[i].id);
        }
        return ids;
    };
    
    id_list = getID(belly_samples);
    console.log("this is the id_list");
    console.log(id_list);
    
    for (var i = 0; i < id_list.length; i++) {
        d3.select("#selDataset").append("option").text(id_list[i]);
        console.log('in the loop');
    };
    // //get all the otu_ids from  from a list of dictionaries
    // function getOtuIds(main)


});






// //This works
// i = "1000"
// var option_list = d3.select("#selDataset").append("option").text(i);
