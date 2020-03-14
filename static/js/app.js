/* Note to self - to run this code on your laptop, set up your local http server
through anaconda prompt, then open a browser and point to http://localhost:8000/ */

//Read in local json file.  Everything is read in as strings
d3.json("samples.json").then((data) =>{

    //------------------- narrow down json object to samples and metadata -------------------
    var belly_samples = data.samples;
    // get the all samples
    console.log("here are all the samples");
    console.log(belly_samples);

    var metadata = data.metadata;
    // get the all metadata
    console.log("here are all the metadata");
    console.log(metadata);

    /// ---------------- Get Test Subject ID No's and populate pull downlist -----------

    //Get list of subject id's through data.names
    id_list = data.names;
    console.log('here are the names and id');
    console.log(id_list);  //this is a string not a number!!!

    //bind id_list to the pulldown menu
    d3.select("#selDataset")
        //selcting all option tags when they don't exist yet will set them up for a later append
        .selectAll("option")
        //bind data
        .data(id_list)
        //create placeholder for new data
        .enter()
        //append option placeholder
        .append("option")
        //for every element of id_list represented by d, insert html
        .html(function(d){
            return `<option value= ${d}>${d}</option>`;
        });

    //------------- get demographic info and populate Demographic Info Table ---------------------

    //Use D3 to create an event handler
    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
        //use D3 to select the dropdown menu
        var dropdownMenu = d3.selectAll("#selDataset").node();
        //assign the dropdown menu item ID to avariable.  This is the parent node
        var dropdownMenuID = dropdownMenu.id;
        //assign the dropdown menu option to a variable.  This is the child node
        var selectedID = dropdownMenu.value;

        console.log(dropdownMenuID); //result is selDtaset
        console.log(selectedID); //result is a number like 940

        //filter sample data based on selectedID
        // var filteredDataMeta = metadata.filter(sample =>sample.id === selectedID);
        var filteredDataMeta = metadata.filter(meta => meta.id === parseInt(selectedID));
        var filteredDataSample = belly_samples.filter(sample => sample.id === selectedID)[0];

        console.log("this is the filtered meta data");
        console.log(filteredDataMeta);

        console.log("this is the filteredDataSample");
        console.log(filteredDataSample);

        // ///populate the Demographic Info Module
        // d3.select("#sample-metadata")
        // .selectAll("p")
        // .data(filteredDataMeta)
        // .enter()
        // .append("p")
        // .html((d,i) => `${Object.keys(d)[i]}:  ${Object.values(d)[i]}`);       


        //populate the Demographic Info Module
        d3.select("#sample-metadata")
        .html("")
        .selectAll("p")
        .data(filteredDataMeta)
        .enter()
        .append("p")
        .html(function(d) {
            return `<p>${Object.keys(d)[0]}:  ${Object.values(d)[0]}</p>
                    <p>${Object.keys(d)[1]}:  ${Object.values(d)[1]}</p>
                    <p>${Object.keys(d)[2]}:  ${Object.values(d)[2]}</p>
                    <p>${Object.keys(d)[3]}:  ${Object.values(d)[3]}</p>
                    <p>${Object.keys(d)[4]}:  ${Object.values(d)[4]}</p>
                    <p>${Object.keys(d)[5]}:  ${Object.values(d)[5]}</p>
                    <p>${Object.keys(d)[6]}:  ${Object.values(d)[6]}</p>`
        });

        
        // --------------------------------- plot bar chart ------------------------------------
    

        //ask justin is map is usually used for an array
        //category
        var y_out_ids = filteredDataSample.otu_ids
        console.log("this is y_out_ids");
        console.log(y_out_ids);

        var x_sample = filteredDataSample.sample_values
        console.log("this is x-sample");
        console.log(x_sample);

        // var x = y_sample.forEach(function(data) {
        //     data = +data;
        // });
        // console.log("this is x");
        // console.log(x);

        //convert an array of strings into an array of numbers
        // var x = y_sample.map(value => parseInt(value));  //only get the first value
        // console.log("this is x");
        // console.log(x);
        // console.log("this i s the pyt of x");
        // console.log(x[0]);
        // console.log(typeof x[0]);
        // console.log(y_sample[0]);
        // console.log(typeof y_sample[0]);

        //https://wsvincent.com/javascript-parseint-map/
        // var y_sample_values = y_sample.map(Number);
        // var y_sample_values = y_sample.map(function (x){
        //     return parseInt(x, 10);
        // });


        // console.log("this is y_sample_values");
        // console.log(y_sample_values);


        var trace = {
            x: x_sample,
            y: y_out_ids,
            type: "bar",
            orientation: "h"
           };
           // 6. Create the data array for our plot
           var data = [trace];
           // 7. Define our plot layout

           var layout = {
            margin: {
              l: 50,
              r: 50,
              t: 50,
              b: 50
            }
           };
           

           // 8. Plot the chart to a div tag with id "bar-plot"
           Plotly.newPlot("bar", data, layout);


        // return selectedID;  As justin about this.  I get an array instead of a value
    }

 
    // optionChanged();

 

}); //end d3.json


// ------------- ignore    ----------------   
// another option to  get data from the pull down menu without node
    // function optionChanged() {
    //     //select the dropdown menu
    //     var dropdownMenu = d3.select("#selDataset");
    //     //assign the value of the dropdown menu to the a variable
    //     var get_id = dropdownMenu.property("value");
    //     console.log("from function optionChanged")
    //     console.log(get_id)
    //     return get_id
    // }



