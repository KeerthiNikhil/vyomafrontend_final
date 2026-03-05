import ShopCard from "./ShopCard"

import shop1 from "@/assets/images/shops/shop1.jpg"
import shop2 from "@/assets/images/shops/shop2.jpg"
import shop3 from "@/assets/images/shops/shop3.jpg"
import shop4 from "@/assets/images/shops/shop4.jpg"
import shop5 from "@/assets/images/shops/shop5.jpg"

const shops = [
  {
    _id: "1",
    ownerName: "Sri Lakshmi Stores",
    businessType: "General Store",
    address: "Hampankatta, Mangalore",
    phone: "1234567890",
    shopImage: shop1,
  },
  {
    _id: "2",
    ownerName: "Apollo Pharmacy",
    businessType: "Pharmacy",
    address: "Bejai, Mangalore",
    phone: "1234567890",
    shopImage: shop2,
  },
  {
    _id: "3",
    ownerName: "Fresh Mart",
    businessType: "Super Market",
    address: "Surathkal",
    phone: "1234567890",
    shopImage: shop3,
  },
  {
    _id: "4",
    ownerName: "Daily Needs",
    businessType: "Groceries",
    address: "Kankanady",
    phone: "1234567890",
    shopImage: shop4,
  },
  {
    _id: "5",
    ownerName: "Quick Buy",
    businessType: "Retail",
    address: "Bendoor",
    phone: "1234567890",
    shopImage: shop5,
  },
]

const TopShops = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-2xl font-bold mb-6">
          Top Shops
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default TopShops