import React, {Component} from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';

class UnitedStates extends Component {
    state = {topologys: null}

    componentDidMount() {
        Promise.all([
            d3.json('data/us.json'),
            ]).then( ([topology]) => {
                this.setState({ topology })
            }).catch(err => console.log('Error loading or parsing data.'))
    }

    componentDidUpdate() {
        const { width, height } = this.props;
        const margins = {top: 0, right: 20, bottom: 20, left: 20};
        const visGroup = d3.select(this.refs.anchor)
            .attr({
                'width': width + margins.left + margins.right,
                'height': height + margins.top + margins.bottom,
                'preserveAspectRatio': 'xMinYMid',
                'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
            })

        const projection = d3.geoAlbers()
            .scale(width)
            .translate([ width/2, height/2 ]);
        
        const path = d3.geoPath()
            .projection(projection);

        const topology = this.state.topology;

        console.log("topology: ", topology)
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