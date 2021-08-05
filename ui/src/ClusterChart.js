import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { min } from 'd3-array'
import { select } from 'd3-selection'

class ClusterChart extends Component {

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
     const dataMaxX = max(this.props.data.map(d => d.x))
     const dataMinX = min(this.props.data.map(d => d.x))
     const dataMaxY = max(this.props.data.map(d => d.y))
     const dataMinY = min(this.props.data.map(d => d.y))
     const yScale = scaleLinear()
        .domain([dataMaxY + 0.1, dataMinY - 0.1])
        .range([0, this.props.size[1]])
      const xScale = scaleLinear()
          .domain([dataMinX - 1, dataMaxX + 1])
          .range([0, this.props.size[0]])
  select(node)
     .selectAll('circle')
     .data(this.props.data)
     .enter()
     .append('circle')

  select(node)
     .selectAll('circle')
     .data(this.props.data)
     .exit()
     .remove()

  select(node)
     .selectAll('circle')
     .data(this.props.data)
     .style('fill', d => this.colors[d.c])
     .attr('cx', d => xScale(d.x))
     .attr('cy', d => yScale(d.y))
     .attr('r', 3)
   }

render() {
      return <div>
      <svg ref={node => this.node = node}
        width={1000} height={1000}>
        </svg>
      </div>
   }
}

export default ClusterChart