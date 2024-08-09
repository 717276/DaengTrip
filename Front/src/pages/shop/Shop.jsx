import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../components/css/shop/Shop.css';

const Shop = () => {
    const productImages = [
        '/src/images/shop/doggoods00.png',
        '/src/images/shop/doggoods01.png',
        '/src/images/shop/doggoods02.png',
        '/src/images/shop/doggoods00.png',
    ];
    const categories = [
        { category: '0', name: '위생용품', image: '/src/images/shop/doggoods00.png' },
        { category: '1', name: '간식 및 사료', image: '/src/images/shop/doggoods01.png' },
        { category: '2', name: '강아지 옷', image: '/src/images/shop/doggoods02.png' },
        { category: '3', name: '악세사리', image: '/src/images/shop/doggoods03.png' },
    ];

    useEffect(() => {
        let slideIndex = 0;
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');

        const showSlides = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].className += ' active';
            setTimeout(showSlides, 2000); // Change slide every 2 seconds
        };

        showSlides();
    }, []);

    const nextSlide = () => {
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');
        let currentSlideIndex = Array.from(slides).findIndex((slide) => slide.style.display === 'block');
        slides[currentSlideIndex].style.display = 'none';
        dots[currentSlideIndex].className = dots[currentSlideIndex].className.replace(' active', '');

        let nextSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[nextSlideIndex].style.display = 'block';
        dots[nextSlideIndex].className += ' active';
    };

    const prevSlide = () => {
        const slides = document.getElementsByClassName('slideshow-slide');
        const dots = document.getElementsByClassName('dot');
        let currentSlideIndex = Array.from(slides).findIndex((slide) => slide.style.display === 'block');
        slides[currentSlideIndex].style.display = 'none';
        dots[currentSlideIndex].className = dots[currentSlideIndex].className.replace(' active', '');

        let prevSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        slides[prevSlideIndex].style.display = 'block';
        dots[prevSlideIndex].className += ' active';
    };

    return (
        <div className="shop-container">
            <br />
            <br />
            <hr />
            <br />
            <br />
            <div className="top_categories">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={`/shoplist/${category.category}`}
                        state={{ selectedCategory: category.name }}
                        className="top_category_link"
                    >
                        <div className="top_category">{category.name}</div>
                    </Link>
                ))}
            </div>

            <br />
            <hr />
            <br />

            <div className="slider-container">
                <div className="slideshow">
                    <div className="slideshow-slide">
                        <img className="slide-image" src={productImages[0]} alt="slide1" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src={productImages[1]} alt="slide2" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src={productImages[2]} alt="slide3" />
                    </div>
                    <div className="slideshow-slide">
                        <img className="slide-image" src={productImages[3]} alt="slide4" />
                    </div>
                    <button className="prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="next" onClick={nextSlide}>
                        &#10095;
                    </button>
                    <div className="slideshow-nav">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>
            <div className="product-grid">
                {categories.map((category, index) => (
                    <div className="product-item" key={index}>
                        <Link to={`/shoplist/${category.category}`} state={{ selectedCategory: category.name }}>
                            <span>{category.name}</span>
                        </Link>
                        <br />
                        <br />
                        <img src={category.image} alt={category.category} className="product-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;