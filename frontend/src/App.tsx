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
                <ProductList/>
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
