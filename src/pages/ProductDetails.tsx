import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Minus,Plus,Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ProductDetails = ()=>{

const {id} = useParams();
const {addToCart} = useCart();

const [product,setProduct] = useState<any>(null);
const [loading,setLoading] = useState(true);

const [qty,setQty] = useState(1);
const [activeImage,setActiveImage] = useState(0);
const [selectedUnit,setSelectedUnit] = useState("");

useEffect(()=>{

const fetchProduct = async()=>{

try{

const res = await axios.get(
`http://localhost:8000/api/v1/products/${id}`
);

setProduct(res.data.data);

}catch(err){

console.log(err);

}

setLoading(false);

};

fetchProduct();

},[id]);

if(loading){
return <div className="p-10 text-center">Loading product...</div>;
}

if(!product){
return <div className="p-10 text-center">Product not found</div>;
}

const handleAddToCart = ()=>{

addToCart({
id:product._id,
name:product.name,
price:product.finalPrice,
image:`http://localhost:8000${product.images?.[0]}`
});

};

return(

<section className="max-w-7xl mx-auto px-4">

<div className="grid lg:grid-cols-3 gap-8">

{/* IMAGE GALLERY */}

<div className="flex gap-4">

<div className="flex flex-col gap-3">

{product.images?.map((img:string,index:number)=>(
<img
key={index}
onClick={()=>setActiveImage(index)}
src={`http://localhost:8000${img}`}
className={`w-16 h-16 object-cover rounded cursor-pointer border
${activeImage===index?"border-black":"border-gray-200"}`}
/>
))}

</div>

<img
src={`http://localhost:8000${product.images?.[activeImage]}`}
className="w-[350px] h-[450px] object-cover rounded"
/>

</div>

{/* PRODUCT INFO */}

<div className="space-y-5">

<h1 className="text-2xl font-bold">
{product.name}
</h1>

<div className="flex items-center gap-2 text-yellow-500">
<Star size={18} fill="currentColor"/>
<span className="text-sm text-gray-700">
4.4 (78 reviews)
</span>
</div>

{/* PRICE */}

<div className="flex items-center gap-3">

<span className="text-2xl font-bold">
₹{product.finalPrice}
</span>

{product.discountValue>0 &&(
<span className="line-through text-gray-400">
₹{product.price}
</span>
)}

</div>

{/* UNITS */}

{product.units?.length>0 &&(

<div>

<p className="font-medium mb-2">
Select Unit
</p>

<div className="flex gap-2">

{product.units.map((u:string)=>(
<button
key={u}
onClick={()=>setSelectedUnit(u)}
className={`border px-3 py-1 rounded-md
${selectedUnit===u?"bg-black text-white":"hover:bg-gray-100"}`}
>
{u}
</button>
))}

</div>

</div>

)}

{/* QTY */}

<div className="flex items-center gap-4">

<span>Quantity</span>

<div className="flex border rounded">

<button
onClick={()=>setQty(Math.max(1,qty-1))}
className="px-3"
>
<Minus size={16}/>
</button>

<span className="px-4">{qty}</span>

<button
onClick={()=>setQty(qty+1)}
className="px-3"
>
<Plus size={16}/>
</button>

</div>

</div>

{/* BUTTONS */}

<div className="flex gap-4">

<Button
onClick={handleAddToCart}
className="flex-1 bg-blue-600 text-white"
>
Add to Cart
</Button>

<Button className="flex-1 bg-orange-500 text-white">
Buy Now
</Button>

</div>

{/* DESCRIPTION */}

<div className="border rounded-xl divide-y">

<details className="p-4">
<summary>Description</summary>
<p className="text-sm mt-2">
{product.description}
</p>
</details>

<details className="p-4">
<summary>Specifications</summary>
<p className="text-sm">
Category: {product.category}
</p>
<p className="text-sm">
Stock: {product.stock}
</p>
</details>

</div>

</div>

{/* RIGHT BOX */}

<div className="bg-white shadow rounded-xl p-6 space-y-6">

<h3 className="font-semibold">
Available Offers
</h3>

<p className="text-sm">
Buy 2 & get 5% extra off
</p>

<Button className="w-full bg-blue-600 text-white">
Go to Cart
</Button>

<Button className="w-full bg-orange-500 text-white">
Buy Now
</Button>

</div>

</div>

</section>

);

};

export default ProductDetails;