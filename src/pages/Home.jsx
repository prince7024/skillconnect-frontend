import React from "react";
import { Link } from "react-router-dom";
import { Search, Star, ShieldCheck, Users, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen relative">

      {/* Hero Section */}
      <section className="relative text-center mt-12 px-4 py-24 bg-gradient-to-r from-black via-gray-900 to-black scroll-mt-28 flex flex-col items-center">
        
        {/* Floating Animation */}
        <motion.div
          className="absolute top-10 md:top-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-500 opacity-40 filter blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-10 md:bottom-20 w-24 h-24 md:w-36 md:h-36 rounded-full bg-purple-500 opacity-30 filter blur-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        />

        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Welcome to <span className="text-blue-500">SkillConnect</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mt-3 text-lg text-gray-300 max-w-2xl"
        >
          Find trusted local providers or showcase your skills to the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mt-8 flex justify-center gap-4 flex-wrap"
        >
          <Link
            to="/services"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:bg-blue-700 transition-transform duration-300"
          >
            Browse Services
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-gray-800 text-gray-200 font-semibold rounded-2xl shadow-lg hover:scale-105 hover:bg-gray-700 transition-transform duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:bg-green-700 transition-transform duration-300"
          >
            Register
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="HowItWorks" className="mt-20 px-6 max-w-6xl mx-auto scroll-mt-28">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {[
            { icon: <Search className="w-12 h-12 mx-auto text-blue-500" />, title: "Search", desc: "Browse through our wide range of local services and skills." },
            { icon: <Users className="w-12 h-12 mx-auto text-purple-500" />, title: "Connect", desc: "Contact providers easily and book services seamlessly." },
            { icon: <Star className="w-12 h-12 mx-auto text-yellow-400" />, title: "Review", desc: "Rate and review to help others choose the best providers." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-8 rounded-2xl shadow-xl bg-gray-900 hover:bg-gray-800 transition-transform duration-300"
            >
              {item.icon}
              <h3 className="mt-5 font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="WhyChoose" className="mt-20 px-6 max-w-6xl mx-auto scroll-mt-28">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillConnect?</h2>
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {[
            { icon: <ShieldCheck className="w-12 h-12 mx-auto text-green-500" />, title: "Trusted Providers", desc: "Verified professionals you can rely on for quality service." },
            { icon: <Star className="w-12 h-12 mx-auto text-yellow-400" />, title: "Real Reviews", desc: "Honest feedback from real customers helps you decide." },
            { icon: <Users className="w-12 h-12 mx-auto text-purple-500" />, title: "Community Driven", desc: "Built to connect people and empower local talent." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-8 rounded-2xl shadow-xl bg-gray-900 hover:bg-gray-800 transition-transform duration-300"
            >
              {item.icon}
              <h3 className="mt-5 font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="About" className="mt-20 px-6 max-w-4xl mx-auto text-center scroll-mt-28">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          About <span className="text-blue-500">SkillConnect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-400 leading-relaxed text-lg"
        >
          <span className="text-blue-500 font-semibold">SkillConnect</span> is a platform designed to bridge the gap between talented 
          individuals and those who need their services. Whether you are a service provider 
          looking to showcase your skills or someone searching for trusted professionals, 
          we make it simple, secure, and community-driven.
        </motion.p>
      </section>

      {/* Contact Section */}
      <section id="Contact" className="mt-20 px-6 max-w-5xl mx-auto text-center scroll-mt-28">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10"
        >
          Get in <span className="text-blue-500">Touch</span>
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: <Phone className="w-10 h-10 mx-auto text-blue-500" />, title: "Call Us", desc: "+91 98765 43210" },
            { icon: <Mail className="w-10 h-10 mx-auto text-blue-500" />, title: "Email", desc: "support@skillconnect.com" },
            { icon: <MapPin className="w-10 h-10 mx-auto text-blue-500" />, title: "Location", desc: "Bengaluru, India" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-8 rounded-2xl shadow-xl bg-gray-900 hover:bg-gray-800 transition-transform duration-300 flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-gray-800 mb-4">{item.icon}</div>
              <h3 className="mt-2 font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-gray-950 text-center border-t border-gray-800">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} SkillConnect. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-6 text-sm text-gray-400">
          <Link to="/about" className="hover:text-blue-400 transition-colors duration-300">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
          <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
