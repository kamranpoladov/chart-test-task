import React from 'react';
import './ChartComponent.scss';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

const margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const chartData: PlotProps = {
	data: 
	[
		{
			date: new Date(2001, 2),
			value: 43
		},
		{
			date: new Date(2001, 3),
			value: 29
		},
		{
			date: new Date(2001, 4),
			value: 74
		},
		{
			date: new Date(2001, 5),
			value: 92
		},
		{
			date: new Date(2001, 6),
			value: 35
		},
		{
			date: new Date(2001, 7),
			value: 24
		}
	]
}

const ChartComponent = () => {
	const divRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		const svg = d3.select('#mainDiv')
			.append('svg')
				.attr('width', width + margin.right + margin.left)
				.attr('height', height + margin.bottom + margin.top)
			.append('g')
				.attr('transform',
					'translate(' + margin.left + ', ' + margin.top + ')');
		
		const x = d3.scaleLinear()
			.domain(d3.extent<any>(chartData.data, (d: ArrayLike<DataPoint>) => new Date(d.date)))
			.range([0, width]);
		svg.append('g')
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x).
				tickFormat(d3.timeFormat('%Y-%m')).tickValues(chartData.data.map((d: DataPoint) => new Date(d.date))));

		const y = d3.scaleLinear()
			.domain([Math.min(...chartData.data.map(data => data.value)), Math.max(...chartData.data.map(data => data.value))])
			.range([height, 0]);
		svg.append('g')
			.call(d3.axisLeft(y));

		svg.append("path")
			.datum(chartData.data)
			.attr('fill', "#81F79F")
			.attr("stroke", "#00FF40")
			.attr("stroke-width", 1.5)
			.attr('d', d3.area<any>()
				.curve(d3.curveBasis)
				.x(function(d) { return x(d.date) })
				.y0(y(Math.min(...chartData.data.map(data => data.value))))
				.y1(function(d) { return y(d.value) })
			);
	}, []);

	return (
		<div id='mainDiv' ref={divRef}>

		</div>
	);
};

interface DataPoint {
	date: Date;
	value: number;
}

interface PlotProps {
	data: Array<DataPoint>;
};

export default ChartComponent;