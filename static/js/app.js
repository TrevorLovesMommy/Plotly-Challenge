/* note to self - to run this code on your laptop, set up your local http server
through anaconda prompt, then open a browser and point to http://localhost:8000/ */

//read in local json file
d3.json("samples.json").then((data) =>{

    //------------------- narrow down json object to samples -------------------
    var belly_samples = data.samples;
    // get the all samples
    console.log("here are all the samples");
    console.log(belly_samples);

    var metadata = data.metadata;
    // get the all metadata
    console.log("here are all the metadata");
    console.log(metadata);

    /// ----------------Get Test Subject ID No's and populate pull downlist -----------

    //Get list of subject id's through data.names
    id_list = data.names;
    console.log('here are the names and id');
    console.log(id_list);

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
    //question for justin - do I haveto create thsi event handler.  
    //when I turn this on, the function optionChaned doesn't get called
    //Code work when I don't use the event handler and just call the function optionChange
    d3.selectAll("#selDataset").on("change", optionChanged);
    //question fror justin - this returns an array instead of value
    // var x =  d3.selectAll("#selDataset").on("change", optionChanged);

 
    // console.log("this is the selected_id to be passed");
    // console.log(sample_id);
    // // console.log(sample_id.slice(0,0));
    // console.log(sample_id.value);
 
    // console.log(sample_id[0]);



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
        var filteredDataMeta = metadata.filter(meta => meta.id === selectedID);
        var filteredDataSample = belly_samples.filter(sample => sample.id === selectedID);

        console.log("this is the filtered meta data");
        console.log(filteredDataMeta);

        console.log("this is the filteredDataSample");
        console.log(filteredDataSample);


        ///populate the Demographic Info Module








        //plot table
    



 
        var x_out_ids = filteredDataSample.map(sample => sample.otu_ids)
        console.log("this is x_out_ids");
        console.log(x_out_ids);

        var y_sample_values = filteredDataSample.map(sample => sample.sample_values)
        console.log("this is y_sample_values");
        console.log(y_sample_values);


        var trace1 = {
            x: x_out_ids,
            y: y_sample_values,
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace1];

        var layout = {
            margin: {
              l: 10,
              r: 10,
              t: 10,
              b: 10
            }
           };
           

        var data = [trace1];

        Plotly.newPlot("bar", data, layout)


        // return selectedID;  As justin about this.  I get an array instead of a value
    }

 
    optionChanged();

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

    // function filterData()






}); //end d3.json





