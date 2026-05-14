import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Add_To_Cart_Model } from "@/component/comman";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

const All_Hotels = ({ initialValues }) => {
        const { isOpen, onOpen, onClose } = useDisclosure();

        const [single_cart_data, setsingle_cart_data] = useState({});

        const open_model = (e, data) => {
            setsingle_cart_data(data);
            onOpen();
            e.preventDefault();
        };

        const close_model = e => {
            onClose();
            e.preventDefault();
            setsingle_cart_data({});
        };

        const generateStarIcons = rating => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
                stars.push( < i key = { i }
                    className = { starClass } > < /i>);
                }
                return stars;
            };

            return ( <
                section className = "" > {
                    initialValues &&
                    initialValues.map((data, index) => {
                        return ( <
                            div className = "container"
                            key = { index } >
                            <
                            div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7" > {
                                data.product &&
                                data.product.map((product_data, index) => {
                                    return ( <
                                        div className = "group relative"
                                        key = { index } >
                                        <
                                        div className = "w-full overflow-hidden rounded-2xl before:pt-[65%] before:block relative group-hover:opacity-75" >
                                        <
                                        Link href = { product_data.slug }
                                        className = "absolute top-0 left-0 h-full w-full" >
                                        <
                                        Image src = { product_data.image }
                                        alt = { product_data.alt }
                                        width = { 361 }
                                        height = { 234 }
                                        className = "h-full w-full object-cover object-center" /
                                        >
                                        <
                                        /Link> <
                                        /div> <
                                        div className = "mt-5" >
                                        <
                                        div class = "flex items-start justify-between mb-4">
                                        <
                                        h3 className = "text-1xl text-dark-700 leading-2xl mb-2 group-hover:text-primary-900" >
                                        <
                                        Link href = { product_data.slug }
                                        className = "hotel-popup-link" > { product_data.title } <
                                        /Link> <
                                        /h3> <
                                        button class = "btn btn-primary rounded-[3px] w-full h-full px-3 py-2"
                                        onClick = { e => open_model(e, product_data) } >
                                        Add to { " " } <
                                        img src = "/assets/images/Cart.svg"
                                        alt = "material-symbols_card-travel"
                                        width = "22"
                                        height = "22"
                                        class = "ml-1" /
                                        >
                                        <
                                        /button> <
                                        /div> <
                                        p className = "text-md mb-2" > { product_data.short_des } <
                                        /p> <
                                        div className = "mt-4 flex justify-between" >
                                        <
                                        div >
                                        <
                                        p className = "text-[12px] flex items-center gap-2 text-dark-800 m-0 leading-md" >
                                        <
                                        span className = "flex items-center gap-1 text-[#FFC738]" > { generateStarIcons(product_data.rating) } <
                                        /span>
                                        ({ product_data.review }
                                            Review) <
                                        /p> <
                                        /div> <
                                        div className = "text-right" >
                                        <
                                        span className = "text-md font-bold text-dark-900 block" >
                                        $ { product_data.price } <
                                        /span> <
                                        /div> <
                                        /div> <
                                        /div> <
                                        /div>
                                    );
                                })
                            } <
                            /div> <
                            div className = "mt-16 mb-10 text-center" >
                            <
                            Link href = { data.btn_slug }
                            className = "btn btn-primary mx-auto flex items-center min-w-[190px]" > { data.btn_label } <
                            span className = "ml-1.5" >
                            <
                            svg className = "mx-auto d-block"
                            width = "22"
                            height = "22"
                            viewBox = "0 0 60 60"
                            fill = "none"
                            xmlns = "http://www.w3.org/2000/svg" >
                            <
                            g id = "loader_68" >
                            <
                            g className = "loader_circle_1"
                            id = "loader_68_3" >
                            <
                            g id = "Group 125" >
                            <
                            circle id = "Ellipse 304"
                            cx = "30"
                            cy = "30"
                            r = "26"
                            fill = "transparent" /
                            >
                            <
                            path id = "Intersect"
                            fillRule = "evenodd"
                            clipRule = "evenodd"
                            d = "M4 30H8C8 17.8497 17.8497 8 30 8C42.1503 8 52 17.8497 52 30H56C56 15.6406 44.3594 4 30 4C15.6406 4 4 15.6406 4 30Z"
                            fill = "currentColor" /
                            >
                            <
                            /g> <
                            /g> <
                            g className = "loader_circle_2"
                            id = "loader_68_2" >
                            <
                            g id = "Group 122" >
                            <
                            circle id = "Ellipse 302"
                            cx = "30"
                            cy = "30"
                            r = "28"
                            fill = "transparent" /
                            >
                            <
                            path id = "Intersect_2"
                            fillRule = "evenodd"
                            clipRule = "evenodd"
                            d = "M10.2009 10.201L15.8578 15.8579C19.4771 12.2386 24.4771 10 29.9999 10C41.0456 10 49.9999 18.9543 49.9999 30H57.9999C57.9999 14.536 45.4639 2 29.9999 2C22.2679 2 15.2679 5.13401 10.2009 10.201Z"
                            fill = "currentColor" /
                            >
                            <
                            /g> <
                            /g> <
                            g className = "loader_circle_3"
                            id = "loader_68_1" >
                            <
                            circle id = "Ellipse 301"
                            cx = "30"
                            cy = "30"
                            r = "30"
                            fill = "transparent" /
                            >
                            <
                            path id = "Intersect_3"
                            fillRule = "evenodd"
                            clipRule = "evenodd"
                            d = "M60 30H48C48 20.0589 39.9411 12 30 12V0C46.5685 0 60 13.4315 60 30Z"
                            fill = "currentColor" /
                            >
                            <
                            /g> <
                            /g> <
                            /svg> <
                            /span> <
                            /Link> <
                            /div> <
                            /div>
                        );
                    })
                }

                <
                Modal classNames = "bg-gray-900"
                isOpen = { isOpen }
                onClose = { onClose }
                size = "3xl" >
                <
                ModalContent className = "pt-0 pb-0" >
                <
                div className = "bg-white rounded-1xl relative overflow-hidden" >
                <
                div className = "bg-primary-800 border-b border-[#C6BCDA] py-2 px-5 flex items-center justify-between" >
                <
                h2 className = "text-xl font-bold m-0" > Add to cart < /h2> <
                button className = "mfp-close xl:text-3xl xl:leading-5"
                title = "Close (Esc)"
                onClick = { e => close_model(e) }
                type = "button" > ×
                <
                /button> <
                /div>

                <
                Add_To_Cart_Model Data = { single_cart_data }
                /> <
                /div> { /* </div> */ } <
                /ModalContent> <
                /Modal> <
                /section>
            );
        };

        export default All_Hotels;