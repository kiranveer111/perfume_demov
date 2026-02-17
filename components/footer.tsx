export function Footer() {
    return (
        <footer className="border-t bg-slate-50 py-8 text-slate-600">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} ThePerfumeShop. For automation testing purposes only.</p>
                <p className="mt-2 text-sm">
                    Built with Next.js & Tailwind CSS
                </p>
            </div>
        </footer>
    )
}
