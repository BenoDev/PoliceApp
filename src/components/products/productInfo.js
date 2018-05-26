import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

class productInfo extends Component {
	state = {
		// selectedOptions: {},
		// images: {},
		// selectedVariant: {}
	};

	componentWillMount() {
		// let indexFirstVariant = this.props.variants.findByIndex(variant => {
		// 	return variant.edges.node.selectedOptions===;
		// });
		this.setState({ images: this.props.images }, () => {
			this.findImage(this.props.variants.edges[0].node.image.id);
		});

		this.props.options.forEach(option => {
			this.setState((prevState, props) => {
				return {
					selectedOptions: {
						...prevState.selectedOptions,
						[option.name]: option.values[0]
					}
				};
			});
		});
	}

	generateSelectedElement() {
		return this.props.options.map(option => {
			return (
				<select
					onChange={this.onOptionChange}
					name={option.name}
					id={option.name}
					key={option.id}
					value={this.state.selectedOptions[option]}
				>
					{option.values.map(value => {
						return (
							<option
								value={value}
								key={`${option.name}-${value}`}
							>
								{value}
							</option>
						);
					})}
				</select>
			);
		});
	}

	findImage = variantId => {
		console.log(this.state.images, variantId);
		const imageIndex = this.state.images.findIndex(image => {
			return image.id === variantId;
		});

		this._imageGallery.slideToIndex(imageIndex || 0);
	};

	onOptionChange = event => {
		console.log(event.target.name, event.target.value);
		let selectedOptions = this.state.selectedOptions;
		selectedOptions[event.target.name] = event.target.value;

		const selectedVariant = this.props.variants.edges.find(variant => {
			return variant.node.selectedOptions.every(selectedOption => {
				return (
					selectedOptions[selectedOption.name] ===
					selectedOption.value
				);
			});
		}).node;

		this.setState(
			{
				selectedVariant: selectedVariant
			},
			() => this.findImage(selectedVariant.image.id)
		);
	};

	render() {
		let variant =
			this.state.selectedVariant || this.props.variants.edges[0].node;

		return (
			<div className="product-info">
				<div className="product-info__photo-gallery">
					<ImageGallery
						ref={i => (this._imageGallery = i)}
						items={this.state.images}
						thumbnailPosition="left"
					/>
				</div>
				<div className="product-info__content">
					<h2 className="product-info__title">{this.props.title}</h2>
					<p className="product-info__description">
						{this.props.description}
					</p>
					{this.generateSelectedElement()}
					<button
						onClick={() => {
							console.log(variant);
						}}
					>
						Checkout
					</button>
				</div>
			</div>
		);
	}
}

export default productInfo;
