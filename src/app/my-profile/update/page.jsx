import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import UpdateProfileForm from "@/components/ui/UpdateProfileForm";


export default async function UpdateProfilePage() {
    
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session) {
        redirect("/login");
    }
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 bg-slate-50/50">
            <div className="container mx-auto max-w-xl">
                <Link href="/my-profile" className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold text-xs uppercase tracking-widest">
                    <HiOutlineArrowNarrowLeft size={18} /> Back to Profile
                </Link>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">Update <span className="text-primary">Profile</span></h2>
                        <p className="text-sm opacity-50 mt-2">Modify your personal information</p>
                    </div>
                    {/* use client-side form component */}
                    <UpdateProfileForm user={session.user} />
                </div>
            </div>
        </main>
    );
}