import React, { useState, useCallback } from 'react';
import { Product } from '../../../MainContainerData';
import style from './Admin.module.css';
import ProductForm from './product_form/ProductForm';
import ProductTable from './product_table/ProductTable';
import { Button } from 'react-bootstrap';
import useElementaryAnimation from '../../../../hooks/useElementaryAnimation';

const Admin: React.FC = () => {
    const [form, setForm] = useState<Product>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        quantity: 0,
        brand: { id: 1, title: '' },
        productType: { id: 1, title: '' },
        image: '',
        productionYear: 0
    });
    const [reload, setReload] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    useElementaryAnimation();

    const fetchProducts = useCallback(() => {
        setReload((prevState) => !prevState);
    }, []);

    const handleEdit = useCallback((product: Product) => {
        setForm(product);
        setSelectedProduct(product);
    }, []);

    const handleResetForm = useCallback(() => {
        setForm({
            id: 0,
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            brand: { id: 1, title: '' },
            productType: { id: 1, title: '' },
            image: '',
            productionYear: 0
        });
    }, []);

    const handleEditClick = useCallback(() => {
        if (selectedProduct) {
            handleEdit(selectedProduct);
        }
    }, [selectedProduct, handleEdit]);

    const handleSelectProduct = useCallback((productId: number) => {
        // Ensure the selected product is set in the state
        const product = selectedProduct; // You may need to update this logic to fetch the correct product
        if (product && product.id === productId) {
            setSelectedProduct(product);
        }
    }, [selectedProduct]);

    return (
        <main className={style.panel}>
            <ProductForm
                form={form}
                handleResetForm={handleResetForm}
                fetchProducts={fetchProducts}
                handleSelectProduct={handleSelectProduct} // Pass the callback to ProductForm
            />
            <div className={`${style.product_table} animated_content`} data-animation="elementScaleIn">
                <div className={`${style.heading} u-l1`}>Admin Panel</div>
                <div className={style.button_container}>
                    <Button onClick={handleResetForm} className={`button_complementary u-pb1`}>
                        Add New
                    </Button>
                    <Button onClick={handleEditClick} className={`button_complementary u-pb1`}>
                        Edit Selected
                    </Button>
                </div>
                <ProductTable handleEdit={handleEdit} reload={reload} />
            </div>
        </main>
    );
};

export default Admin;