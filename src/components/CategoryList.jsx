import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        id: '',
        nombre: '',
    });

    const handleInputChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-productos.netlify.app/api/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            const data = await response.json();
            setCategories([...categories, data]);
            setNewCategory({ id: '', nombre: '' });
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        console.log('Intentando eliminar categoría con ID:', categoryId);
    
        try {
            await fetch(`https://backend-productos.netlify.app/api/categorias/${categoryId}`, {
                method: 'DELETE',
            });
    
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://backend-productos.netlify.app/api/categorias');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Categorías</h2>
            <ul className="list-group">
                {categories.map((category) => (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {category.nombre}
                        <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-2 mx-auto">
                        <label>Nombre:</label>
                        <input type="text" className="form-control form-control-sm" name="nombre" value={newCategory.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary mt-4">
                            Guardar Categoría
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CategoryList;
