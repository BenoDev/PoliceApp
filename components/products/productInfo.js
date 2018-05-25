import React, { Component } from 'react';

class productInfo extends Component {
	generateSelectedElement() {
		return this.props.options.map(option => {
			return (
				<select name={option.name} id={option.id}>
					{option.values.map(value => {
						return <option value={value}>{value}</option>;
					})}
				</select>
			);
		});
	}

	render() {
		return (
			<div className="product-info">
				<h2 className="product-info__title">{this.props.title}</h2>
				<p className="product-info__description">
					{this.props.description}
				</p>
				{this.generateSelectedElement()}
			</div>
		);
	}
}

export default productInfo;
