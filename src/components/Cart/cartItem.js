import React, { Component } from "react";

class CartItem extends Component {
	state = {};

	componentWillMount() {
		this.setState({ quantity: this.props.quantity });
	}

	onQuantityChange = event => {
		this.setState({ quantity: event.target.value }, () => {
			const res = this.props.updateItem(parseInt(this.state.quantity));
		});
	};

	render() {
		const {
			title,
			quantity,
			price,
			image,
			removeItem,
			updateItem
		} = this.props;
		return (
			<div className="cart__product">
				<div className="cart__product__item--article">
					<div className="cart__product__item--image">
						<img src={image} alt="" />
					</div>
					<span className="cart__product__item--title">{title}</span>
				</div>
				<div className="cart__product__item">Taglia</div>
				<div className="cart__product__item">Colore</div>
				<div className="cart__product__item--quantity">
					{this.state.quantity}
				</div>
				<div className="cart__product__item--price">{price} €</div>
				<div>
					<button onClick={removeItem}>Rimuovi dal carrello</button>
					<label>
						Quantità
						<input
							min="1"
							type="number"
							value={this.state.quantity}
							onChange={this.onQuantityChange}
						/>
					</label>
				</div>
			</div>
		);
	}
}

export default CartItem;
