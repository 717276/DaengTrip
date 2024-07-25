import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../components/css/shop/ShopList.css';

const ShopList = () => {
    const { category } = useParams();
    const products = [
        { id: 1, name: '위생용품 01', price: 7000, category: '위생용품', image: '/src/images/shop/doggoods00.png' },
        {
            id: 2,
            name: '사료 및 간식 02',
            price: 56400,
            category: '사료 및 간식',
            image: '/src/images/shop/doggoods01.png',
        },
        {
            id: 3,
            name: '강아지 옷 03',
            price: 84537,
            category: '강아지 옷',
            image: '/src/images/shop/doggoods02.png',
        },
        { id: 4, name: '위생용품', price: 84423, category: '위생용품', image: '/src/images/shop/doggoods03.png' },
        { id: 5, name: '악세서리 05', price: 8463, category: '악세서리', image: '/src/images/shop/doggoods00.png' },
        {
            id: 6,
            name: '사료 및 간식 06',
            price: 87462,
            category: '사료 및 간식',
            image: '/src/images/shop/doggoods01.png',
        },
        {
            id: 7,
            name: '사료 및 간식 07',
            price: 8756,
            category: '사료 및 간식',
            image: '/src/images/shop/doggoods03.png',
        },
        {
            id: 8,
            name: '강아지 옷 08',
            price: 15758,
            category: '강아지 옷',
            image: '/src/images/shop/doggoods02.png',
        },
        { id: 9, name: '위생용품 09', price: 14573, category: '위생용품', image: '/src/images/shop/doggoods00.png' },
        {
            id: 10,
            name: '악세서리 10',
            price: 78454,
            category: '악세서리',
            image: '/src/images/shop/doggoods01.png',
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState(category || '전체');

    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
    }, [category]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts =
        selectedCategory === '전체' ? products : products.filter((product) => product.category === selectedCategory);

    return (
        <div className="product_list_container">
            <h1>카테고리</h1>
            <div className="category_buttons">
                <button className="category_button" onClick={() => handleCategoryClick('신상품')}>
                    신상품
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('사료 및 간식')}>
                    사료 및 간식
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('강아지 옷')}>
                    강아지 옷
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('위생용품')}>
                    위생용품
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('악세서리')}>
                    악세서리
                </button>
                <button className="category_button" onClick={() => handleCategoryClick('전체')}>
                    전체
                </button>
            </div>
            <div className="product_grid">
                {filteredProducts.map((product) => (
                    <div className="product_card" key={product.id}>
                        <img className="product_image" src={product.image} alt={product.name} />
                        <div className="product_info">
                            <h2 className="product_name">{product.name}</h2>
                            <p className="product_price">{product.price.toLocaleString()}원</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopList;
