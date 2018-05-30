import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

import CheckoutLineItemsAdd from '../../apollo/server/mutations/checkoutLineItemsAdd.js';
import UpdateCheckout from '../../apollo/client/mutations/updateCheckout';
import getCheckout from '../../apollo/client/queries/getCheckout';
import { graphql, compose } from 'react-apollo';

class product extends Component {
	state = {
		// selectedOptions: {},
		// images: {},
		// selectedVariant: {}
		//selectedVariantQuantity
	};

	onAddToCart = async (variantId, quantity) => {
		const res = await this.props.checkoutLineItemsAdd({
			variables: {
				checkoutId: this.props.checkout.id,
				lineItems: [{ variantId, quantity: 1 }]
			}
		});
		console.log(res, 'Hi');
		const data = res.data.checkoutLineItemsAdd.checkout;

		await this.props.updateCheckout({ variables: { checkout: { data } } });
	};

	componentWillMount() {
		console.log(this.props.checkout);
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
					className="product__select"
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

	onQuantityChange = event => {
		this.setState({ selectedVariantQuantity: event.target.value });
	};

	render() {
		let variant =
			this.state.selectedVariant || this.props.variants.edges[0].node;
		let variantQuantity = this.state.selectedVariantQuantity || 1;

		return (
			<div className="product">
				<div className="product__photo-gallery">
					<ImageGallery
						ref={i => (this._imageGallery = i)}
						items={this.state.images}
						thumbnailPosition="left"
					/>
				</div>
				<div className="product__content">
					<h2 className="product__title">{this.props.title}</h2>
					<p className="product__price">Prezzo : {variant.price}€</p>
					{this.generateSelectedElement()}
					<label className="product__quantity">
						Quantità
						<input
							min="1"
							type="number"
							defaultValue={variantQuantity}
							onChange={this.onQuantityChange}
						/>
					</label>

					<button
						className="product__button"
						onClick={() => {
							this.onAddToCart(variant.id, variantQuantity);
						}}
					>
						Add to Cart
					</button>

					<div className="product__description">
						<h3>Product Desctipion</h3>
						<p>{this.props.description}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	graphql(CheckoutLineItemsAdd, { name: 'checkoutLineItemsAdd' }),
	graphql(UpdateCheckout, { name: 'updateCheckout' }),
	graphql(getCheckout, {
		props: ({ data: { checkout } }) => ({
			checkout
		})
	})
)(product);
