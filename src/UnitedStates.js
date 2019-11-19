import React, {Component} from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import * as d3SelectionMulti from 'd3-selection-multi';

import { getAffiliationColor, avgColor } from './helpers';

class UnitedStates extends Component {
    state = {topologys: null, stateNames: null}

    componentDidMount() {
        Promise.all([
            d3.json('data/us.json'),
            d3.json('data/state-data.json'),
        ]).then( ([topology, stateNames]) => {
            this.setState({ topology, stateNames })
        }).catch(err => console.log('Error loading or parsing data.'))
    }

    componentDidUpdate() {
        const { width, height } = this.props;
        const margins = {top: 0, right: 20, bottom: 20, left: 20};
        const vis_group = d3.select(this.refs.anchor)

        // tooltips
        const tooltip = d3.select('body').append('div')
            .attrs({
                'class': 'tooltip',
                'opacity': 1e-6
            })

        const projection = d3.geoAlbers()
            .scale(width)
            .translate([ width/2, height/2 ]);
        
        const path = d3.geoPath()
            .projection(projection);

        // console.log('stateNames: ', this.state.stateNames)

        const stateNames = this.state.stateNames;

        vis_group
            .selectAll("path")
            .data(topojson.feature(this.state.topology, this.state.topology.objects.states).features)
            .enter().append('path')
            .attrs({
                'd': path,
                'class': 'stats',
                'id': function(d) {
                    return d.id
                },
                'fill': function(d){
                    const whichState = (stateNames.filter((elem) => { return elem.id === (d.id).toString()}))[0];
                    return getAffiliationColor(whichState)
                },
                'stroke': '#fff',
                'strokeWidth': 2
            })
            .each(function(d) {
                d3.select(this).on('mouseover', user_interaction)
                d3.select(this).on('mouseout', user_interaction)
            })

        console.log("avgColor", avgColor("e23834","01236a"))

        function user_interaction(d){
            d3.select(this).style('cursor', 'pointer'); 
            const whichState = (stateNames.filter((elem) => { return elem.id == d.id}))[0];

            const tooltip_opacity = d3.event.type == 'mouseover' ? 1 : 0;
            const fill_color = d3.event.type == 'mouseover' ? '#666' : getAffiliationColor(whichState);

            d3.select('.tooltip')
                // can the html be a component????
                .html( '<div><p><strong>' + whichState.name + ':</strong></p><p>' + whichState.party + '</p></div>' )
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px')
                .transition()
                    .duration(500)
                    .style('opacity', tooltip_opacity) 

            d3.select(this)
                .transition()
                    .duration(300)
                    .attr('fill', fill_color)
        }
    }

    render() {
        const { topology }  = this.state;

        if(!topology) {
            return null
        }
        
        return <svg width="960" height="600">
            <g ref="anchor" width={960} height={600} />
        </svg>;
    }
}

export default UnitedStates;