import React from 'react';
import featureImage1 from '../../assets/img/feature1.jpg';
import featureImage2 from '../../assets/img/feature2.jpg';

export default () => {
	return (
		<section className="feature-section">
			<figure className="feature-section__item--1">
				<img
					src={featureImage1}
					alt="Forest image"
					className="feature-section__image"
				/>
			</figure>

			<div className="feature-section__item--2">
				<h2 className="feature-section__heading">
					Lorem ipsum dolor sit amet,
				</h2>
				<p className="feature-section__paragraph">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Nisi id pariatur accusantium libero,
				</p>
			</div>

			<figure className="feature-section__item--3">
				<img
					src={featureImage2}
					alt="Hunter Image"
					className="feature-section__image"
				/>
			</figure>

			<div className="feature-section__item--4">
				<h2 className="feature-section__heading">
					Lorem ipsum dolor sit amet
				</h2>
				<p className="feature-section__paragraph">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Nisi id pariatur accusantium libero,
				</p>
			</div>
		</section>
	);
};
