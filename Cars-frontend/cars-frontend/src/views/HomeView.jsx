import { Link } from "react-router-dom";
import background from "../assets/carbackground.png";

export default function HomeView() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            <div
                style={{ backgroundImage: `url(${background})` }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed brightness-50 z-0"
            ></div>
            <div className="relative z-10 max-w-4xl mx-auto mt-10 p-6">
                <div className="items-center mb-6">
                    <div className="grid gap-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            <span className="animate-fade-in">Welcome to the Cars webapp</span>
                        </h1>
                        <div className="flex justify-between items-center p-4 max-w-4xl mx-auto mt-10 opacity-0 animate-fade-in-delay">
                            <Link
                                to={`/cars`}
                                className="bg-[#2d4648] hover:bg-[#5b7d7f] text-white px-4 py-2 rounded-lg transition-colors shadow-md animate-bounce">
                                Start uploading cars!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}