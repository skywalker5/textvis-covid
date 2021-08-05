import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { min } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from 'd3';
import './GraphChart.css';

class GraphChart extends Component {

   constructor(props){
       super(props)
       this.colors = ['#ff0000',
                        '#800000',
                        '#FFFF00',
                        '#808000',
                        '#00FF00',
                        '#008000',
                        '#00FFFF',
                        '#008080',
                        '#0000FF',
                        '#000080',
                        '#FF00FF',
                        '#800080',
                        '#DC7633',
                        '#9C640C',
                        '#48C9B0',
                        '#F39C12',
                        '#BB8FCE',
                        '#85929E',
                        '#F1948A',
                        '#7D6608'
       ]
       this.createClusterChart = this.createClusterChart.bind(this)
   }

   componentDidMount() {
      this.createClusterChart()
   }

   componentDidUpdate() {
      this.createClusterChart()
   }

   createClusterChart() {
     const node = this.node
   //   const dataMaxX = max(this.props.data.map(d => d.x))
   //   const dataMinX = min(this.props.data.map(d => d.x))
   //   const dataMaxY = max(this.props.data.map(d => d.y))
   //   const dataMinY = min(this.props.data.map(d => d.y))
   //   const yScale = scaleLinear()
   //      .domain([dataMaxY + 0.1, dataMinY - 0.1])
   //      .range([0, this.props.size[1]])
   //    const xScale = scaleLinear()
   //        .domain([dataMinX - 1, dataMaxX + 1])
   //        .range([0, this.props.size[0]])
   var links = this.props.data;

   var nodes = {};
   links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });
  console.log(links)
  var node_list = Object.keys(nodes).map(function (key) { 
   return nodes[key]; 
}); 
  this.force = d3.forceSimulation()
  .nodes(node_list)
  .force("link", d3.forceLink(links).distance(2))
  .force("center", d3.forceCenter().x(this.props.size2[0] / 2).y(this.props.size2[1]  / 2))
  .force("x", d3.forceX())
  .force("y", d3.forceY())
  .force("charge", d3.forceManyBody().strength(-10))
  .alphaTarget(1)
  .on("tick", () => {
      path.attr("d", function(d) {
         var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
         return "M" +
            d.source.x + "," +
            d.source.y + "A" +
            dr + "," + dr + " 0 0,1 " +
            d.target.x + "," +
            d.target.y;
      });

      node2.attr("transform", function(d) {
         return "translate(" + d.x + "," + d.y + ")"; 
      });
   });

   console.log(3)
   var path = select(node).append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
  
   var node2 = select(node).selectAll(".node")
      .data(this.force.nodes())
      .enter().append("g")
      .attr("class", "node")
   node2.append("circle")
         .attr("r", 3)
         //fill shade
         .style("fill", "skyblue")
         .style('stroke-width','1px');
  
//   select(node)
//      .selectAll('circle')
//      .data(this.props.data)
//      .enter()
//      .append('circle')

//   select(node)
//      .selectAll('circle')
//      .data(this.props.data)
//      .exit()
//      .remove()

//   select(node)
//      .selectAll('circle')
//      .data(this.props.data)
//      .style('fill', d => this.colors[d.c])
//      .attr('r', 3)
   }

render() {
      return <div>
      <svg ref={node => this.node = node}
        width={1000} height={1000}>
        </svg>
      </div>
   }
}

export default GraphChart