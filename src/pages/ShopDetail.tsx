// import { useParams } from "react-router-dom";
// import { MapPin, Star } from "lucide-react";
// import ProductCard from "@/components/products/ProductCard";

// /* ---------------- SHOP + PRODUCT DATA ---------------- */
// /* Later this will come from backend API */

// import shop1 from "@/assets/images/shops/shop1.jpg";
// import shop2 from "@/assets/images/shops/shop2.jpg";
// import shop3 from "@/assets/images/shops/shop3.jpg";
// import shop4 from "@/assets/images/shops/shop4.jpg";
// import shop5 from "@/assets/images/shops/shop5.jpg";
// import shop6 from "@/assets/images/shops/shop6.jpg";

// import p1 from "@/assets/images/image.jpg";
// import p2 from "@/assets/images/image2.jpg";
// import p3 from "@/assets/images/image2.jpg";
// import p4 from "@/assets/images/image4.jpg";

// const shops = [
//   {
//     shopId: "sri-lakshmi",
//     name: "Sri Lakshmi Stores",
//     location: "Hampankatta, Mangalore",
//     rating: 4.6,
//     image: shop1,
//     products: [
//       { id: 1, name: "Rice 5kg", price: 550, image: p1 },
//       { id: 2, name: "Cooking Oil", price: 320, image: p2 },
//       { id: 3, name: "Sugar 1kg", price: 55, image: p3 },
//       { id: 4, name: "Wheat Flour", price: 240, image: p4 },
//       { id: 5, name: "Tea Powder", price: 180, image: p1 },
//     ],
//   },
//   {
//     shopId: "apollo-pharmacy",
//     name: "Apollo Pharmacy",
//     location: "Bejai, Mangalore",
//     rating: 4.7,
//     image: shop2,
//     products: [
//       { id: 6, name: "Paracetamol", price: 40, image: p2 },
//       { id: 7, name: "Vitamin Tablets", price: 190, image: p3 },
//       { id: 8, name: "Cough Syrup", price: 120, image: p4 },
//       { id: 9, name: "Pain Relief Gel", price: 90, image: p1 },
//       { id: 10, name: "Hand Sanitizer", price: 60, image: p2 },
//     ],
//   },
//   {
//     shopId: "fresh-mart",
//     name: "Fresh Mart",
//     location: "Surathkal",
//     rating: 4.5,
//     image: shop3,
//     products: [
//       { id: 11, name: "Apples", price: 120, image: p1 },
//       { id: 12, name: "Bananas", price: 60, image: p2 },
//       { id: 13, name: "Tomatoes", price: 45, image: p3 },
//       { id: 14, name: "Potatoes", price: 40, image: p4 },
//       { id: 15, name: "Onions", price: 55, image: p1 },
//     ],
//   },
//   {
//     shopId: "daily-needs",
//     name: "Daily Needs",
//     location: "Kankanady",
//     rating: 4.4,
//     image: shop4,
//     products: [
//       { id: 16, name: "Bread Pack", price: 35, image: p2 },
//       { id: 17, name: "Milk Packet", price: 50, image: p3 },
//       { id: 18, name: "Eggs (12)", price: 75, image: p4 },
//       { id: 19, name: "Butter", price: 110, image: p1 },
//       { id: 20, name: "Cheese Slice", price: 95, image: p2 },
//     ],
//   },
//   {
//     shopId: "quick-buy",
//     name: "Quick Buy",
//     location: "Bendoor",
//     rating: 4.6,
//     image: shop5,
//     products: [
//       { id: 21, name: "Chips Pack", price: 30, image: p3 },
//       { id: 22, name: "Soft Drink", price: 40, image: p4 },
//       { id: 23, name: "Chocolate", price: 55, image: p1 },
//       { id: 24, name: "Cookies", price: 65, image: p2 },
//       { id: 25, name: "Energy Drink", price: 90, image: p3 },
//     ],
//   },
//    {
//     shopId: "Super Market",
//     name: "Quick Buy",
//     location: "Balmata",
//     rating: 5.0,
//     image: shop6,
//     products: [
//       { id: 26, name: "Chips Pack", price: 30, image: p3 },
//       { id: 27, name: "Soft Drink", price: 40, image: p4 },
//       { id: 28, name: "Chocolate", price: 55, image: p1 },
//       { id: 29, name: "Cookies", price: 65, image: p2 },
//       { id: 30, name: "Energy Drink", price: 90, image: p3 },
//     ],
//   },
// ];

// /* ---------------- COMPONENT ---------------- */

// const ShopDetail = () => {
//   const { id } = useParams();

//   const shop = shops.find((s) => s.shopId === id);

//   if (!shop) {
//     return (
//       <div className="py-20 text-center text-gray-500">
//         Shop not found
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 bg-white">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* -------- Shop Header -------- */}
//         <div className="flex flex-col sm:flex-row gap-6 mb-10">

//           <img
//             src={shop.image}
//             alt={shop.name}
//             className="w-full sm:w-60 h-48 object-cover rounded-xl"
//           />

//           <div>
//             <h1 className="text-3xl font-bold mb-1">
//               {shop.name}
//             </h1>

//             <div className="flex items-center text-sm text-gray-500 mb-2">
//               <MapPin className="w-4 h-4 mr-1" />
//               {shop.location}
//             </div>

//             <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm w-fit">
//               <Star className="w-4 h-4 fill-green-600" />
//               {shop.rating}
//             </div>
//           </div>
//         </div>

//         {/* -------- Products -------- */}
//         <h2 className="text-xl font-semibold mb-6">
//           Products Available
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8">
//           {shop.products.map((product) => (
//             <ProductCard
//   id={product.id}       // ✅ ADD THIS
//   name={product.name}
//   price={product.price}
//   image={product.image}
// />

//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ShopDetail;
