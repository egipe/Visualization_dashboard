 // Use the D3 Library to read in samples.json

 d3.json("samples.json").then(function(data) {
     console.log(data)
 });

 // Drop Down menu
function create_dropdown(){
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(function(data) {
        var names = data.names;
        names.forEach(id => {
            dropdown.append("option")
            .text(id)
            .attr('value', id)
        });
    });
};

create_dropdown()

// function optionChanged(new_selection){
    // 3.json("samples.json").then(function(data){
        // var samples = data.samples
        // samples.forEach(sample =>{
            // some kind of if statement if id matches
        // })
    // })
//}

// Horizontal Bar Chart- sample_values as values for bar chart, otu_ids as labels, otu_labels as hovertext; top 10 OTU's
function getData() {
    d3.json("samples.json").then(function(data){
        var otu_ids = data.samples.otu_ids
        var sample_values = data.samples.sample_values
        var otu_labels = data.samples.otu_labels
        buildTable(otu_ids, sample_values, otu_labels);
    });
}

// Display each key-value pair from metadata JSON object
function buildTable(otu_ids, sample_values, otu_labels) {
    var table = d3.select(".sample-metadata")
}

function buildPlot() {
    d3.json("samples.json").then(function(data){
        var
        getData()
        var trace1 = {
            type: "bar",
            x: otu_ids.slice(0,9)
            //slice for top 10
            y: sample_values
        }
        var data = [trace1]
        var layout = {
            title: `top 10 OTUs`
            xaxis: {
            }
            yaxis: {
            }
            };
        Plotly.newPlot('bar', data, layout)
    });
}

buildPlot();

// Bubble chart- otu's x values, sample_values for y & marker size, otu_id for marker color, otu_labels for text values
//Display sample metadata (individuals demographic info)

