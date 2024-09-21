import './App.css'
import ProductList from "./components/ProductList";

function App() {

    return (
        <>
            <header className="h-16 flex items-center bg-white">
                <div className="container flex items-center justify-between">
                    Logo
                </div>
            </header>

            <main className="container pt-20">
                <div className="flex flex-wrap -mx-6">
                    <aside className="md:w-1/5 px-6">
                        Sidebar
                    </aside>
                    <div className="md:w-4/5 px-6">
                        <ProductList/>
                    </div>
                </div>
            </main>

            <footer className="py-12 mt-auto">
                <div className="container">
                    Footer
                </div>
            </footer>
        </>
    )
}

export default App
