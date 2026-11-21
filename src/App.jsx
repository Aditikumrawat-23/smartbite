import { useState } from "react";
import {
  Home, Search, Gift, User, Wallet, MapPin, Sparkles,
  ChevronLeft, ChevronRight, ChevronDown, Clock, Heart, CheckCircle,
  IndianRupee, TrendingDown, Utensils, Tag
} from "lucide-react";

const foods = [
  {
    id: 1, name: "Paneer Rice Bowl", restaurant: "Campus Kitchen",
    price: 119, rating: "4.5", time: "20 min", category: "Veg", bestseller: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
description: "A delicious rice bowl tossed with soft paneer cubes, fresh vegetables and aromatic Indian spices, finished with a hint of lemon.",
  },
  {
    id: 2, name: "Masala Dosa", restaurant: "South Spice",
    price: 89, rating: "4.4", time: "25 min", category: "Veg",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600",
    description: "Crispy golden dosa served with flavourful potato masala, coconut chutney and warm sambar.",
  },
  {
    id: 3, name: "Veg Fried Rice", restaurant: "Wok Express",
    price: 149, rating: "4.3", time: "30 min", category: "Veg",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600",
    description: "Flavourful fried rice tossed with fresh vegetables, spring onions and aromatic seasonings.",
  },
  {
    id: 4, name: "Chicken Biryani", restaurant: "Biryani House",
    price: 179, rating: "4.6", time: "30 min", category: "Non-Veg",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    description: "Fragrant basmati rice layered with juicy chicken, traditional biryani spices and fresh herbs.",
  },
{
  id: 5,
  name: "Chole Bhature Combo",
  restaurant: "Punjabi Tadka",
  price: 269,
  rating: "4.7",
  time: "25 min",
  category: "Veg",
  bestseller: true,
  description: "Fluffy, golden bhature served with spicy and flavourful chickpea curry, fresh onion slices and tangy pickle. A filling North Indian favourite.",
  image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600"
},
{
  id: 6,
  name: "Cheese Grilled Sandwich Combo",
  restaurant: "Cafe Junction",
  price: 279,
  rating: "4.5",
  time: "20 min",
  category: "Veg",
  bestseller: true,
  description: "Crispy golden bread stuffed with melted cheese, crunchy capsicum, onions and fresh vegetables, grilled to perfection and served with a tasty dip.",
  image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600"
},
{
  id: 7,
  name: "Chicken Shawarma Roll",
  restaurant: "Rolls & More",
  price: 299,
  rating: "4.8",
  time: "25 min",
  category: "Non-Veg",
  bestseller: true,
  description: "Juicy, well-seasoned chicken wrapped in soft flatbread with crunchy vegetables, creamy garlic sauce and a delicious blend of spices.",
  image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600"
},
{
  id: 8,
  name: "Chicken Momos Platter",
  restaurant: "Momo Street",
  price: 289,
  rating: "4.6",
  time: "25 min",
  category: "Non-Veg",
  bestseller: false,
  description: "A platter of soft steamed dumplings filled with juicy, seasoned chicken, served hot with spicy red chutney for a delicious snack or meal.",
  image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600"
}
];


const offers = [
  { id: 1, code: "STUDENT10", title: "Student special", detail: "10% off, up to ₹20", discount: 20 },
  { id: 2, code: "SAVE15", title: "Extra savings", detail: "Flat ₹15 off", discount: 15 }
];

function App() {
  const [screen, setScreen] = useState("Home");
  const [budget, setBudget] = useState(150);
  const [expandedFoodId, setExpandedFoodId] = useState(null);
  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [totalSaved, setTotalSaved] = useState(0);
  const [orders, setOrders] = useState(0);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [notice, setNotice] = useState("");
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  const filteredFoods = foods.filter(food =>
  (category === "All" || food.category === category) &&
  (food.name.toLowerCase().includes(search.toLowerCase()) ||
   food.restaurant.toLowerCase().includes(search.toLowerCase()))
);


const budgetFoods = foods.filter(
  food => food.price <= budget
);

const lowestPricedFood = budgetFoods.length > 0
  ? [...budgetFoods].sort((a, b) => a.price - b.price)[0]
  : null;


  const deliveryFee = 25;
  const platformFee = 5;
  const discount = appliedOffer ? appliedOffer.discount : 0;
  const finalPrice = Math.max(
    0, selectedFood.price + deliveryFee + platformFee - discount
  );

  function openComparison(food) {
    setSelectedFood(food);
    setAppliedOffer(null);
    setNotice("");
    setScreen("Price Comparison");
  }

  

function recordOrder() {
  if (finalPrice > budget) {
    setNotice("This order exceeds your selected budget. Try another meal.");
    return;
  }

  const orderDetails = {
    id: Date.now(),
    name: selectedFood.name,
    restaurant: selectedFood.restaurant,
    image: selectedFood.image,
    mealPrice: selectedFood.price,
    deliveryFee: deliveryFee,
    platformFee: platformFee,
    discount: discount,
    finalPrice: finalPrice,
    offerCode: appliedOffer?.code || "No offer applied",
    savedAt: new Date().toLocaleString()
  };

  // Update savings and order count
  setTotalSaved(prev => prev + discount);
  setOrders(prev => prev + 1);

  // Save every order
  setOrderHistory(prev => [orderDetails, ...prev]);

  // Save latest order
  setLastOrder(orderDetails);

  setNotice("Demo order recorded successfully!");
}

  function goTo(name) {
    setNotice("");
    setScreen(name);
  }

  const buttonStyle = "rounded-full bg-[#FC8019] px-5 py-3 text-sm font-bold text-white";
  const outlineStyle = "rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold";

  function Header({ title, back = true }) {
    return (
      <header className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        {back && (
          <button onClick={() => goTo("Home")} className="rounded-full bg-gray-100 p-2">
            <ChevronLeft size={19} />
          </button>
        )}
        <h1 className="text-lg font-extrabold">{title}</h1>
      </header>
    );
  }

  
function FoodCard({ food }) {
  const isExpanded = expandedFoodId === food.id;

  return (
    <div className="group self-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Interactive food image */}
      <button
        type="button"
        onClick={() =>
          setExpandedFoodId(isExpanded ? null : food.id)
        }
        aria-expanded={isExpanded}
        className="relative block h-36 w-full overflow-hidden text-left"
      >
        <img
          src={food.image}
          alt={food.name}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            isExpanded ? "scale-110" : ""
          }`}
        />
        {food.bestseller && (
  <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
    ★ BESTSELLER
  </span>
)}
      </button> 

      {/* Food details */}
      <div className="p-3">
        <div className="flex justify-between gap-1">
          <span className="text-sm font-bold">
            {food.name}
          </span>
          <span className="shrink-0 text-xs text-green-600">
            ★ {food.rating}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          {food.restaurant}
        </p>

        <div
  className={`overflow-hidden transition-all duration-300 ${
    isExpanded
      ? "mt-2 max-h-32 opacity-100"
      : "mt-0 max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-32 group-hover:opacity-100"
  }`}
>
  <p className="text-xs leading-relaxed text-gray-600">
    {food.description}
  </p>
</div>

        <div className="mt-3 flex items-center justify-between">
          <b className="text-[#FC8019]">
            ₹{food.price}
          </b>

          <button
            onClick={() => openComparison(food)}
            className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-[#FC8019]"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

  function HomeScreen() {
    return (
      <>
        <header className="flex items-center justify-between px-5 py-5">
          <div>
            <h1 className="text-2xl font-extrabold text-[#FC8019]">SmartBite ✨</h1>
            <p className="mt-1 text-xs text-gray-500">Student-friendly food discovery</p>
          </div>
          <button
  onClick={() => goTo("Savings Dashboard")}
  className="h-12 w-12 rounded-full border-2 border-gray-900 flex items-center justify-center text-xl font-bold text-gray-900"
>
  S
</button>
        </header>

        <section className="px-5 pt-2">
          <p className="text-2xl text-gray-500 font-medium">
  Hello, Sameer! 👋
</p>
          <h2 className="mt-1 text-2xl font-extrabold">Hungry? Let's eat smart.</h2>
          <p className="mt-2 text-sm text-gray-500">Delicious meals that respect your budget.</p>
        </section>

        <section className="mx-5 mt-6 rounded-2xl bg-gradient-to-br from-[#FC8019] to-[#FF9F43] p-5 text-white">
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-sm"><Wallet size={18}/> Your food budget</span>
            <span className="text-xs">Per order</span>
          </div>
          <p className="mt-4 text-sm">Find meals under</p>
          <h2 className="text-4xl font-extrabold">₹{budget}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {[100,150,200,250].map(amount => (
              <button key={amount} onClick={() => setBudget(amount)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${budget === amount ? "bg-white text-[#FC8019]" : "border border-white/60"}`}>
                ₹{amount}
              </button>
            ))}
          </div>
          <button onClick={() => goTo("Set Your Budget")}
            className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#FC8019]">
            Customize budget <ChevronRight size={15} className="inline"/>
          </button>
        </section>

        <section className="px-5 pt-7 pb-28">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Affordable meals</h2>
              <p className="mt-1 text-xs text-gray-500">Options within your budget</p>
            </div>
            <button onClick={() => goTo("Food Discovery")} className="text-sm font-bold text-[#FC8019]">
              See all
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
           {filteredFoods
  .filter(food => food.price <= budget)
  .slice(0, 4)
  .map(food => <FoodCard key={food.id} food={food}/>)}
          </div>
          <button onClick={() => goTo("Smart Savings")}
            className="mt-6 w-full rounded-2xl border border-orange-100 bg-orange-50 p-4 text-left">
            <span className="flex items-center gap-2 font-bold"><Gift size={20} className="text-[#FC8019]"/> Student Rewards</span>
            <p className="mt-2 text-sm text-gray-600">Discover relevant student offers and save more.</p>
            <span className="mt-2 inline-block text-sm font-bold text-[#FC8019]">Explore offers →</span>
          </button>

{/* SmartBite Budget Insights */}
<div className="mt-5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">

  <div className="flex items-center justify-between">
    <h3 className="font-bold text-gray-900">
      SmartBite Budget Insights
    </h3>
    <Sparkles className="text-[#FC8019]" size={20}/>
  </div>

  <div className="mt-4 rounded-xl bg-gray-50 p-4">

    <p className="text-xs text-gray-500">
      Your selected budget
    </p>

    <h2 className="mt-1 text-3xl font-extrabold text-[#FC8019]">
      ₹{budget}
    </h2>

    <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">

      <div>
        <h3 className="text-2xl font-bold">
          {budgetFoods.length}
        </h3>
        <p className="text-xs text-gray-500">
          Meals within budget
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-600">
          {lowestPricedFood
            ? `₹${lowestPricedFood.price}`
            : "—"}
        </h3>
        <p className="text-xs text-gray-500">
          Lowest meal price
        </p>
      </div>

    </div>
  </div>

  <div className="mt-3 rounded-xl bg-orange-50 p-3">

    <div className="flex items-center gap-2">
      <Sparkles size={17} className="text-[#FC8019]"/>
      <h4 className="text-sm font-bold text-gray-900">
        SmartBite Tip
      </h4>
    </div>

    <p className="mt-2 text-xs leading-relaxed text-gray-600">
      {lowestPricedFood
        ? `${lowestPricedFood.name} is your lowest-priced option at ₹${lowestPricedFood.price}. Compare final payable prices before ordering to make the most of your budget!`
        : "Try increasing your budget to discover more affordable meals."}
    </p>

  </div>
</div>

        </section>
      </>
    );
  }

  function BudgetScreen() {
    return (
      <>
        <Header title="Set Your Budget"/>
        <section className="p-5">
          <h2 className="text-2xl font-extrabold">How much do you want to spend?</h2>
          <p className="mt-2 text-sm text-gray-500">Choose an amount for your food order.</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {[100,150,200,250].map(amount => (
              <button key={amount} onClick={() => setBudget(amount)}
                className={`rounded-2xl border-2 p-6 text-2xl font-extrabold ${budget === amount ? "border-[#FC8019] bg-orange-50 text-[#FC8019]" : "border-gray-100"}`}>
                ₹{amount}
                <p className="mt-1 text-xs font-normal">Per order</p>
              </button>
            ))}
          </div>
          <label className="mt-8 block text-sm font-bold">Your selected budget</label>
          <p className="mt-2 text-3xl font-extrabold text-[#FC8019]">₹{budget}</p>
          <button onClick={() => goTo("Food Discovery")} className={`${buttonStyle} mt-7 w-full`}>
            Find meals within my budget →
          </button>
        </section>
      </>
    );
  }

  function DiscoveryScreen() {
    return (
      <>
        <Header title="Food Discovery"/>
        <section className="p-5 pb-28">
          <div className="rounded-xl border bg-gray-50 px-4 py-3">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search meals or restaurants" className="w-full bg-transparent text-sm outline-none"/>
          </div>
          <div className="mt-4 flex gap-2">
            {["All","Veg","Non-Veg"].map(item => (
              <button key={item} onClick={() => setCategory(item)}
                className={category === item ? buttonStyle : outlineStyle}>{item}</button>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h2 className="font-bold">Meals under ₹{budget}</h2>
            <span className="text-xs text-gray-500">{filteredFoods.length} found</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {filteredFoods.map(food => <FoodCard key={food.id} food={food}/>)}
          </div>
          {filteredFoods.length === 0 && (
            <p className="mt-8 text-center text-sm text-gray-500">No meals match these filters. Try another budget.</p>
          )}
        </section>
      </>
    );
  }

  function ComparisonScreen() {
    return (
      <>
        <Header title="Price Comparison"/>
        <section className="p-5 pb-28">
          <img src={selectedFood.image} alt={selectedFood.name}
            className="h-44 w-full rounded-2xl object-cover"/>
          <h2 className="mt-4 text-xl font-extrabold">{selectedFood.name}</h2>
          <p className="text-sm text-gray-500">{selectedFood.restaurant} · Sample listing</p>

          <div className="mt-6 rounded-2xl border p-4">
            <h3 className="font-bold">Estimated price breakdown</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span>Food price</span><b>₹{selectedFood.price}</b></div>
              <div className="flex justify-between"><span>Delivery fee (sample)</span><b>₹{deliveryFee}</b></div>
              <div className="flex justify-between"><span>Platform fee (sample)</span><b>₹{platformFee}</b></div>
              <div className="flex justify-between text-green-600"><span>Student offer discount</span><b>-₹{discount}</b></div>
              <div className="border-t pt-3 flex justify-between text-lg font-extrabold">
                <span>Estimated total</span><span className="text-[#FC8019]">₹{finalPrice}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">Illustrative charges only. Actual checkout prices may differ.</p>
          </div>

          <button onClick={() => goTo("Smart Savings")}
            className={`${outlineStyle} mt-5 w-full border-orange-200 text-[#FC8019]`}>
            Find student offers
          </button>
          {notice && <p className="mt-4 rounded-xl bg-orange-50 p-3 text-sm">{notice}</p>}
          <button onClick={recordOrder} className={`${buttonStyle} mt-4 w-full`}>
            Record demo order
          </button>
        </section>
      </>
    );
  }

  function RewardsScreen() {
    return (
      <>
        <Header title="Smart Savings"/>
        <section className="p-5 pb-28">

{/* Smart Savings Summary */}
<div className="mt-5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-gray-900">Your Smart Savings</h3>
    <Sparkles size={20} className="text-[#FC8019]" />
  </div>

  <p className="mt-3 text-3xl font-extrabold text-[#FC8019]">
    ₹35
  </p>
  <p className="text-xs text-gray-500">
    Total potential discount value across available offers
  </p>

  <div className="mt-4 grid grid-cols-2 gap-3">
    <div className="rounded-xl bg-orange-50 p-3">
      <p className="text-xl font-bold text-gray-900">2</p>
      <p className="text-xs text-gray-500">Available offers</p>
    </div>

    <div className="rounded-xl bg-orange-50 p-3">
      <p className="text-xl font-bold text-gray-900">₹20</p>
      <p className="text-xs text-gray-500">Best single offer</p>
    </div>
  </div>
</div>

{/* Smart Savings Recommendation */}
<div className="mt-5 rounded-2xl border border-orange-200 bg-orange-50 p-4">
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-gray-900">
      SmartBite Recommendation
    </h3>
    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
      BEST MATCH
    </span>
  </div>

  <p className="mt-3 text-3xl font-extrabold text-[#FC8019]">
    Save ₹20
  </p>

  <p className="mt-1 text-sm font-semibold text-gray-800">
    Student Special
  </p>

  <p className="mt-2 text-xs leading-relaxed text-gray-600">
    This offer gives you the highest discount among your available student offers.
    Make your next meal more affordable with this student-exclusive deal.
  </p>

  <div className="mt-3 flex items-center justify-between">
    <code className="rounded-lg bg-white px-3 py-2 text-sm font-bold">
      STUDENT10
    </code>

    <button
      onClick={() => {
        setAppliedOffer(offers[0]);
        setScreen("Price Comparison");
      }}
      className={buttonStyle}
    >
      Apply offer
    </button>
  </div>
</div>

          <h3 className="mt-7 font-bold">Available sample offers</h3>
          <div className="mt-4 space-y-3">
            {offers.map(offer => (
              <div key={offer.id} className="rounded-2xl border p-4">
                <div className="flex items-center justify-between">
                  <Tag className="text-[#FC8019]"/>
                  <span className="text-xs font-bold text-green-600">SAMPLE OFFER</span>
                </div>
                <h4 className="mt-3 font-bold">{offer.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{offer.detail}</p>
                <div className="mt-3 flex items-center justify-between">
                  <code className="rounded bg-gray-100 px-3 py-2">{offer.code}</code>
                  <button onClick={() => {setAppliedOffer(offer); setScreen("Price Comparison");}}
                    className={buttonStyle}>Apply offer</button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-400">These are fictional prototype offers, not verified live Swiggy coupons.</p>

  
{/* Order Savings Breakdown */}
<div className="mt-6 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">

  {/* Clickable Dropdown Header */}
  <button
    type="button"
    onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
    className="flex w-full items-center justify-between text-left"
  >
    <div>
      <h3 className="font-bold text-gray-900">
        Order Savings Breakdown
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        Estimated cost for your selected meal
      </p>
    </div>

    <ChevronDown
      size={22}
      className={`text-[#FC8019] transition-transform duration-300 ${
        isBreakdownOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Expandable Payment Details */}
  {isBreakdownOpen && (
    <>
      <div className="mt-4 rounded-xl bg-orange-50 p-3">
        <p className="text-sm font-bold text-gray-900">
          {selectedFood.name}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {selectedFood.restaurant}
        </p>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Meal price</span>
          <span className="font-semibold">
            ₹{selectedFood.price}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery fee</span>
          <span className="font-semibold">
            ₹{deliveryFee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Platform fee</span>
          <span className="font-semibold">
            ₹{platformFee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-green-600">Offer discount</span>
          <span className="font-semibold text-green-600">
            -₹{discount}
          </span>
        </div>
      </div>
    </>
  )}

  {/* Always Visible Final Cost */}
  <div className="mt-4 border-t border-dashed pt-4">
    <div className="flex items-center justify-between">
      <span className="font-bold text-gray-900">
        Final estimated cost
      </span>

      <span className="text-2xl font-extrabold text-[#FC8019]">
        ₹{finalPrice}
      </span>
    </div>
  </div>

  <button
    onClick={() => setScreen("Price Comparison")}
    className={`${buttonStyle} mt-4 w-full`}
  >
    See final estimated cost →
  </button>

</div>



{/* How SmartBite Saves */}
<div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
  <h3 className="font-bold text-gray-900">
    How SmartBite Saves
  </h3>

  <p className="mt-1 text-xs text-gray-600">
    Small smart choices can make student food budgets go further.
  </p>

  <div className="mt-4 space-y-4">

    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#FC8019] font-bold">
        1
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">
          Budget-based discovery
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          Discover meals that match your personal food budget.
        </p>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#FC8019] font-bold">
        2
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">
          Smart student offers
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          Find relevant student discounts and save on eligible orders.
        </p>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#FC8019] font-bold">
        3
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">
          Price comparison
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          Understand your estimated final order cost before deciding.
        </p>
      </div>
    </div>

  </div>
</div>

        </section>
      </>
    );
  }

  function SavingsScreen() {
    return (
      <>
        <Header title="Savings Dashboard"/>
        <section className="p-5 pb-28">
          <div className="rounded-2xl bg-gradient-to-br from-[#FC8019] to-[#FF9F43] p-6 text-white">
            <TrendingDown size={30}/>
            <p className="mt-4 text-sm text-white/80">Total savings in this demo</p>
            <h2 className="mt-1 text-4xl font-extrabold">₹{totalSaved}</h2>
            <p className="mt-3 text-sm text-white/90">From {orders} recorded demo orders</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border p-4">
              <IndianRupee className="text-[#FC8019]"/>
              <p className="mt-3 text-xs text-gray-500">Orders recorded</p>
              <h3 className="text-2xl font-bold">{orders}</h3>
            </div>
            <div className="rounded-2xl border p-4">
              <Wallet className="text-[#FC8019]"/>
              <p className="mt-3 text-xs text-gray-500">Selected budget</p>
              <h3 className="text-2xl font-bold">₹{budget}</h3>
            </div>
          </div>


{/* Complete Order History */}
<div className="mt-6">
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-gray-900">
      Your Order History
    </h3>

    <span className="text-xs text-gray-500">
      {orderHistory.length} orders
    </span>
  </div>

  {orderHistory.length === 0 ? (
    <div className="mt-3 rounded-2xl border border-dashed p-5 text-center">
      <Wallet size={30} className="mx-auto text-[#FC8019]" />

      <p className="mt-3 font-bold">
        No orders recorded yet
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Your recorded meals will appear here.
      </p>
    </div>
  ) : (
    <div className="mt-3 space-y-4">
      {orderHistory.map(order => (
        <div
          key={order.id}
          className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
        >
          
{/* Meal Information - Clickable Dropdown */}
<button
  type="button"
  onClick={() =>
    setExpandedOrderId(
      expandedOrderId === order.id ? null : order.id
    )
  }
  className="flex w-full items-center gap-3 p-4 text-left"
>
  <img
    src={order.image}
    alt={order.name}
    className="h-20 w-20 rounded-xl object-cover"
  />

  <div className="flex-1 min-w-0">
    <h4 className="font-bold text-gray-900">
      {order.name}
    </h4>

    <p className="mt-1 text-xs text-gray-500">
      {order.restaurant}
    </p>

    <p className="mt-2 text-lg font-extrabold text-[#FC8019]">
      ₹{order.mealPrice}
    </p>

    <span className="text-xs font-semibold text-green-600">
      Order recorded
    </span>
  </div>

  <ChevronDown
    size={20}
    className={`shrink-0 text-gray-500 transition-transform duration-200 ${
      expandedOrderId === order.id ? "rotate-180" : ""
    }`}
  />
</button>


          {/* Cost breakdown - Expandable */}
{expandedOrderId === order.id && (
  <div className="border-t p-4">
            <h4 className="font-bold text-gray-900">
              Final Cost Check
            </h4>

            <div className="mt-3 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Meal price</span>
                <span>₹{order.mealPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Platform fee</span>
                <span>₹{order.platformFee}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Applied offer</span>
                <span className="font-semibold">
                  {order.offerCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-green-600">Discount saved</span>
                <span className="font-bold text-green-600">
                  -₹{order.discount}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-dashed pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">
                  Final estimated cost
                </span>

                <span className="text-2xl font-extrabold text-[#FC8019]">
                  ₹{order.finalPrice}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Recorded on: {order.savedAt}
            </p>
                    </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>


          
{/* Improved Savings Journey */}
<div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
  <div className="flex items-center gap-2">
    <CheckCircle size={20} className="text-green-600" />
    <h3 className="font-bold text-gray-900">
      Your Savings Journey
    </h3>
  </div>

  {orders === 0 ? (
    <p className="mt-3 text-sm text-gray-600">
      Start exploring affordable meals and record your first
      order to track your savings!
    </p>
  ) : (
    <>
      <p className="mt-4 text-sm text-gray-600">
        You've successfully saved
      </p>

      <h2 className="mt-1 text-3xl font-extrabold text-green-600">
        ₹{totalSaved}
      </h2>

      <p className="mt-2 text-sm text-gray-700">
        Across {orders} {orders === 1 ? "order" : "orders"}.
        Keep making smart food choices!
      </p>

      <div className="mt-4 rounded-xl bg-white p-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total orders</span>
          <span className="font-bold">{orders}</span>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span className="text-gray-500">
            Total discounts earned
          </span>
          <span className="font-bold text-green-600">
            ₹{totalSaved}
          </span>
        </div>
      </div>
    </>
  )}
</div>

          <button onClick={() => goTo("Food Discovery")} className={`${buttonStyle} mt-5 w-full`}>
            Discover more meals
          </button>
        </section>
      </>
    );
  }

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Food Discovery", label: "Discover", icon: Search },
    { name: "Smart Savings", label: "Rewards", icon: Gift },
    { name: "Savings Dashboard", label: "Savings", icon: Wallet }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-gray-900">
      <main className="mx-auto min-h-screen max-w-[480px] bg-white shadow-xl">
        {screen === "Home" && <HomeScreen/>}
        {screen === "Set Your Budget" && <BudgetScreen/>}
        {screen === "Food Discovery" && <DiscoveryScreen/>}
        {screen === "Price Comparison" && <ComparisonScreen/>}
        {screen === "Smart Savings" && <RewardsScreen/>}
        {screen === "Savings Dashboard" && <SavingsScreen/>}

        {notice && screen === "Price Comparison" && (
          <div className="fixed bottom-20 left-1/2 z-20 w-[90%] max-w-[430px] -translate-x-1/2 rounded-xl bg-gray-900 p-3 text-sm text-white">
            {notice}
            {notice.includes("successfully") && (
              <button onClick={() => goTo("Savings Dashboard")} className="ml-2 font-bold text-orange-300">View savings</button>
            )}
          </div>
        )}

        <nav className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[480px] -translate-x-1/2 justify-around border-t border-gray-100 bg-white px-1 py-3 shadow-lg">
          {navItems.map(({name,label,icon:Icon}) => (
            <button key={name} onClick={() => goTo(name)}
              className={`flex flex-col items-center gap-1 text-[11px] ${screen === name ? "font-bold text-[#FC8019]" : "text-gray-400"}`}>
              <Icon size={21}/>
              {label || name}
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default App;
