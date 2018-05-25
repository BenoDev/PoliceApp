import React from 'react';
import categoriesImage1 from '../../assets/img/categories1.jpg';
import categoriesImage2 from '../../assets/img/categories2.jpg';
import categoriesImage3 from '../../assets/img/categories3.jpg';

export default () => {
	return (
		<section className="categories">
			<div className="categories__item categories__item--1">
				<img
					src={categoriesImage2}
					alt="Image1"
					className="categories__image"
				/>
				<a href="#" className="categories__link">
					Collection
				</a>
			</div>
			<div className="categories__item categories__item--2">
				<img
					src={categoriesImage1}
					alt="Image 2"
					className="categories__image"
				/>
				<a href="#" className="categories__link">
					Clothes
				</a>
			</div>
			<div className="categories__item categories__item--3">
				<img
					src={categoriesImage3}
					alt="Image 3"
					className="categories__image"
				/>
				<a href="#" className="categories__link">
					Weapons
				</a>
			</div>
			<div className="categories__item categories__item--4">
				<h3 className="categories__heading">Free Shipping</h3>
			</div>
			<div className="categories__item categories__item--5">
				<h3 className="categories__heading">Premium service</h3>
			</div>
		</section>
	);
};
