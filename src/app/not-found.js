import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 text-center p-6">
            <h1 className="text-9xl font-black text-slate-400">404</h1>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Page Not Found</h2>
            <p className="text-slate-400 font-medium max-w-md">The page you are looking for does not exist or has been moved.</p>
            <Link href="/" className="btn btn-primary rounded-2xl px-10">Go Back Home</Link>
        </div>
    );
}
