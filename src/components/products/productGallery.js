import React, { Component } from 'react';

class ProductGallery extends Component {
	state = {
		currentImage: 0,
		images: null
		// images: [
		// 	{
		// 		id: 1,
		// 		url:
		// 			'https://euw.leagueoflegends.com/sites/default/files/upload/art/teambuilder-wallpaper.jpg'
		// 	},
		// 	{
		// 		id: 2,
		// 		url:
		// 			'https://i.pinimg.com/736x/14/8e/c6/148ec6142df984a8f03a9c5c5cdeb2cf--league-legends-game-info.jpg'
		// 	},
		// 	{
		// 		id: 3,
		// 		url:
		// 			'https://i.pinimg.com/originals/a0/22/03/a02203f6fe7588a6c491b907e10fbaaf.png'
		// 	}
		// ]
	};

	componentDidMount() {
		this.setState({ images: this.props.images }, () =>
			console.log(this.state)
		);
	}

	renderSideGallery = () => {
		if (!this.state.images) {
			return [];
		}
		return this.state.images.map((image, index) => {
			return (
				<img
					src={image.url}
					alt=""
					key={image.id}
					onClick={() => this.changeCurrentImage(index)}
				/>
			);
		});
	};

	changeCurrentImage(index) {
		this.setState({ currentImage: index });
	}

	render() {
		let mainImage = '';
		if (this.state.images) {
			mainImage = this.state.images[this.state.currentImage].url;
		}

		return (
			<div className="product-gallery">
				<div className="product-gallery__side">
					{this.renderSideGallery()}
				</div>
				<div className="product-gallery__main">
					<img
						className="product-gallery__image"
						src={mainImage}
						alt=""
					/>
				</div>
			</div>
		);
	}
}
export default ProductGallery;
