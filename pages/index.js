import { getProducts } from '../lib/shopify';

export default function Home({ products }) {
  return (
    <div className="bg-white min-h-screen font-sans">
      <nav className="bg-[#002366] p-4 text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="monATELIER Logo" className="h-10 w-auto invert" />
            <span className="text-2xl font-black tracking-tighter uppercase">monATELIER</span>
          </div>
          <div className="flex items-center space-x-5">
             <button className="border border-white px-4 py-1 rounded-full text-xs font-bold hover:bg-white hover:text-[#002366] transition">
               OTP LOGIN
             </button>
             <span>🛒 (0)</span>
          </div>
        </div>
      </nav>

      <header className="relative h-[50vh] flex items-center justify-center bg-slate-900">
        <div className="relative text-center text-white px-4">
          <h2 className="text-6xl font-black mb-4">monATELIER</h2>
          <p className="text-xl font-light tracking-widest uppercase">Premium Global Dropshipping</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products?.map(({ node }) => (
            <div key={node.id} className="group cursor-pointer border p-4 rounded-lg">
              <img src={node.images.edges[0].node.url} className="w-full aspect-square object-cover rounded-md" />
              <h4 className="mt-4 font-bold text-gray-900">{node.title}</h4>
              <p className="text-gray-500 mt-1">${node.priceRange.minVariantPrice.amount}</p>
              <button className="mt-4 w-full bg-[#002366] text-white py-2 text-xs font-bold uppercase rounded">Buy Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getProducts();
  return { props: { products: res.data.products.edges || [] } };
}
