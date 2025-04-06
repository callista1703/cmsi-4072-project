import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import HomeImage from "@/assets/HomeImage.png";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="w-full bg-[#f9f8f3] text-black font-sans">
      {/* Sticky Nav */}
      <header className="fixed top-0 w-full z-50 bg-[#f9f8f3] shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">Async</h1>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="rounded-full px-6 py-2 text-sm font-semibold border border-black hover:bg-black hover:text-white transition-all duration-300">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="default" className="rounded-full px-6 py-2 text-sm font-semibold hover:scale-105 transition-transform">
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 flex flex-col items-center justify-center text-center px-6 bg-[#f9f8f3]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-10"
        >
          <h2 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Empower Your Future,
          </h2>
          <h2 className="text-5xl sm:text-6xl font-light italic mt-2 text-gray-700">
            Learn Smart, Live Smart.
          </h2>
          <p className="mt-6 text-lg text-gray-800">
            At Async, we transform the way you learn with interactive tools and expert guidance—anytime, anywhere.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mb-16"
        >
          <img src={HomeImage} alt="Async App Preview on iPhones" className="max-w-full h-auto" />
        </motion.div>

        {/* Features */}
        <section className="w-full py-20 bg-[#f9f8f3]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Calendar", desc: "Organize your schedule effortlessly with our interactive calendar." },
                { title: "Discussion Board", desc: "Collaborate in real time—ask questions, share ideas, and build community." },
                { title: "Rich Text Editor", desc: "Create and edit content with ease using our intuitive editor." },
              ].map(({ title, desc }) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 bg-white rounded-xl shadow-md transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-lg text-gray-600">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-20 bg-[#f9f8f3]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">How It Works</h2>
            <div className="space-y-16">
              {[
                { title: "Manage Events", desc: "Use our built-in calendar to schedule and manage your events seamlessly." },
                { title: "Access Courses", desc: "Easily access your courses, check your class schedule, and manage assignments." },
                { title: "Discussion Board", desc: "Engage with peers and instructors in our interactive discussion board." },
              ].map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-lg text-gray-600">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomeComponent;
